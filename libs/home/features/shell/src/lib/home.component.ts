import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { LayoutActions, LayoutItem } from '@builder/home/data-access';
import { BuilderService, LayoutService } from '@builder/infra/services';
import {
  BuilderView,
  ComponentToken,
  Metadata,
  PageItem,
} from '@builder/infra/types';
import { MetadataComponent } from '@builder/metadata';
import { ComponentPickerComponent } from '@builder/component-picker';
import { PageViewerComponent } from '@builder/page-viewer';
import { COMPONENTS } from '@builder/infra/consts';
import { CONTROL_ACTIONS, SIDENAV_ACTIONS } from './actions';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { NgTemplateOutlet } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'builder-home',
  imports: [
    MetadataComponent,
    ComponentPickerComponent,
    PageViewerComponent,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    MatToolbar,
    MatIconButton,
    NgTemplateOutlet,
    MatIcon,
    MatTabGroup,
    MatTab,
    MatTooltip,
    MatAnchor,
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
  readonly selectedWrapperElement = signal<PageItem | null>(null);

  handleControlAction(item: LayoutItem): void {
    switch (item.action) {
      case LayoutActions.RESET: {
        this.builderService.reset();
        this.selectedPageIndex.set(0);
        this.selectedSidenavAction.set(this.sidenavActions[0]);
        this.selectedWrapperElement.set(null);
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
      JSON.parse(JSON.stringify(COMPONENTS[token.type])),
      this.selectedWrapperElement(),
    );
  }
}
