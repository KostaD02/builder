import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { Color } from '@builder/infra/types';
import { MatButtonModule } from '@angular/material/button';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { COLORS } from '@builder/infra/consts';

@Component({
  selector: 'builder-color-picker',
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    CdkDrag,
    CdkDragHandle,
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
