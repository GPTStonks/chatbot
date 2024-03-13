const useChatbotDefaultTheme = {
  style: {
    justifyContent: 'center',
    alignItems: 'center',
    background: "#080B08 "
  },
  palette: {
    primary: { main: '#fac670' },
    secondary: { main: '#83a598' },
    error: { main: '#fb4934' },
    warning: { main: '#fe8019' },
    info: { main: '#83a598' },
    success: { main: '#b8bb26' },
    background: { default: '#0d0d0d', paper: '#16181c' },
    text: { primary: '#ebdbb2', secondary: '#d5c4a1' },
  },
  typography: { fontFamily: 'Fira Code Variable, monospace' },
  components: {
    ChatBox: {
      position: 'relative',
      minHeight: '70vh',
      //backgroundColor: 'lightblue',
      //backgroundImage: 'url(gptstonks_logo_small.png)',
      // logo small centered
      //backgroundPosition: 'center',
      //backgroundSize: 'small',
      //backgroundRepeat: 'no-repeat',
      background: "linear-gradient(0deg, #080b08, #1e7231)",
      fontFamily: 'Exo 2 Variable, sans-serif',
      maxHeight: '80vh',
      overflowY: 'auto',
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
    LowPartBox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem',
      margin: '0 auto',
      width: 'auto',
    },
    TextField: {
      label: 'Type a message',
      fullWidth: false,
      style: {
        backgroundColor: '#090909',
        color: '#ebdbb2',
        '& label': {
          color: '',
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
      }
    },
    Button: {
      style: {
        backgroundColor: '#b8bb26',
        color: '#fff',
        borderColor: "#b8bb26",
      },
      hoverBackgroundColor: '#fabd2f',
    },
    Disclaimer: {
      appears: true,
      text: 'Happy Coding GPTStonks fellows! 🚀',
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '1rem',
        color: '#ebdbb2',
        fontSize: '0.75rem',
      }
    },
    MessageBubbleBot: {
      maxWidth: '70%',
      padding: '0.5rem 1rem',
      borderRadius: '10px',
      backgroundColor: '#121214',
      color: 'white',
      fontSize: '0.875rem',
      wordBreak: 'break-word',
    },
    MessageBubbleUser: {
      maxWidth: '70%',
      padding: '0.5rem 1rem',
      borderRadius: '10px',
      backgroundColor: '#121214',
      color: 'white',
      fontSize: '0.875rem',
      wordBreak: 'break-word',
    },
    Avatar: {
      botAvatarUrl: 'bytebard.png',
      userAvatarUrl: 'gptstonks_logo_small.png',
      style: {
        size: 40,
        width: 40,
        height: 40,
        borderRadius: '50%',
        backgroundColor: 'transparent',
        '& img': {
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        },
      }
    },
    Divider: {
      appears: false,
      style: {
        backgroundColor: '#b8bb26',
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
      },
    }
  },
};

export default useChatbotDefaultTheme;
