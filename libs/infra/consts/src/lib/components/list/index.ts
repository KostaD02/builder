import { ComponentPageItem, ComponentType } from '@builder/infra/types';
import { BUTTON } from './button';
import { TEXT } from './text';
import { IMAGE } from './image';
import { LINK } from './link';
import { CARD } from './card';
import { FORM, INPUT, LABEL } from './form';
import { LIST, LIST_ITEM } from './list';
import { TABLE } from './table';
import { IFRAME } from './iframe';
import { CONTAINER } from './container';
import { CUSTOM_CSS, CUSTOM_HTML, CUSTOM_JS } from './custom';

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
  [ComponentType.ListItem]: LIST_ITEM,
  [ComponentType.Table]: TABLE,
  [ComponentType.Container]: CONTAINER,
  [ComponentType.Iframe]: IFRAME,
  [ComponentType.CustomHTML]: CUSTOM_HTML,
  [ComponentType.CustomCSS]: CUSTOM_CSS,
  [ComponentType.CustomJS]: CUSTOM_JS,
};
