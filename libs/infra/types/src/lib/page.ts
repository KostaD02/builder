import { ComponentGeneralStyle } from './component';
import { Metadata } from './metadata';

export type PageId = number;

export interface Page {
  id: PageId;
  metadata: Metadata;
  children: PageItem[];
}

export interface PageItem {
  id: PageId;
  content: PageContent;
  children: PageItem[];
}

export interface PageContent {
  id: PageId;
  html?: string;
  style?: ComponentGeneralStyle;
  javascript?: string;
}

export type Pages = Page[];
