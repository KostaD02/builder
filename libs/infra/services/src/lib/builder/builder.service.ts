import { inject, Injectable, signal } from '@angular/core';
import {
  ComponentPageItem,
  Metadata,
  Page,
  PageItem,
  Pages,
} from '@builder/infra/types';
import { STORAGE_KEYS } from '@builder/infra/consts';
import { LocalStorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class BuilderService {
  private readonly localStorageService = inject(LocalStorageService);

  readonly pages = signal<Pages>([]);

  get defaultPage(): Page {
    return {
      id: 0,
      metadata: {
        slug: 'index',
        title: 'Home',
        description: 'Home page',
      },
      children: [],
    };
  }

  get uniqueId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  init(): void {
    const storageData = this.localStorageService.getItem(STORAGE_KEYS.DATA);

    if (storageData) {
      this.pages.set(storageData as unknown as Pages);
      return;
    }

    this.pages.set([this.defaultPage]);
  }

  addNewPage(metadata: Metadata): void {
    this.pages.update((pages) => {
      const newPage: Page = {
        metadata,
        id: pages.length,
        children: [],
      };
      return [...pages, newPage];
    });
    this.saveCurrentStateInStorage();
  }

  addNewElementInPage(
    pageIndex: number,
    componentItem: ComponentPageItem,
    wrapperElement: PageItem | null,
  ): void {
    this.pages.update((pages) => {
      const updatedPages = [...pages];
      const page = { ...updatedPages[pageIndex] };
      const id = this.uniqueId;
      const newPageItem: PageItem = {
        id,
        parentId: page.id.toString(),
        content: componentItem.content,
        children: this.generateChildrenWithIds(
          componentItem.children || [],
          pageIndex,
          id,
        ),
      };

      if (wrapperElement) {
        newPageItem.parentId = wrapperElement.id;
        const wrapperElementChildren = this.digUntilWrapperElement(
          page,
          wrapperElement.id,
        );
        if (wrapperElementChildren) {
          wrapperElementChildren.children.push(newPageItem);
        }
      }

      page.children = [...page.children];

      if (
        !wrapperElement ||
        !this.digUntilWrapperElement(page, wrapperElement.id)
      ) {
        page.children.push(newPageItem);
      }

      updatedPages[pageIndex] = page;
      return updatedPages;
    });
    this.saveCurrentStateInStorage();
  }

  updatePage(index: number, metadata: Metadata): void {
    this.pages.update((pages) => {
      pages[index].metadata = metadata;
      return pages;
    });
    this.saveCurrentStateInStorage();
  }

  removePage(index: number): void {
    this.pages.update((pages) => {
      pages.splice(index, 1);
      return pages;
    });
    this.saveCurrentStateInStorage();
  }

  saveCurrentStateInStorage(): void {
    const data = this.pages();
    this.localStorageService.setItem(STORAGE_KEYS.DATA, data);
  }

  reset(): void {
    // TODO: show pop up if user is sure
    this.pages.set([this.defaultPage]);
    this.saveCurrentStateInStorage();
  }

  private generateChildrenWithIds(
    children: ComponentPageItem[],
    pageIndex: number,
    parentId: string,
  ): PageItem[] {
    return children.map((child) => {
      const childContentId = this.uniqueId;
      return {
        id: childContentId,
        parentId,
        content: child.content,
        children: this.generateChildrenWithIds(
          child.children || [],
          pageIndex,
          childContentId,
        ),
      };
    });
  }

  private digUntilWrapperElement(
    page: Page,
    wrapperElementId: string,
  ): PageItem | null {
    const findWrapper = (items: PageItem[]): PageItem | null => {
      for (const item of items) {
        if (item.id === wrapperElementId) {
          return item;
        }
        const found = findWrapper(item.children || []);
        if (found) {
          return found;
        }
      }
      return null;
    };

    return findWrapper(page.children);
  }
}
