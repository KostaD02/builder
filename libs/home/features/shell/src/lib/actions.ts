import { LayoutActions, LayoutItem } from '@builder/home/data-access';

export const SIDENAV_ACTIONS: LayoutItem[] = [
  {
    icon: 'add',
    text: 'Add Elements',
    action: LayoutActions.ADD_ELEMENT,
  },
  {
    icon: 'description',
    text: 'Create Page',
    action: LayoutActions.CREATE_PAGE,
  },
  {
    icon: 'edit_document',
    text: 'Edit Page',
    action: LayoutActions.EDIT_PAGE,
  },
];

export const CONTROL_ACTIONS: LayoutItem[] = [
  {
    icon: 'undo',
    text: 'Undo',
    action: LayoutActions.UNDO,
  },
  {
    icon: 'redo',
    text: 'Redo',
    action: LayoutActions.REDO,
  },
  {
    icon: 'download',
    text: 'Download',
    action: LayoutActions.DOWNLOAD,
  },
  {
    icon: 'refresh',
    text: 'Reset',
    action: LayoutActions.RESET,
  },
];
