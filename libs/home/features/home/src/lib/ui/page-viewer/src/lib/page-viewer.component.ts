import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Page, PageItem } from '@builder/infra/types';
import { PageItemRendererDirective } from './page-item-renderer.directive';

@Component({
  selector: 'builder-page-viewer',
  imports: [CommonModule, PageItemRendererDirective],
  templateUrl: './page-viewer.component.html',
  styleUrl: './page-viewer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PageViewerComponent {
  readonly page = input<Page>();

  readonly selectedWrapperElement = output<PageItem>();

  onElementClick(pageItem: PageItem): void {
    console.log('Clicked', pageItem);
  }
}
