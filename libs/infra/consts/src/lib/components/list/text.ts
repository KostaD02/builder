import { ComponentPageItem } from '@builder/infra/types';

export const TEXT: ComponentPageItem = {
  content: {
    class: 'text',
    tagName: 'p',
    content: 'Example text',
    isWrapper: false,
    style: {
      maxWidth: 'fit-content',
    },
  },
};
