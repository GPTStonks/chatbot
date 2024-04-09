/// <reference types="react" />
import { Palette, Typography } from './styles';
import { Components } from './component';
export interface APIConfig {
    auth?: boolean;
    tokenName?: string;
    fetchFunction?: string;
    apiQueryEndpoint: string;
    queryParams?: Record<string, any>;
}
export interface ChatLayoutConfig {
    chatOrientation?: 'horizontal' | 'vertical';
    avatarPosition?: 'left' | 'right' | 'top' | 'bottom';
    mobileLayout?: {
        hideAvatar: boolean;
        messageMaxWidth: string;
    };
    infiniteScroll?: boolean;
    botMessageStackDirection?: 'row' | 'column';
}
export interface ThemeConfig {
    style?: React.CSSProperties;
    palette?: Palette;
    typography?: Typography;
    components: Components;
    chatLayoutConfig?: ChatLayoutConfig;
}
export interface ChatbotProps {
    className?: string;
    style?: React.CSSProperties;
    apiConfig: APIConfig;
    themeConfig: ThemeConfig;
    setDataForParent?: (data: any) => void;
    onApiResponseCode?: (bool: boolean) => void;
    userMessageRenderFunction?: (text: string) => JSX.Element;
    botMessageRenderFunction?: (text: string) => JSX.Element;
    dataRenderFunction?: (data: any) => JSX.Element;
    graphicalDataRenderFunction?: (data: any) => JSX.Element;
    referenceRenderFunction?: (reference: any) => JSX.Element;
    relatedQuestionsRenderFunction?: (relatedQuestions: any) => JSX.Element;
    errorRenderFunction?: (error: any) => JSX.Element;
}
