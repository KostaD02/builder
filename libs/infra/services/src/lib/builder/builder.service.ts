import { inject, Injectable, signal } from '@angular/core';
import {
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
    content: Omit<PageContent, 'id'>,
  ): void {
    this.pages.update((pages) => {
      const page = pages[pageIndex];
      // TODO: implement id generation
      page.children.push({
        id: `${pageIndex}-${page.children.length}`,
        content: {
          ...content,
          id: 0,
        },
        children: [],
      });
      return pages;
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

  buildSrcDoc(activeIndex: number): string {
    const page = this.pages()[activeIndex];
    const title = page.metadata.title;
    const body = this.processPageItems(page.children);
    // TODO: handle style and script
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
    }
    main {
      width: 100%;
    }
  </style>
</head>
<body>
  <main>
    ${body}
    <div style="display: none" />
  </main>
</body>
</html>
`;
  }

  private processPageItems(items: PageItem[]): string {
    let result = '';

    for (const item of items) {
      const { tagName, content, class: className, style } = item.content;
      const children = this.processPageItems(item.children);
      const styleString = style
        ? Object.entries(style)
            .map(([key, value]) => `${key}: ${value};`)
            .join(' ')
        : '';

      result += `<${tagName} class="${className}" style="${styleString}">${content}${children}</${tagName}>`;

      if (item?.children && item.children.length > 0) {
        result += this.processPageItems(item.children);
      }
    }

    return result;
  }
}
