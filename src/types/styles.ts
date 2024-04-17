export interface PaletteColor {
  main: string;
}

export interface Palette {
  primary: PaletteColor;
  secondary: PaletteColor;
  error: PaletteColor;
  warning: PaletteColor;
  info: PaletteColor;
  success: PaletteColor;
  background: { default: string; paper: string };
  text: { primary: string; secondary: string };
}

export interface Typography {
  fontFamily: string;
}

export interface ComponentStyle extends React.CSSProperties {
  '& img'?: React.CSSProperties;
  '& label'?: React.CSSProperties;
  '& label.MuiFocused'?: React.CSSProperties;
  '& .MuiInputUnderline:after'?: React.CSSProperties;
  '& .MuiOutlinedInputRoot'?: {
    '& fieldset'?: React.CSSProperties;
    '&:hover fieldset'?: React.CSSProperties;
    '&.MuiFocused fieldset'?: React.CSSProperties;
  };
  '&::-webkit-scrollbar'?: React.CSSProperties;
  '&::-webkit-scrollbar-track'?: React.CSSProperties;
  '&::-webkit-scrollbar-thumb'?: React.CSSProperties;
}

export interface LoaderConfig {
  color: string;
  backgroundColor: string;
}
