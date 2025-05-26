import { ComponentPageItem, ComponentEditType } from '@builder/infra/types';

export const CARD: ComponentPageItem = {
  content: {
    class: 'card',
    tagName: 'div',
    isWrapper: true,
    editType: ComponentEditType.Card,
  },
  children: [
    {
      content: {
        tagName: 'h3',
        content: 'Card Title',
        isWrapper: false,
        editType: ComponentEditType.Text,
        style: {
          color: '#f00',
          maxWidth: 'fit-content',
        },
      },
    },
    {
      content: {
        tagName: 'p',
        content: 'Card content goes here.',
        isWrapper: false,
        editType: ComponentEditType.Text,
        style: {
          color: '#0f0',
          maxWidth: 'fit-content',
        },
      },
    },
  ],
};
