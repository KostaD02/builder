import { ComponentType, PageContent } from '@builder/infra/types';
import { BUTTON } from './button';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TODO_REPLACE_ME_AFTER_COMPONENTS_CREATION = any;

export const COMPONENTS: Record<
  TODO_REPLACE_ME_AFTER_COMPONENTS_CREATION,
  Omit<PageContent, 'id'>
> = {
  [ComponentType.Button]: BUTTON,
};
