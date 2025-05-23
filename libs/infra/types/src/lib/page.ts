import { ComponentGeneralStyle } from './component';
import { Metadata } from './metadata';

export interface Page {
  id: number;
  metadata: Metadata;
  children: PageItem[];
}

export interface PageItem {
  id: `${number}-${number}`;
  content: PageContent;
  children: PageItem[];
}

export interface PageContent {
  id: number;
  tagName: string;
  content: string;
  class?: string;
  style?: ComponentGeneralStyle;
  javascript?: string;
}

export type Pages = Page[];
