import { ComponentPageItem, ComponentEditType } from '@builder/infra/types';

export const LABEL: ComponentPageItem = {
  content: {
    class: 'label',
    tagName: 'label',
    content: 'Label',
    isWrapper: false,
    editType: ComponentEditType.Label,
  },
};

export const INPUT: ComponentPageItem = {
  content: {
    class: 'input',
    tagName: 'input',
    isWrapper: false,
    editType: ComponentEditType.Input,
    attributes: {
      type: 'text',
      placeholder: 'Enter your text',
    },
  },
};

export const FORM: ComponentPageItem = {
  content: {
    class: 'form',
    tagName: 'form',
    isWrapper: true,
    editType: ComponentEditType.Form,
    attributes: {
      action: 'javascript:void(0)',
    },
  },
  children: [
    {
      content: {
        class: 'form-group',
        tagName: 'div',
        isWrapper: true,
        editType: ComponentEditType.Container,
      },
      children: [LABEL, INPUT],
    },
  ],
};
