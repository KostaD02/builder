import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'builder-component-picker',
  imports: [CommonModule],
  templateUrl: './component-picker.component.html',
  styleUrl: './component-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentPickerComponent {}
