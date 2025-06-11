import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatListItem, MatSelectionList } from '@angular/material/list';
import { COMPONENTS_TOKENS } from '@builder/infra/consts';
import { ComponentToken } from '@builder/infra/types';

@Component({
  selector: 'builder-component-picker',
  templateUrl: './component-picker.component.html',
  styleUrl: './component-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatSelectionList, MatListItem],
})
export class ComponentPickerComponent {
  readonly selectedToken = output<ComponentToken>();
  readonly components = COMPONENTS_TOKENS;
}
