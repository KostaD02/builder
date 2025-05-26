import { ComponentEditType, ComponentPageItem } from '@builder/infra/types';

export const IFRAME: ComponentPageItem = {
  content: {
    class: 'iframe',
    tagName: 'iframe',
    isWrapper: false,
    editType: ComponentEditType.Iframe,
    attributes: {
      src: 'https://www.google.com',
    },
    style: {
      width: '100%',
      border: 'none',
    },
  },
};
