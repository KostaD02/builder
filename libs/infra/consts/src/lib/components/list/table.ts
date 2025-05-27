import { ComponentEditType, ComponentPageItem } from '@builder/infra/types';

export const TR: ComponentPageItem = {
  content: {
    tagName: 'tr',
    isWrapper: true,
    editType: ComponentEditType.Text,
  },
};

export const TH: ComponentPageItem = {
  content: {
    tagName: 'th',
    content: 'Header',
    isWrapper: false,
    editType: ComponentEditType.Text,
  },
};

export const TD: ComponentPageItem = {
  content: {
    tagName: 'td',
    content: 'Data',
    isWrapper: false,
    editType: ComponentEditType.Text,
  },
};

export const TABLE: ComponentPageItem = {
  content: {
    class: 'table',
    tagName: 'table',
    isWrapper: true,
    editType: ComponentEditType.Table,
  },
  children: [
    {
      ...TR,
      children: [TH, TH],
    },
    {
      ...TR,
      children: [TD, TD],
    },
  ],
};
