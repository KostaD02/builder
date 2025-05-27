import { ComponentPageItem, ComponentEditType } from '@builder/infra/types';

export const BUTTON: ComponentPageItem = {
  content: {
    class: 'btn',
    tagName: 'button',
    content: 'Example button',
    editType: ComponentEditType.Button,
    isWrapper: false,
  },
};
