import React from 'react';
import { ThemeConfig } from '@/types/chatbot';

const useGptstonksChatbotTheme: ThemeConfig = {
  chatLayoutConfig: {
    chatOrientation: 'vertical',
    avatarPosition: 'left',
    mobileLayout: {
      hideAvatar: false,
      messageMaxWidth: '100%',
    },
    infiniteScroll: true,
    botMessageStackDirection: 'column',
    responseHeader: true,
  },
  style: {
    justifyContent: 'center',
    height: '100%',
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
  typography: { fontFamily: 'Poppins, sans-serif' },
  components: {
    ChatBox: {
      style: {
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent',
        fontFamily: 'Poppins, sans-serif',
        textAlign: 'left',
        alignItems: 'center',
        justifyContent: 'left',
        overflowY: 'auto',
        paddingTop: '2rem',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      },
    },
    LowPartBox: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        bottom: '30px',
        right: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '0 auto',
        width: '70%',
        backgroundColor: 'transparent',
      },
    },
    TextField: {
      label: 'Type a message',
      fullWidth: false,
      style: {
        borderRadius: '30px',
        backgroundColor: '#1f1f1f',
        color: '#ebdbb2',
        '& label': {
          color: 'white',
        },
        '& label.MuiFocused': {
          color: 'white',
        },
        '& .MuiInputUnderline:after': {
          borderBottomColor: 'yellow',
        },
        '& .MuiOutlinedInputRoot': {
          '& fieldset': {
            borderColor: 'white',
            opacity: '0.5',
          },
          '&:hover fieldset': {
            borderColor: 'white',
            opacity: '0.8',
          },
          '&.MuiFocused fieldset': {
            borderColor: '#ebdbb2',
          },
        },
      },
    },
    Button: {
      style: {
        padding: '6px 6px',
        color: '#ebdbb2',
        width: 'fit-content',
      },
      hoverBackgroundColor: '#6b6b6b',
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
        marginTop: '0.5rem',
      },
    },
    MessageBubbleBot: {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        borderRadius: '10px',
        flexDirection: 'column',
        color: 'white',
        fontSize: '0.875rem',
        wordBreak: 'break-word',
        transition: 'opacity 0.5s ease-in-out',
        maxWidth: '100%',
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
        flexDirection: 'row',
        justifyContent: 'left',
        textAlign: 'left',
        alignItems: 'center',
        color: 'white',
        fontSize: '1.5rem',
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
      showSideUserAvatar: false,
      showSideBotAvatar: false,
      style: {
        marginRight: '0.5em',
        width: 25,
        height: 25,
        backgroundColor: 'transparent',
        '& img': {
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        },
      },
    },
    Divider: {
      appears: false,
      style: {
        backgroundColor: '#b8bb26',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      },
    },
  },
};

export default useGptstonksChatbotTheme;
