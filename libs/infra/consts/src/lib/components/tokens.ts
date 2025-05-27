import { ComponentToken, ComponentType } from '@builder/infra/types';

export const COMPONENTS_TOKENS: ComponentToken[] = [
  {
    name: 'Container',
    type: ComponentType.Container,
  },
  {
    name: 'Text',
    type: ComponentType.Text,
  },
  {
    name: 'Image',
    type: ComponentType.Image,
  },
  {
    name: 'Link',
    type: ComponentType.Link,
  },
  {
    name: 'Button',
    type: ComponentType.Button,
  },
  {
    name: 'Card',
    type: ComponentType.Card,
  },
  {
    name: 'Form',
    type: ComponentType.Form,
  },
  {
    name: 'Input',
    type: ComponentType.Input,
  },
  {
    name: 'Label',
    type: ComponentType.Label,
  },
  {
    name: 'List',
    type: ComponentType.List,
  },
  {
    name: 'List item',
    type: ComponentType.ListItem,
  },
  {
    name: 'Table',
    type: ComponentType.Table,
  },
  // TODO: handle later
  // {
  //   name: 'Iframe',
  //   type: ComponentType.Iframe,
  // },
  // {
  //   name: 'Custom HTML',
  //   type: ComponentType.CustomHTML,
  // },
  // {
  //   name: 'Custom CSS',
  //   type: ComponentType.CustomCSS,
  // },
  // {
  //   name: 'Custom JS',
  //   type: ComponentType.CustomJS,
  // },
];
