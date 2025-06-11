import { ComponentEditType } from '@builder/infra/types';

export const STYLES: Record<ComponentEditType, ComponentEditType[]> = {
  [ComponentEditType.Text]: [ComponentEditType.Text],
  [ComponentEditType.Label]: [ComponentEditType.Text, ComponentEditType.Label],
  [ComponentEditType.Link]: [ComponentEditType.Text, ComponentEditType.Link],
  [ComponentEditType.Button]: [
    ComponentEditType.Text,
    ComponentEditType.Link,
    ComponentEditType.Button,
  ],
  [ComponentEditType.Container]: [ComponentEditType.Container],
  [ComponentEditType.Image]: [ComponentEditType.Image],
  [ComponentEditType.Card]: [ComponentEditType.Card],
  [ComponentEditType.Form]: [ComponentEditType.Form],
  [ComponentEditType.Input]: [ComponentEditType.Input],
  [ComponentEditType.List]: [ComponentEditType.List],
  [ComponentEditType.ListItem]: [
    ComponentEditType.Text,
    ComponentEditType.ListItem,
  ],
  [ComponentEditType.Table]: [ComponentEditType.Table],
  [ComponentEditType.Iframe]: [ComponentEditType.Iframe],
  [ComponentEditType.CustomHTML]: [ComponentEditType.CustomHTML],
  [ComponentEditType.CustomCSS]: [ComponentEditType.CustomCSS],
  [ComponentEditType.CustomJS]: [ComponentEditType.CustomJS],
};
