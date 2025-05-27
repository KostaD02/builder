import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { FONT_THEMES } from '@builder/infra/consts';
import { BuilderService } from '@builder/infra/services';
import {
  FontWeight,
  FormatTextOption,
  PageItem,
  Color,
} from '@builder/infra/types';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { ColorPickerComponent } from '@builder/color-picker';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'builder-text-settings',
  imports: [
    ColorPickerComponent,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSliderModule,
  ],
  templateUrl: './text-settings.component.html',
  styleUrl: './text-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextSettingsComponent {
  private readonly fb = inject(FormBuilder);
  private readonly builderService = inject(BuilderService);

  readonly item = input<PageItem>();
  readonly pageIndex = input<number>();
  readonly updated = output<void>();

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
  readonly fontSizes = {
    min: 6,
    max: 60,
  };

  readonly fontThemeForm = this.fb.group({
    fontTheme: this.fb.control(''),
  });

  readonly fontSizeForm = this.fb.group({
    fontSize: this.fb.control(6, [Validators.min(6), Validators.max(60)]),
  });

  readonly currentItem = computed(() => this.item());

  constructor() {
    effect(() => {
      const item = this.item();

      if (!item) {
        return;
      }

      this.updateFontThemeForm(item);
      this.updateFontSizeForm(item);
    });

    this.fontSizeForm.controls.fontSize.valueChanges
      .pipe(
        takeUntilDestroyed(),
        debounceTime(500),
        filter((value): value is number => value !== null),
        tap((value) => {
          this.handleFontSizeChange(value);
        }),
      )
      .subscribe();
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

  handleColorSelect(color: Color): void {
    const item = this.item();

    if (!item) {
      return;
    }

    if (!item.content.style) {
      item.content.style = {};
    }

    item.content.style.color = color;
    this.updateContent(item);
  }

  private updateContent(item: PageItem): void {
    this.updated.emit();
    this.updateFontThemeForm(item);
    this.updateFontSizeForm(item);
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

  private updateFontSizeForm(item: PageItem): void {
    const currentFontSize = item.content.style?.fontSize || '16px';
    this.fontSizeForm.patchValue(
      {
        fontSize: parseInt(currentFontSize as string),
      },
      { emitEvent: false },
    );
  }

  private handleFontSizeChange(value: number): void {
    if (value < this.fontSizes.min || value > this.fontSizes.max) {
      return;
    }

    const item = this.item();

    if (!item) {
      return;
    }

    if (!item.content.style) {
      item.content.style = {};
    }

    item.content.style.fontSize = `${value}px`;
    this.updateContent(item);
  }
}
