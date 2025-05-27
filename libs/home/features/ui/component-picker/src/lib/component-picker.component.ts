import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { COMPONENTS_TOKENS } from '@builder/infra/consts';
import { ComponentToken } from '@builder/infra/types';

@Component({
  selector: 'builder-component-picker',
  imports: [MatListModule, MatButtonModule],
  templateUrl: './component-picker.component.html',
  styleUrl: './component-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentPickerComponent {
  readonly selectedToken = output<ComponentToken>();
  readonly components = COMPONENTS_TOKENS;
}
