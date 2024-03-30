const useChatbotDefaultTheme = {
  style: {
    justifyContent: 'center',
    alignItems: 'center',
    background: "#070707",
    minHeight: '100vh',
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
  typography: { fontFamily: 'Saira Variable, sans-serif' },
  components: {
    ChatBox: {
      width: '100vw',
      minHeight: '80vh',
      position: 'relative',
      //backgroundColor: 'lightblue',
      //backgroundImage: 'url(gptstonks_logo_small.png)',
      // logo small centered
      //backgroundPosition: 'center',
      //backgroundSize: 'small',
      //backgroundRepeat: 'no-repeat',
      //background: "linear-gradient(300deg, #070707 10%, #005221 45%, #50878 80%);", green
      //background: "linear-gradient(0deg, #000000 10%, #002233 45%, #004466 80%);",
      background: "radial-gradient(circle at top, #fffff0 0%, #e0e0d1 2.55%, #c1c1a3 7.5%, #a2a275 20%, #8b8b60 30%, #73734c 40%, #5b5b38 60%, #000000 100%);",
      fontFamily: 'Saira Variable, sans-serif',
      maxHeight: '80vh',
      overflowY: 'auto',
      pt: '2rem',
    },
    LowPartBox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem',
      margin: '0 auto',
      width: '60%',

    },
    TextField: {
      label: 'Type a message',
      fullWidth: false,
      style: {
        //backgroundColor: '#070707',
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
      text: 'GPTStonks, your AI financial assistant.',
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: '70%',
      padding: '0.5rem 1rem',
      borderRadius: '10px',
      //backgroundColor: '#121214',
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
    MessageBubbleUser: {
      maxWidth: '70%',
      padding: '0.5rem 1rem',
      borderRadius: '10px',
      backgroundColor: '#121214',
      color: 'white',
      fontSize: '0.875rem',
      transition: 'opacity 0.5s ease-in-out',
      wordBreak: 'break-word',
      loader: {
        color: '#b8bb26',
        backgroundColor: '#121214',
      }
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
      appears: true,
      style: {
        backgroundColor: '#b8bb26',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      },
    }
  },
};

export default useChatbotDefaultTheme;
