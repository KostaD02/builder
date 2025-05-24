import {
  Color,
  Size,
  FontStyle,
  FontTheme,
  FontWeight,
  TextAlign,
  TextDecoration,
  TextTransform,
  Spacing,
  Border,
  BorderRadius,
  ImageFit,
  Position,
  Display,
  Overflow,
  AlignmentJustify,
  AlignmentAlignItem,
  AlignmentAlignContent,
  AlignmentAlignSelf,
  AlignmentFlexDirection,
  AlignmentFlexWrap,
} from './styles';

export interface ComponentBoxStyles {
  width: Size;
  minWidth: Size;
  maxWidth: Size;
  height: Size;
  minHeight: Size;
  maxHeight: Size;
  objectFit: ImageFit;
  backgroundColor: Color;
  backgroundImage: ImageFit;
  backgroundRepeat: boolean;
}

export interface ComponentDisplayStyles {
  display: Display;
  overflow: Overflow;
  overflowX: Overflow;
  overflowY: Overflow;
}

export interface ComponentAligmentStyles {
  gap: Size;
  justifyContent: AlignmentJustify;
  alignItems: AlignmentAlignItem;
  alignContent: AlignmentAlignContent;
  alignSelf: AlignmentAlignSelf;
  flexDirection: AlignmentFlexDirection;
  flexWrap: AlignmentFlexWrap;
}

export interface ComponentPositionStyles {
  position: Position;
  top: Size;
  right: Size;
  bottom: Size;
  left: Size;
  zIndex: number;
}

export interface ComponentSpacingStyles {
  margin: Spacing;
  padding: Spacing;
}

export interface ComponentTextStyles {
  color: Color;
  fontFamily: string;
  fontSize: Size;
  fontTheme: FontTheme;
  fontWeight: FontWeight;
  fontStyle: FontStyle;
  textAlign: TextAlign;
  textTransform: TextTransform;
  textDecoration: TextDecoration;
  lineHeight: Size;
  letterSpacing: Size;
}

export interface ComponentBorderStyles {
  border: Border;
  borderRadius: BorderRadius;
  borderTop: Border;
  borderRight: Border;
  borderBottom: Border;
  borderLeft: Border;
}

export type ComponentGeneralStyle = Partial<
  ComponentBoxStyles &
    ComponentDisplayStyles &
    ComponentDisplayStyles &
    ComponentAligmentStyles &
    ComponentPositionStyles &
    ComponentSpacingStyles &
    ComponentTextStyles &
    ComponentBorderStyles
>;
