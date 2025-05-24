import { ComponentPageItem } from '@builder/infra/types';

export const CARD: ComponentPageItem = {
  content: {
    class: 'card',
    tagName: 'div',
    content: '',
  },
  children: [
    {
      content: {
        tagName: 'h3',
        content: 'Card Title',
      },
    },
    {
      content: {
        tagName: 'p',
        content: 'Card content goes here.',
      },
    },
  ],
};
