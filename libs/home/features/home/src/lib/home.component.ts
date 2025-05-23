import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { LayoutActions, LayoutItem } from '@builder/home/data-access';
import { BuilderService, LayoutService } from '@builder/infra/services';
import { BuilderView, ComponentToken, Metadata } from '@builder/infra/types';
import { CommonModule } from '@angular/common';
import { MetadataComponent } from '@builder/metadata';
import { ComponentPickerComponent } from '@builder/component-picker';
import { COMPONENTS } from '@builder/infra/consts';
import { BypassSanitizePipe } from '@builder/infra/pipes';
import { SIDENAV_ACTIONS, CONTROL_ACTIONS } from './actions';

@Component({
  selector: 'builder-home',
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatSidenavModule,
    MatTooltipModule,
    MatToolbarModule,
    MetadataComponent,
    ComponentPickerComponent,
    BypassSanitizePipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly layoutService = inject(LayoutService);
  private readonly builderService = inject(BuilderService);

  readonly BuilderView = BuilderView;
  readonly LayoutActions = LayoutActions;
  readonly sidenavActions = SIDENAV_ACTIONS;
  readonly controlActions = CONTROL_ACTIONS;
  readonly pages = this.builderService.pages;
  readonly isDesktop = this.layoutService.isDesktop;

  readonly selectedSidenavAction = signal<LayoutItem>(this.sidenavActions[0]);
  readonly selectedPageIndex = signal<number>(0);
  readonly selectedView = signal<BuilderView>(
    this.isDesktop() ? BuilderView.Desktop : BuilderView.Mobile,
  );

  // TODO: remove
  readonly srcDoc = computed(() =>
    this.pages()
      ? this.builderService.buildSrcDoc(this.selectedPageIndex())
      : '',
  );

  handleControlAction(item: LayoutItem): void {
    switch (item.action) {
      case LayoutActions.RESET: {
        this.builderService.reset();
        this.selectedPageIndex.set(0);
        this.selectedSidenavAction.set(this.sidenavActions[0]);
        break;
      }
      default: {
        console.log(item);
        break;
      }
    }
  }

  onCreatePage(metadata: Metadata): void {
    this.builderService.addNewPage(metadata);
    this.selectedSidenavAction.set(this.sidenavActions[2]);
    this.selectedPageIndex.set(this.pages().length - 1);
  }

  onEditPage(metadata: Metadata): void {
    this.builderService.updatePage(this.selectedPageIndex(), metadata);
  }

  onDeletePage(): void {
    const selectedIndex = this.selectedPageIndex();
    this.selectedPageIndex.set(0);
    this.selectedSidenavAction.set(this.sidenavActions[1]);
    this.builderService.removePage(selectedIndex);
  }

  onNewElementAddition(token: ComponentToken): void {
    this.builderService.addNewElementInPage(
      this.selectedPageIndex(),
      COMPONENTS[token.type],
    );
  }
}
