import { ComponentPageItem } from '@builder/infra/types';

export const TR: ComponentPageItem = {
  content: {
    tagName: 'tr',
    isWrapper: true,
  },
};

export const TH: ComponentPageItem = {
  content: {
    tagName: 'th',
    content: 'Header',
    isWrapper: false,
  },
};

export const TD: ComponentPageItem = {
  content: {
    tagName: 'td',
    content: 'Data',
    isWrapper: false,
  },
};

export const TABLE: ComponentPageItem = {
  content: {
    class: 'table',
    tagName: 'table',
    isWrapper: true,
  },
  children: [
    {
      content: {
        tagName: 'tr',
        isWrapper: true,
      },
      children: [TH, TH],
    },
    {
      content: {
        tagName: 'tr',
        isWrapper: true,
      },
      children: [TD, TD],
    },
  ],
};
