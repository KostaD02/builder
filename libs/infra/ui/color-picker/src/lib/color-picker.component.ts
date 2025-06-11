import { MatIcon } from '@angular/material/icon';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { Color } from '@builder/infra/types';
import { MatIconButton } from '@angular/material/button';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { COLORS } from '@builder/infra/consts';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'builder-color-picker',
  imports: [
    CdkDrag,
    CdkDragHandle,
    MatIconButton,
    MatIcon,
    MatFormField,
    MatLabel,
    MatInput,
  ],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorPickerComponent {
  readonly color = input<Color | null>();
  readonly selectedColor = output<Color>();

  readonly isMenuOpened = signal<boolean>(false);
  readonly colors = COLORS;

  onColorChange(event: Event): void {
    const color = (event.target as HTMLInputElement).value;
    if (color) {
      this.selectedColor.emit(color as Color);
      this.isMenuOpened.set(false);
    }
  }
}
