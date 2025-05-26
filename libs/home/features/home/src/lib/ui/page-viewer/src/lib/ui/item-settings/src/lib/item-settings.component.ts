import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { COMPONENTS, STYLES } from '@builder/infra/consts';
import { BuilderService } from '@builder/infra/services';
import {
  ComponentEditType,
  FontWeight,
  FormatTextOption,
  PageItem,
} from '@builder/infra/types';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FONT_THEMES } from '@builder/infra/consts';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'builder-item-settings',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './item-settings.component.html',
  styleUrl: './item-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemSettingsComponent {
  private readonly fb = inject(FormBuilder);
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
      icon: 'format_italic',
      option: FormatTextOption.Italic,
    },
    {
      icon: 'format_underline',
      option: FormatTextOption.Underline,
    },
  ];

  readonly boldOptions: FontWeight[] = Array.from(
    { length: 9 },
    (_, i) => `${(i + 1) * 100}` as FontWeight,
  );

  readonly fontThemes = FONT_THEMES;

  readonly fontThemeForm = this.fb.group({
    fontTheme: this.fb.control(''),
  });

  constructor() {
    effect(() => {
      const item = this.item();

      if (!item) {
        return;
      }

      this.updateFontThemeForm(item);
    });
  }

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
    }

    this.updateContent(item);
  }

  handleBoldSelect(option: FontWeight): void {
    const item = this.item();

    if (!item) {
      return;
    }

    if (!item.content.style) {
      item.content.style = {};
    }

    item.content.style.fontWeight = option;
    this.updateContent(item);
  }

  handleFontThemeChange(event: MatSelectChange): void {
    const item = this.item();

    if (!item) {
      return;
    }

    const fontTheme = this.fontThemes.find(
      (theme) => theme.token === event.value,
    );

    if (!fontTheme) {
      return;
    }

    if (!item.content.style) {
      item.content.style = {};
    }

    item.content.style = {
      ...item.content.style,
      ...fontTheme.style,
    };

    this.updateContent(item);
  }

  private updateContent(item: PageItem): void {
    this.updated.emit();
    this.updateFontThemeForm(item);
    this.builderService.updateStyle(
      this.pageIndex() || 0,
      item.id,
      item.content,
    );
  }

  private updateFontThemeForm(item: PageItem): void {
    const fontTheme = this.fontThemes.find((theme) => {
      if (!item.content.style) {
        return false;
      }

      return (
        theme.style.fontSize === item.content.style.fontSize &&
        theme.style.fontWeight === item.content.style.fontWeight
      );
    });

    this.fontThemeForm.patchValue({
      fontTheme: fontTheme?.token || '',
    });
  }
}
