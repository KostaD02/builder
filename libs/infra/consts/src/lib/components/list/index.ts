import { ComponentPageItem, ComponentType } from '@builder/infra/types';
import { BUTTON } from './button';
import { TEXT } from './text';
import { IMAGE } from './image';
import { LINK } from './link';
import { CARD } from './card';
import { FORM, INPUT, LABEL } from './form';
import { LIST } from './list';
import { TABLE } from './table';
import { CONTAINER } from './container';
import { CUSTOM_HTML } from './custom';
import { CUSTOM_CSS } from './custom';
import { CUSTOM_JS } from './custom';

export const COMPONENTS: Record<ComponentType, ComponentPageItem> = {
  [ComponentType.Button]: BUTTON,
  [ComponentType.Text]: TEXT,
  [ComponentType.Image]: IMAGE,
  [ComponentType.Link]: LINK,
  [ComponentType.Card]: CARD,
  [ComponentType.Form]: FORM,
  [ComponentType.Input]: INPUT,
  [ComponentType.Label]: LABEL,
  [ComponentType.List]: LIST,
  [ComponentType.Table]: TABLE,
  [ComponentType.Container]: CONTAINER,
  [ComponentType.CustomHTML]: CUSTOM_HTML,
  [ComponentType.CustomCSS]: CUSTOM_CSS,
  [ComponentType.CustomJS]: CUSTOM_JS,
};
