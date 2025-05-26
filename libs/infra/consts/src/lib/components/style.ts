import { ComponentEditType } from '@builder/infra/types';

export const STYLES: Record<ComponentEditType, ComponentEditType[]> = {
  [ComponentEditType.Text]: [ComponentEditType.Text],
  [ComponentEditType.Container]: [ComponentEditType.Container],
  [ComponentEditType.Link]: [ComponentEditType.Link, ComponentEditType.Text],
  [ComponentEditType.Button]: [
    ComponentEditType.Link,
    ComponentEditType.Text,
    ComponentEditType.Button,
  ],
  [ComponentEditType.Image]: [ComponentEditType.Image],
  [ComponentEditType.Card]: [ComponentEditType.Card],
  [ComponentEditType.Form]: [ComponentEditType.Form],
  [ComponentEditType.Input]: [ComponentEditType.Input],
  [ComponentEditType.List]: [ComponentEditType.List],
  [ComponentEditType.Table]: [ComponentEditType.Table],
  [ComponentEditType.Iframe]: [ComponentEditType.Iframe],
  [ComponentEditType.CustomHTML]: [ComponentEditType.CustomHTML],
  [ComponentEditType.CustomCSS]: [ComponentEditType.CustomCSS],
  [ComponentEditType.CustomJS]: [ComponentEditType.CustomJS],
};
