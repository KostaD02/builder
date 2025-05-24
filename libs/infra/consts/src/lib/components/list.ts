import { ComponentType, PageContent } from '@builder/infra/types';

export const BUTTON: Omit<PageContent, 'id'> = {
  class: 'btn',
  tagName: 'Button',
  content: 'Example button',
};

export const CONTAINER: Omit<PageContent, 'id'> = {
  class: 'container',
  tagName: 'div',
  content: 'Example container',
};

export const TEXT: Omit<PageContent, 'id'> = {
  class: 'text',
  tagName: 'p',
  content: 'Example text',
};

export const IMAGE: Omit<PageContent, 'id'> = {
  class: 'image',
  tagName: 'img',
  content: 'Example image',
};

export const LINK: Omit<PageContent, 'id'> = {
  class: 'link',
  tagName: 'a',
  content: 'Example link',
};

export const FORM: Omit<PageContent, 'id'> = {
  class: 'form',
  tagName: 'form',
  content: 'Example form',
};

export const LIST: Omit<PageContent, 'id'> = {
  class: 'list',
  tagName: 'ul',
  content: 'Example list',
};

export const TABLE: Omit<PageContent, 'id'> = {
  class: 'table',
  tagName: 'table',
  content: 'Example table',
};

export const IFRAME: Omit<PageContent, 'id'> = {
  class: 'iframe',
  tagName: 'iframe',
  content: 'Example iframe',
};

export const CARD: Omit<PageContent, 'id'> = {
  class: 'card',
  tagName: 'div',
  content: 'Example card',
};

export const CUSTOM_HTML: Omit<PageContent, 'id'> = {
  class: 'custom-html',
  tagName: 'div',
  content: 'Example custom HTML',
};

export const CUSTOM_CSS: Omit<PageContent, 'id'> = {
  class: 'custom-css',
  tagName: 'style',
  content: 'Example custom CSS',
};

export const CUSTOM_JS: Omit<PageContent, 'id'> = {
  class: 'custom-js',
  tagName: 'script',
  content: 'Example custom JS',
};

export const COMPONENTS: Record<ComponentType, Omit<PageContent, 'id'>> = {
  [ComponentType.Button]: BUTTON,
  [ComponentType.Container]: CONTAINER,
  [ComponentType.Text]: TEXT,
  [ComponentType.Image]: IMAGE,
  [ComponentType.Link]: LINK,
  [ComponentType.Form]: FORM,
  [ComponentType.List]: LIST,
  [ComponentType.Table]: TABLE,
  [ComponentType.Iframe]: IFRAME,
  [ComponentType.Card]: CARD,
  [ComponentType.CustomHTML]: CUSTOM_HTML,
  [ComponentType.CustomCSS]: CUSTOM_CSS,
  [ComponentType.CustomJS]: CUSTOM_JS,
};
