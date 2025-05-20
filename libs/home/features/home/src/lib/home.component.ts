import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutActions, LayoutItem } from '@builder/home/data-access';
import { LayoutService } from '@builder/infra/services';
import { BuilderView } from '@builder/infra/types';
import { SIDENAV_ACTIONS, CONTROL_ACTIONS } from './actions';
import { CommonModule } from '@angular/common';
import { CreatePageComponent } from '@builder/create-page';

@Component({
  selector: 'builder-home',
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatTooltipModule,
    MatToolbarModule,
    CreatePageComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly layoutService = inject(LayoutService);

  readonly BuilderView = BuilderView;
  readonly LayoutActions = LayoutActions;
  readonly sidenavActions = SIDENAV_ACTIONS;
  readonly controlActions = CONTROL_ACTIONS;
  readonly isDesktop = this.layoutService.isDesktop;

  readonly selectedSidenavAction = signal<LayoutItem>(this.sidenavActions[1]);

  readonly selectedView = signal<BuilderView>(
    this.isDesktop() ? BuilderView.Desktop : BuilderView.Mobile,
  );

  handleControlAction(item: LayoutItem): void {
    console.log(item);
  }
}
