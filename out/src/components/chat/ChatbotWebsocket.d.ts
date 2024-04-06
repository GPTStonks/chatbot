import '@fontsource-variable/exo-2';
import '@fontsource-variable/fira-code';
import '@fontsource/source-sans-pro';
import { Typography } from '@mui/material';
import React from 'react';
interface ChatbotProps {
    className?: string;
    style?: React.CSSProperties;
    apiConfig: APIConfig;
    themeConfig: ThemeConfig;
    onApiResponseCode?: (bool: boolean) => void;
    messageRenderFunction?: (text: string) => JSX.Element;
    dataRenderFunction?: (data: any) => JSX.Element;
    graphicalDataRenderFunction?: (data: any) => JSX.Element;
    referenceRenderFunction?: (reference: any) => JSX.Element;
    relatedQuestionsRenderFunction?: (relatedQuestions: any) => JSX.Element;
    errorRenderFunction?: (error: any) => JSX.Element;
}
interface APIConfig {
    isWebsocket: boolean;
    auth?: boolean;
    tokenName?: string;
    fetchFunction?: string;
    apiQueryEndpoint: string;
    queryParams?: Record<string, any>;
}
interface PaletteColor {
    main: string;
}
interface Palette {
    primary: PaletteColor;
    secondary: PaletteColor;
    error: PaletteColor;
    warning: PaletteColor;
    info: PaletteColor;
    success: PaletteColor;
    background: {
        default: string;
        paper: string;
    };
    text: {
        primary: string;
        secondary: string;
    };
}
interface Typography {
    fontFamily: string;
}
interface ComponentStyle extends React.CSSProperties {
    '& img'?: React.CSSProperties;
    '& label'?: React.CSSProperties;
    '& label.Mui-focused'?: React.CSSProperties;
    '& .MuiInput-underline:after'?: React.CSSProperties;
    '& .MuiOutlinedInput-root'?: {
        '& fieldset'?: React.CSSProperties;
        '&:hover fieldset'?: React.CSSProperties;
        '&.Mui-focused fieldset'?: React.CSSProperties;
    };
    '&::-webkit-scrollbar'?: React.CSSProperties;
    '&::-webkit-scrollbar-track'?: React.CSSProperties;
    '&::-webkit-scrollbar-thumb'?: React.CSSProperties;
}
interface LoaderConfig {
    color: string;
    backgroundColor: string;
}
interface ComponentConfig {
    style?: ComponentStyle;
    label?: string;
    fullWidth?: boolean;
    hoverBackgroundColor?: string;
    appears?: boolean;
    text?: string;
    botAvatarUrl?: string;
    userAvatarUrl?: string;
    loader?: LoaderConfig;
}
interface Components {
    ChatBox?: ComponentConfig;
    LowPartBox?: ComponentConfig;
    TextField?: ComponentConfig;
    Button?: ComponentConfig;
    Disclaimer?: ComponentConfig;
    MessageBubbleBot?: ComponentConfig;
    LoaderBot?: ComponentConfig;
    MessageBubbleUser?: ComponentConfig;
    Avatar?: ComponentConfig;
    Divider?: ComponentConfig;
}
interface ThemeConfig {
    style: React.CSSProperties;
    palette: Palette;
    typography: Typography;
    components: Components;
}
declare const ChatbotWebsocket: React.FC<ChatbotProps>;
export default ChatbotWebsocket;
