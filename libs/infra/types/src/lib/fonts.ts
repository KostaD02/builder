import { FontTheme } from './component';
import { ComponentGeneralStyle } from './component';

export interface FontThemeOption {
  name: string;
  token: FontTheme;
  style: Partial<ComponentGeneralStyle>;
}
