import { ComponentEditType, ComponentPageItem } from '@builder/infra/types';

export const LIST_ITEM: ComponentPageItem = {
  content: {
    tagName: 'li',
    content: 'List item',
    isWrapper: false,
    editType: ComponentEditType.ListItem,
  },
  children: [],
};

export const LIST: ComponentPageItem = {
  content: {
    class: 'list',
    tagName: 'ul',
    content: '',
    isWrapper: true,
    editType: ComponentEditType.List,
  },
  children: [LIST_ITEM, LIST_ITEM],
};
