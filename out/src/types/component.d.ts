import { ComponentStyle, LoaderConfig } from './styles';
export interface ComponentConfig {
    style?: ComponentStyle;
    label?: string;
    fullWidth?: boolean;
    hoverBackgroundColor?: string;
    appears?: boolean;
    text?: string;
    showSideUserAvatar?: boolean;
    showSideBotAvatar?: boolean;
    botAvatarUrl?: string;
    userAvatarUrl?: string;
    loader?: LoaderConfig;
}
export interface Components {
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
