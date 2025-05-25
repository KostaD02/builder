import { ComponentPageItem } from '@builder/infra/types';

export const IMAGE: ComponentPageItem = {
  content: {
    class: 'image',
    tagName: 'img',
    isWrapper: false,
    style: {
      height: '300px',
      objectFit: 'cover',
    },
    attributes: {
      alt: 'Image',
      src: 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
    },
  },
};
