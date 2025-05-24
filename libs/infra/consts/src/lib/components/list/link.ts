import { ComponentPageItem } from '@builder/infra/types';

export const LINK: ComponentPageItem = {
  content: {
    class: 'link',
    tagName: 'a',
    content: 'Example link',
    isWrapper: false,
    attributes: {
      href: 'javascript:void(0)',
      target: '_self',
    },
  },
};
