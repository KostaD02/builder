import { ComponentPageItem } from '@builder/infra/types';

export const CUSTOM_HTML: ComponentPageItem = {
  content: {
    class: 'custom-html',
    tagName: 'div',
    isWrapper: false,
  },
};

export const CUSTOM_CSS: ComponentPageItem = {
  content: {
    class: 'custom-css',
    tagName: 'style',
    isWrapper: false,
  },
};

export const CUSTOM_JS: ComponentPageItem = {
  content: {
    class: 'custom-js',
    tagName: 'script',
    isWrapper: false,
  },
};
