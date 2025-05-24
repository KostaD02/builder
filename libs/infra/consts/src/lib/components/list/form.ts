import { ComponentPageItem } from '@builder/infra/types';

export const LABEL: ComponentPageItem = {
  content: {
    class: 'label',
    tagName: 'label',
    content: 'Label',
  },
};

export const INPUT: ComponentPageItem = {
  content: {
    class: 'input',
    tagName: 'input',
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
    attributes: {
      action: 'javascript:void(0)',
    },
  },
  children: [
    {
      content: {
        class: 'form-group',
        tagName: 'div',
      },
      children: [LABEL, INPUT],
    },
  ],
};
