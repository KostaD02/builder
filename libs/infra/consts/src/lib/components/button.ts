import { PageContent } from '@builder/infra/types';

export const BUTTON: Omit<PageContent, 'id'> = {
  class: 'btn',
  tagName: 'Button',
  content: 'Example button',
};
