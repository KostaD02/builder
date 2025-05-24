import { ComponentPageItem } from '@builder/infra/types';

export const TR: ComponentPageItem = {
  content: {
    tagName: 'tr',
  },
};

export const TH: ComponentPageItem = {
  content: {
    tagName: 'th',
    content: 'Header',
  },
};

export const TD: ComponentPageItem = {
  content: {
    tagName: 'td',
    content: 'Data',
  },
};

export const TABLE: ComponentPageItem = {
  content: {
    class: 'table',
    tagName: 'table',
    content: '',
  },
  children: [
    {
      content: {
        tagName: 'tr',
      },
      children: [TH, TH],
    },
    {
      content: {
        tagName: 'tr',
      },
      children: [TD, TD],
    },
  ],
};
