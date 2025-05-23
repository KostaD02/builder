import { inject, Injectable, signal } from '@angular/core';
import { Metadata, Page, Pages } from '@builder/infra/types';
import { LocalStorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class BuilderService {
  private readonly localStorageService = inject(LocalStorageService);

  readonly pages = signal<Pages>([]);

  init(): void {
    const storageData = this.localStorageService.getItem('TODO: UPDATE ME');

    if (storageData) {
      this.initStorageData();
      return;
    }

    this.pages.set([
      {
        id: 0,
        metadata: {
          slug: 'index',
          title: 'Home',
          description: 'Home page',
        },
        children: [],
      },
    ]);
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
  }

  updatePage(index: number, metadata: Metadata): void {
    this.pages.update((pages) => {
      pages[index].metadata = metadata;
      return pages;
    });
  }

  removePage(index: number): void {
    this.pages.update((pages) => {
      pages.splice(index, 1);
      return pages;
    });
  }

  private initStorageData(): void {
    // TODO: Update me
  }
}
