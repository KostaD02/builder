export enum LayoutActions {
  ADD_ELEMENT = 'add_element',
  CREATE_PAGE = 'create_page',
  EDIT_PAGE = 'edit_page',
  UNDO = 'undo',
  REDO = 'redo',
  DOWNLOAD = 'download',
  RESET = 'reset',
}

export interface LayoutItem {
  text: string;
  icon: string;
  action: LayoutActions;
}
