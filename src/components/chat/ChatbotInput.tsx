import { useCallback } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Typography,
} from '@mui/material';
import ArrowUpward from '@mui/icons-material/ArrowUpward';

const ChatbotInput = ({
  isMobile,
  themeConfig,
  newMessage,
  setNewMessage,
  handleKeyDown,
  handleSendMessage,
  isAnyMessageLoading,
  multimodeChat,
  multimodeRenderFunction,
}: {
  isMobile: boolean;
  themeConfig: any;
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleSendMessage: () => void;
  isAnyMessageLoading: boolean;
  multimodeChat: any;
  multimodeRenderFunction: (modes: string[]) => JSX.Element | null;
}) => {
  const MultiModeRender = useCallback(
    (modes: string[]) => {
      return multimodeRenderFunction ? multimodeRenderFunction(modes) : null;
    },
    [multimodeRenderFunction],
  );

  return (
    <Box
      sx={{
        ...themeConfig.components?.LowPartBox?.style,
        width: isMobile ? '90vw' : themeConfig.components?.LowPartBox?.style?.width || '60%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: isMobile ? '90vw' : themeConfig.components?.LowPartBox?.style?.width || '60%',
        }}
      >
        <TextField
          fullWidth={themeConfig?.components?.TextField?.fullWidth || true}
          multiline
          minRows={1}
          maxRows={2}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          size="small"
          label={themeConfig?.components?.TextField?.label || 'Ask our chatbot!'}
          InputProps={{
            style: {
              ...themeConfig?.components?.TextField?.style,
            },
            endAdornment: (
              <InputAdornment position="end">
                {isAnyMessageLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  <IconButton
                    onClick={handleSendMessage}
                    disabled={isAnyMessageLoading}
                    size={isMobile ? 'small' : 'medium'}
                    sx={{
                      ...themeConfig?.components?.Button?.style,
                      '&:hover': {
                        backgroundColor:
                          themeConfig?.components?.Button?.hoverBackgroundColor || '#b8bb26',
                      },
                      minWidth: 'auto',
                    }}
                  >
                    <ArrowUpward fontSize={isMobile ? 'small' : 'medium'} />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
        {multimodeChat &&
          MultiModeRender(Object.values(multimodeChat).map((item: any) => item.value))}
      </Box>

      {themeConfig?.components?.Disclaimer?.appears && (
        <Typography sx={themeConfig.components.Disclaimer.style}>
          {themeConfig?.components?.Disclaimer?.text ||
            'This is an open-source chatbot. Have some fun and enjoy! 🚀'}
        </Typography>
      )}
    </Box>
  );
};

export default ChatbotInput;
