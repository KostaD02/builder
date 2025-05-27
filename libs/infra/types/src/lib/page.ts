import { ComponentGeneralStyle, ComponentEditType } from './component';
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
  children: PageItem[];
}

export interface PageContent {
  tagName: string;
  isWrapper: boolean;
  editType: ComponentEditType;
  class?: string;
  style?: ComponentGeneralStyle;
  content?: string;
  attributes?: Record<string, string>;
  javascript?: string;
}

export type ComponentPageItem = {
  content: PageContent;
  children?: ComponentPageItem[];
};

export type Pages = Page[];
