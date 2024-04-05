import React from 'react';

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
  background: { default: string; paper: string };
  text: { primary: string; secondary: string };
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

interface ChatbotTheme {
  style: React.CSSProperties;
  palette: Palette;
  typography: Typography;
  components: Components;
}

const useChatbotDefaultTheme: ChatbotTheme = {
  style: {
    justifyContent: 'center',
    alignItems: 'center',
    background: '#080808',
    scrollbarWidth: 'thin',
    scrollbarColor: 'yellow',
  },
  palette: {
    primary: { main: '#fac670' },
    secondary: { main: '#83a598' },
    error: { main: '#fb4934' },
    warning: { main: '#fe8019' },
    info: { main: '#83a598' },
    success: { main: '#b8bb26' },
    background: { default: '#080808', paper: '#16181c' },
    text: { primary: '#ebdbb2', secondary: '#d5c4a1' },
  },
  typography: { fontFamily: 'Saira Variable, sans-serif' },
  components: {
    ChatBox: {
      style: {
        width: '100vw',
        position: 'relative',
        background:
          'radial-gradient(circle at top, #fffff0 0%, #e0e0d1 2.55%, #c1c1a3 7.5%, #a2a275 20%, #8b8b60 30%, #73734c 40%, #5b5b38 60%, #000000 100%);',
        fontFamily: 'Saira Variable, sans-serif',
        minHeight: '80vh',
        maxHeight: '80vh',
        overflowY: 'auto',
        paddingTop: '2rem',
        //backgroundColor: 'lightblue',
        //backgroundImage: 'url(gptstonks_logo_small.png)',
        // logo small centered
        //backgroundPosition: 'center',
        //backgroundSize: 'small',
        //backgroundRepeat: 'no-repeat',
        //background: "linear-gradient(300deg, #070707 10%, #005221 45%, #50878 80%);", green
        //background: "linear-gradient(0deg, #000000 10%, #002233 45%, #004466 80%);",
      },
    },
    LowPartBox: {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem',
        margin: '0 auto',
        width: '60%',
      },
    },
    TextField: {
      label: 'Type a message',
      fullWidth: false,
      style: {
        //backgroundColor: '#070707',
        color: '#ebdbb2',
        marginTop: '0.5rem',
        '& label': {
          color: 'white',
        },
        '& label.Mui-focused': {
          color: 'white',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: 'yellow',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'white',
            opacity: '0.5',
          },
          '&:hover fieldset': {
            borderColor: 'white',
            opacity: '0.8',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#ebdbb2',
          },
        },
      },
    },
    Button: {
      style: {
        minWidth: 'fit-content',
        padding: '6px 8px',
        marginTop: '0.5rem',
        color: '#fff',
        borderColor: '#b8bb26',
        width: 'fit-content',
      },
      hoverBackgroundColor: '#fabd2f',
    },
    Disclaimer: {
      appears: true,
      text: 'GPTStonks, your AI financial assistant.',
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#ebdbb2',
        fontSize: '0.75rem',
      },
    },
    MessageBubbleBot: {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.5rem 1rem',
        borderRadius: '10px',
        flexDirection: 'column',
        backgroundColor: '#121214',
        color: 'white',
        fontSize: '0.875rem',
        wordBreak: 'break-word',
        transition: 'opacity 0.5s ease-in-out',
        '&::-webkit-scrollbar': {
          width: '0.5em',
        },
        '&::-webkit-scrollbar-track': {
          boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#ebdbb2',
          outline: '0.5px solid slategrey',
        },
      },
    },
    LoaderBot: {
      style: {
        backgroundColor: 'transparent',
        display: 'flex',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.5rem 1rem',
      },
    },
    MessageBubbleUser: {
      style: {
        display: 'flex',
        padding: '0.5rem 1rem',
        borderRadius: '10px',
        backgroundColor: '#121214',
        flexDirection: 'row-reverse',
        color: 'white',
        fontSize: '0.875rem',
        transition: 'opacity 0.5s ease-in-out',
        wordBreak: 'break-word',
      },
      loader: {
        color: '#b8bb26',
        backgroundColor: '#121214',
      },
    },
    Avatar: {
      botAvatarUrl: 'bytebard.png',
      userAvatarUrl: 'gptstonks_logo_small.png',
      style: {
        width: 40,
        height: 40,
        borderRadius: '50%',
        backgroundColor: 'transparent',
        '& img': {
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        },
      },
    },
    Divider: {
      appears: true,
      style: {
        backgroundColor: '#b8bb26',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      },
    },
  },
};

export default useChatbotDefaultTheme;
