import { ComponentPageItem } from '@builder/infra/types';

export const LIST: ComponentPageItem = {
  content: {
    class: 'list',
    tagName: 'ul',
    content: '',
  },
  children: [
    {
      content: {
        tagName: 'li',
        content: 'List item 1',
      },
    },
    {
      content: {
        tagName: 'li',
        content: 'List item 2',
      },
    },
  ],
};
