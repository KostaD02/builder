import { Metadata } from './metadata';

export interface Page {
  id: number;
  metadata: Metadata;
  children: string[]; // TODO: update
}

export type Pages = Page[];
