import { inject, Injectable, signal } from '@angular/core';
import {
  ComponentPageItem,
  Metadata,
  Page,
  PageContent,
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
  ): void {
    this.pages.update((pages) => {
      const updatedPages = [...pages];
      const page = { ...updatedPages[pageIndex] };

      const newPageItem: PageItem = {
        id: `${pageIndex}-${page.children.length}`,
        content: {
          ...componentItem.content,
          id: Date.now(),
        },
        children: this.generateChildrenWithIds(
          componentItem.children || [],
          pageIndex,
        ),
      };

      page.children = [...page.children, newPageItem];
      updatedPages[pageIndex] = page;
      return updatedPages;
    });
    this.saveCurrentStateInStorage();
  }

  private childCounter = 0;

  private generateChildrenWithIds(
    children: ComponentPageItem[],
    pageIndex: number,
  ): PageItem[] {
    return children.map((child) => {
      const childId = `${pageIndex}-${this.childCounter++}`;
      return {
        id: childId as `${number}-${number}`,
        content: {
          ...child.content,
          id: Date.now() + this.childCounter,
        },
        children: this.generateChildrenWithIds(child.children || [], pageIndex),
      };
    });
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
}
