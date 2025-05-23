import { ComponentToken, CompomentType } from '@builder/infra/types';

export const COMPONENTS_TOKENS: ComponentToken[] = [
  {
    name: 'Text',
    component: CompomentType.Text,
  },
  {
    name: 'Image',
    component: CompomentType.Image,
  },
  {
    name: 'Link',
    component: CompomentType.Link,
  },
  {
    name: 'Button',
    component: CompomentType.Button,
  },
  {
    name: 'Card',
    component: CompomentType.Card,
  },
  {
    name: 'Form',
    component: CompomentType.Form,
  },
  {
    name: 'List',
    component: CompomentType.List,
  },
  {
    name: 'Table',
    component: CompomentType.Table,
  },
  {
    name: 'Iframe',
    component: CompomentType.Iframe,
  },
  {
    name: 'Custom HTML',
    component: CompomentType.CustomHTML,
  },
  {
    name: 'Custom CSS',
    component: CompomentType.CustomCSS,
  },
  {
    name: 'Custom JS',
    component: CompomentType.CustomJS,
  },
];
