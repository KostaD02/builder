import { ComponentPageItem, ComponentEditType } from '@builder/infra/types';

export const CUSTOM_HTML: ComponentPageItem = {
  content: {
    class: 'custom-html',
    tagName: 'div',
    isWrapper: false,
    editType: ComponentEditType.CustomHTML,
  },
};

export const CUSTOM_CSS: ComponentPageItem = {
  content: {
    class: 'custom-css',
    tagName: 'style',
    isWrapper: false,
    editType: ComponentEditType.CustomCSS,
  },
};

export const CUSTOM_JS: ComponentPageItem = {
  content: {
    class: 'custom-js',
    tagName: 'script',
    isWrapper: false,
    editType: ComponentEditType.CustomJS,
  },
};
