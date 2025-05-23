import { inject, Injectable, signal } from '@angular/core';
import { Metadata, Page, Pages } from '@builder/infra/types';
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
