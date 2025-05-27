import { ComponentPageItem, ComponentEditType } from '@builder/infra/types';

export const CONTAINER: ComponentPageItem = {
  content: {
    class: 'container',
    tagName: 'div',
    isWrapper: true,
    editType: ComponentEditType.Container,
  },
};
