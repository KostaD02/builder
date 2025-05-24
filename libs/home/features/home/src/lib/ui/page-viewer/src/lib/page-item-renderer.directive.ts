import {
  Directive,
  inject,
  input,
  OnInit,
  Renderer2,
  OnChanges,
  SimpleChanges,
  output,
  ViewContainerRef,
  OnDestroy,
} from '@angular/core';
import { PageItem } from '@builder/infra/types';

@Directive({
  selector: '[builderPageItemRenderer]',
  standalone: true,
})
export class PageItemRendererDirective implements OnInit, OnChanges, OnDestroy {
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly renderer = inject(Renderer2);

  readonly builderPageItemRenderer = input<PageItem>();
  readonly elementClick = output<PageItem>();
  readonly elementSelect = output<PageItem>();

  private createdElement: HTMLElement | null = null;

  ngOnInit(): void {
    this.renderElement();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['builderPageItemRenderer']) {
      this.renderElement();
    }
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  private cleanup(): void {
    if (this.createdElement && this.createdElement.parentNode) {
      this.renderer.removeChild(
        this.createdElement.parentNode,
        this.createdElement,
      );
    }
    this.viewContainerRef.clear();
  }

  private renderElement(): void {
    const pageItem = this.builderPageItemRenderer();

    if (!pageItem) {
      this.cleanup();
      return;
    }

    this.cleanup();

    const element = this.renderer.createElement(pageItem.content.tagName);

    this.applyElementProperties(element, pageItem);

    this.addEventListeners(element, pageItem);

    this.setElementContent(element, pageItem);

    const hostElement = this.viewContainerRef.element.nativeElement;
    const parentElement = hostElement.parentNode;

    if (parentElement) {
      this.renderer.insertBefore(parentElement, element, hostElement);
    }

    this.createdElement = element;
  }

  private applyElementProperties(
    element: HTMLElement,
    pageItem: PageItem,
  ): void {
    const content = pageItem.content;
    this.renderer.setStyle(element, 'cursor', 'pointer');

    if (content.class) {
      this.renderer.addClass(element, content.class);
    }

    if (content.style) {
      Object.entries(content.style).forEach(([property, value]) => {
        this.renderer.setStyle(element, property, value);
      });
    }

    this.renderer.setAttribute(element, 'data-item-id', pageItem.id);
    this.renderer.setAttribute(
      element,
      'data-content-id',
      content.id.toString(),
    );
    this.renderer.setAttribute(element, 'builderElement', '');

    this.applyTagSpecificAttributes(element, pageItem);
  }

  private applyTagSpecificAttributes(
    element: HTMLElement,
    pageItem: PageItem,
  ): void {
    const { tagName } = pageItem.content;

    switch (tagName.toLowerCase()) {
      case 'img':
        this.renderer.setAttribute(
          element,
          'src',
          'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
        );
        this.renderer.setAttribute(element, 'alt', 'Image');
        this.renderer.setStyle(element, 'height', '300px');
        this.renderer.setStyle(element, 'object-fit', 'cover');
        break;
      case 'a':
        this.renderer.setAttribute(element, 'href', 'javascript:void(0)');
        break;
      case 'iframe':
        this.renderer.setAttribute(element, 'src', '');
        this.renderer.setAttribute(element, 'frameborder', '0');
        break;
      case 'input':
        this.renderer.setAttribute(element, 'type', 'text');
        this.renderer.setAttribute(element, 'placeholder', '');
        break;
    }
  }

  private setElementContent(element: HTMLElement, pageItem: PageItem): void {
    const { tagName, content } = pageItem.content;

    const selfClosingTags = ['img', 'input', 'br', 'hr', 'iframe'];
    if (!selfClosingTags.includes(tagName.toLowerCase()) && content) {
      this.renderer.setProperty(element, 'textContent', content);
    }
  }

  private addEventListeners(element: HTMLElement, pageItem: PageItem): void {
    this.renderer.listen(element, 'click', (event: Event) => {
      event.stopPropagation();
      this.elementClick.emit(pageItem);
    });
  }
}
