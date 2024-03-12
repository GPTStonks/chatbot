const useChatbotDefaultTheme = {
    style: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#090909',
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
        backgroundColor: '#090909',
        backgroundImage: '',
        fontFamily: 'Fira Code Variable, monospace',
        width: '70vw',
        maxHeight: '70vh',
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
        maxWidth: '50vw'
      },
      TextField: {
        label: 'Type a message',
        fullWidth: true,
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
        text: 'This is an open-source chatbot. Have some fun and enjoy! 🚀',
        style: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: '1rem',
          color: '#ebdbb2',
          fontSize: '0.75rem',
        }
      }
    },
    avatar: {
      botAvatarUrl: 'bytebard.png',
      userAvatarUrl: 'bytebard.svg',
      style: {
        size: 40,
        borderRadius: '50%',
      }
    },
    messageBubble: {
      padding: '0.5rem 1rem',
      borderRadius: '15px',
      backgroundColor: '#16181c',
      color: '#ebdbb2',
    },
    divider: {
      appears: false,
      style: {
        backgroundColor: '#b8bb26',
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
      },
    }
  };

export default useChatbotDefaultTheme;
