import { ComponentPageItem } from '@builder/infra/types';

export const LIST: ComponentPageItem = {
  content: {
    class: 'list',
    tagName: 'ul',
    content: '',
    isWrapper: true,
  },
  children: [
    {
      content: {
        tagName: 'li',
        content: 'List item 1',
        isWrapper: false,
      },
    },
    {
      content: {
        tagName: 'li',
        content: 'List item 2',
        isWrapper: false,
      },
    },
  ],
};
