import { ComponentPageItem } from '@builder/infra/types';

export const LABEL: ComponentPageItem = {
  content: {
    class: 'label',
    tagName: 'label',
    content: 'Label',
    isWrapper: false,
  },
};

export const INPUT: ComponentPageItem = {
  content: {
    class: 'input',
    tagName: 'input',
    isWrapper: false,
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
      },
      children: [LABEL, INPUT],
    },
  ],
};
