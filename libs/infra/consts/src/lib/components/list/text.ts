import { ComponentPageItem, ComponentEditType } from '@builder/infra/types';

export const TEXT: ComponentPageItem = {
  content: {
    class: 'text',
    tagName: 'p',
    content: 'Example text',
    isWrapper: false,
    editType: ComponentEditType.Text,
    style: {
      fontSize: '16px',
      fontWeight: '400',
    },
  },
};
