import { ComponentPageItem } from '@builder/infra/types';

export const CARD: ComponentPageItem = {
  content: {
    class: 'card',
    tagName: 'div',
    isWrapper: true,
  },
  children: [
    {
      content: {
        tagName: 'h3',
        content: 'Card Title',
        isWrapper: false,
      },
    },
    {
      content: {
        tagName: 'p',
        content: 'Card content goes here.',
        isWrapper: false,
      },
    },
  ],
};
