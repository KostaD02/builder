import { ComponentPageItem } from '@builder/infra/types';

export const IFRAME: ComponentPageItem = {
  content: {
    class: 'iframe',
    tagName: 'iframe',
    isWrapper: false,
    attributes: {
      src: 'https://www.google.com',
      frameborder: '0',
    },
  },
};
