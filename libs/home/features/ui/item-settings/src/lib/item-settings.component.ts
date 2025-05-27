import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { COMPONENTS, STYLES } from '@builder/infra/consts';
import { BuilderService } from '@builder/infra/services';
import { ComponentEditType, PageItem } from '@builder/infra/types';
import { MatButtonModule } from '@angular/material/button';
import { TextSettingsComponent } from './ui';

@Component({
  selector: 'builder-item-settings',
  imports: [CommonModule, MatButtonModule, TextSettingsComponent],
  templateUrl: './item-settings.component.html',
  styleUrl: './item-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemSettingsComponent {
  private readonly builderService = inject(BuilderService);

  readonly componentEditType = ComponentEditType;
  readonly item = input<PageItem>();
  readonly pageIndex = input<number>();
  readonly updated = output<void>();
  readonly settings = computed(() => {
    const item = this.item();

    if (!item) {
      return [];
    }

    return STYLES[item.content.editType] || [];
  });

  resetToDefaultContent(): void {
    const item = this.item();

    if (!item) {
      return;
    }

    const component = JSON.parse(
      JSON.stringify(COMPONENTS[item.content.editType]),
    );

    if (!component || !component.content) {
      return;
    }

    item.content = component.content;
    this.updateContent(item);
  }

  onTextSettingsUpdated(): void {
    this.updated.emit();
  }

  private updateContent(item: PageItem): void {
    this.updated.emit();
    this.builderService.updateStyle(
      this.pageIndex() || 0,
      item.id,
      item.content,
    );
  }
}
