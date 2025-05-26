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
import {
  ComponentEditType,
  FormatTextOption,
  PageItem,
} from '@builder/infra/types';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'builder-item-settings',
  imports: [CommonModule, MatButtonModule, MatIconModule],
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

  readonly formatTextOptions: Array<{
    icon: string;
    option: FormatTextOption;
  }> = [
    {
      icon: 'format_bold',
      option: FormatTextOption.Bold,
    },
    {
      icon: 'format_italic',
      option: FormatTextOption.Italic,
    },
    {
      icon: 'format_underline',
      option: FormatTextOption.Underline,
    },
    {
      icon: 'format_color_text',
      option: FormatTextOption.Color,
    },
  ];

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

  handleFormatText(option: FormatTextOption): void {
    const item = this.item();

    if (!item) {
      return;
    }

    if (!item.content.style) {
      item.content.style = {};
    }

    switch (option) {
      case FormatTextOption.Bold:
        // TODO: add bold style picker
        item.content.style.fontWeight = '700';
        break;
      case FormatTextOption.Italic:
        item.content.style.fontStyle =
          item.content?.style?.fontStyle === 'italic' ? 'normal' : 'italic';
        break;
      case FormatTextOption.Underline:
        item.content.style.textDecoration =
          item.content?.style?.textDecoration === 'underline'
            ? 'none'
            : 'underline';
        break;
      case FormatTextOption.Color:
        // TODO: add color picker
        break;
    }

    this.updateContent(item);
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
