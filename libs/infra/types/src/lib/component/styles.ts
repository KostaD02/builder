
export type Color = `#${string}` | 'inhert' | 'transparent';

export type Position = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';

export type Display = 'block' | 'inline' | 'inline-block' | 'flex' | 'grid' | 'none';

export type Overflow = 'visible' | 'hidden' | 'scroll' | 'auto';

export type ImageFit = 'auto' | 'contain' | 'cover';

export type Size = `${number}px` | `${number}rem` | `${number}em` | `${number}%` | `${number}vh` | `${number}vw` | 'auto' | 'inherit' | 'initial' | 'unset' | 'fit-content' | 'min-content' | 'max-content';
export type Spacing = `${Size}` | `${Size} ${Size}` | `${Size} ${Size} ${Size}` | `${Size} ${Size} ${Size} ${Size}`;

export type FontTheme = 'heading-1' | 'heading-2' | 'heading-3' | 'heading-4' | 'heading-5' | 'heading-6' | 'paragraph-1' | 'paragraph-2' | 'paragraph-3';
export type FontWeight = "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
export type FontStyle = 'normal' | 'italic' | 'oblique';

export type TextAlign = 'left' | 'center' | 'right' | 'justify';
export type TextTransform = 'none' | 'capitalize' | 'uppercase' | 'lowercase';
export type TextDecoration = 'none' | 'underline' | 'line-through' | 'overline';

export type BorderStyle = 'none' | 'solid' | 'dotted' | 'dashed' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';
export type Border = `${Size} ${BorderStyle} ${Color}`;
export type BorderRadius = `${Size}` | `${Size} ${Size}` | `${Size} ${Size} ${Size}` | `${Size} ${Size} ${Size} ${Size}`;

export type AlignmentJustify = 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
export type AlignmentAlignItem = 'start' | 'end' | 'center' | 'baseline' | 'stretch';
export type AlignmentAlignContent = 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'stretch';
export type AlignmentAlignSelf = 'auto' | 'start' | 'end' | 'center' | 'baseline' | 'stretch';
export type AlignmentFlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type AlignmentFlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';