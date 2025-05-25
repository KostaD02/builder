import { ComponentGeneralStyle } from './component';
import { Metadata } from './metadata';

export interface Page {
  id: number;
  metadata: Metadata;
  children: PageItem[];
}

export interface PageItem {
  id: string;
  parentId: string;
  content: PageContent;
  children?: PageItem[];
}

export interface PageContent {
  tagName: string;
  isWrapper: boolean;
  content?: string;
  class?: string;
  attributes?: Record<string, string>;
  style?: ComponentGeneralStyle;
  javascript?: string;
}

export type ComponentPageItem = {
  content: PageContent;
  children?: ComponentPageItem[];
};

export type Pages = Page[];
