import { ComponentGeneralStyle } from './component';
import { Metadata } from './metadata';

export interface Page {
  id: number;
  metadata: Metadata;
  children: PageItem[];
}

export interface PageItem {
  id: string;
  content: PageContent;
  children?: PageItem[];
}

export interface PageContent {
  id: string;
  tagName: string;
  content?: string;
  class?: string;
  attributes?: Record<string, string>;
  style?: ComponentGeneralStyle;
  javascript?: string;
}

export type ComponentPageItem = {
  content: Omit<PageContent, 'id'>;
  children?: ComponentPageItem[];
};

export type Pages = Page[];
