import {
  Directive,
  inject,
  input,
  OnInit,
  Renderer2,
  output,
  ViewContainerRef,
  OnDestroy,
  effect,
} from '@angular/core';
import { PageItem } from '@builder/infra/types';

@Directive({
  selector: '[builderPageItemRenderer]',
  standalone: true,
})
export class PageItemRendererDirective implements OnInit, OnDestroy {
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly renderer = inject(Renderer2);

  readonly builderPageItemRenderer = input<PageItem>();
  readonly rootElement = input<HTMLElement>();
  readonly rerender = input<number>();
  readonly elementClick = output<void>();
  readonly wrapperElementClick = output<PageItem>();

  constructor() {
    effect(() => {
      const rerenderCount = this.rerender() || 0;
      const item = this.builderPageItemRenderer();
      if (item && rerenderCount > 0) {
        this.forceRerender(item);
      }
    });
  }

  ngOnInit(): void {
    this.renderItem();
  }

  ngOnDestroy(): void {
    const rootElement = this.rootElement();
    const item = this.builderPageItemRenderer();
    if (rootElement && item) {
      const element = rootElement.querySelector(`[data-id="${item.id}"]`);
      if (element) {
        element.remove();
      }
    }
  }

  private renderItem(): void {
    const rootElement = this.rootElement();
    const item = this.builderPageItemRenderer();
    if (!item) {
      this.viewContainerRef.clear();
      return;
    }
    const isRootLevelItem = !isNaN(Number(item.parentId));
    const element = document.createElement(item.content.tagName);
    this.applyContentToElement(element, item, true);

    if (!isRootLevelItem) {
      const parentNode = rootElement?.querySelector(
        `[data-id="${item.parentId}"]`,
      );
      if (parentNode) {
        this.renderer.appendChild(parentNode, element);
        return;
      }
    }

    this.renderer.appendChild(rootElement, element);
  }

  private applyContentToElement(
    element: HTMLElement,
    item: PageItem,
    applyListeners = true,
  ): void {
    const {
      isWrapper,
      content,
      class: className,
      attributes,
      style,
    } = item.content;
    this.renderer.setAttribute(element, 'data-id', item.id);
    this.renderer.setAttribute(element, 'data-parent-id', item.parentId);

    if (isWrapper) {
      this.renderer.addClass(element, 'wrapper');
    }

    if (content) {
      element.innerHTML = content;
    }

    if (className) {
      this.renderer.addClass(element, className);
    }

    if (attributes) {
      Object.entries(attributes).forEach(([key, value]) => {
        this.renderer.setAttribute(element, key, value);
      });
    }

    if (style) {
      Object.entries(style).forEach(([key, value]) => {
        this.renderer.setStyle(element, key, value);
      });
    }

    // TODO: handle javascript part

    if (applyListeners) {
      element.addEventListener('click', (event: MouseEvent) => {
        event.stopPropagation();
        this.elementClick.emit();
        if (isWrapper) {
          this.selectWrapperElement(element);
        }
      });
    }
  }

  private selectWrapperElement(element: HTMLElement): void {
    const rootElement = this.rootElement();
    const item = this.builderPageItemRenderer();
    const selected = rootElement?.querySelector('.selected');
    if (selected) {
      this.renderer.removeClass(selected, 'selected');
    }
    this.renderer.addClass(element, 'selected');
    if (item) {
      this.wrapperElementClick.emit(item);
    }
  }

  private forceRerender(item: PageItem): void {
    const rootElement = this.rootElement();
    const element = rootElement?.querySelector(
      `[data-id="${item.id}"]`,
    ) as HTMLElement;
    if (element) {
      this.applyContentToElement(element, item, false);
    }
  }
}
