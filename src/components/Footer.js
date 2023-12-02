import { CloseOutlined, GitHub, Google, Instagram, LinkedIn, Twitter } from '@mui/icons-material';
import LinkIcon from '@mui/icons-material/Link';
import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';
import Sidebar from './Sidebar';

function Footer({ closeFooter }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isAboutUsPage = true;

  const markdownText = `GPTStonks Chatbot democratizes the access to financial data by providing a chat
  interface on top of OpenBB's functionalities. Its main contributions include modern
  design, customizable data, and swift real-time responses.`;

  return (
    <>
      <Sidebar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Box
          sx={{
            p: 4,
            backgroundColor: theme.palette.background.paper,
            overflowY: 'auto',
            position: 'relative',
            maxHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: isMobile ? '100vw' : '50vw',
          }}
        >
          {!isAboutUsPage && (
            <Tooltip title="Close Footer" placement="top">
              <IconButton
                onClick={closeFooter}
                sx={{
                  position: 'absolute',
                  right: 16,
                  top: 16,
                  color: theme.palette.primary.main,
                }}
              >
                <CloseOutlined />
              </IconButton>
            </Tooltip>
          )}
          <Container>
            <Grid container spacing={5} direction="column">
              <Grid
                item
                xs={12}
                md={4}
                sx={{
                  color: theme.palette.text.primary,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                >
                  {!isMobile && (
                    <Box
                      component="img"
                      src="/favicon.ico"
                      alt="logo"
                      sx={{
                        width: {
                          md: '5%',
                          lg: '3%',
                        },
                        height: {
                          md: '5%',
                          lg: '3%',
                        },
                        mr: 2,
                      }}
                    />
                  )}
                  <Typography variant="h5" mb={4}>
                    <strong>GPTStonks</strong>
                  </Typography>
                </Box>
                <Typography variant="body2" color={theme.palette.text.secondary} textAlign="left">
                  {markdownText}
                </Typography>
                <Box mt={2} align="left">
                  <LinkIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  <Link
                    href="https://gptstonks.github.io/"
                    sx={{
                      color: theme.palette.text.secondary,
                      '&:hover': {
                        textDecoration: 'none',
                        color: theme.palette.primary.main,
                      },
                      [theme.breakpoints.down('sm')]: {
                        fontSize: '0.8rem',
                      },
                    }}
                  >
                    GPTStonks Github Pages
                  </Link>
                  <br />
                  <LinkIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  <Link
                    href="mailto:gptstonks@gmail.com"
                    sx={{
                      color: theme.palette.text.secondary,
                      '&:hover': {
                        textDecoration: 'none',
                        color: theme.palette.primary.main,
                      },
                      [theme.breakpoints.down('sm')]: {
                        fontSize: '0.8rem',
                      },
                    }}
                  >
                    gptstonks@gmail.com
                  </Link>
                  <br />
                  <LinkIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  <Link
                    href="https://github.com/gptstonks"
                    sx={{
                      color: theme.palette.text.secondary,
                      '&:hover': {
                        textDecoration: 'none',
                        color: theme.palette.primary.main,
                      },
                      [theme.breakpoints.down('sm')]: {
                        fontSize: '0.8rem',
                      },
                    }}
                  >
                    github.com/gptstonks
                  </Link>
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                md={4}
                sx={{
                  color: theme.palette.text.primary,
                }}
              >
                <Typography variant="h6" mb={2} textAlign="left">
                  Functionalities
                </Typography>
                <Typography variant="body2" color={theme.palette.text.secondary} textAlign="left">
                  The chatbot can currently perform general financial knowledge and utilize OpenBB
                  functions. All Hugging Face models are supported and OpenAI's model support is
                  imminent.
                </Typography>
                <Divider sx={{ m: 1.5 }} />
                <Box mt={2}>
                  <Typography variant="body2" color={theme.palette.text.secondary} textAlign="left">
                    Note: The chatbot is intended for finance and investing topics only.
                  </Typography>
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                md={4}
                sx={{
                  color: theme.palette.text.primary,
                }}
              >
                <Typography variant="h6" mb={2} textAlign="left">
                  Stay Updated!
                </Typography>
                <Typography variant="body2" color={theme.palette.text.secondary} textAlign="left">
                  Follow us on social media for the latest updates and news.
                </Typography>
                <Box
                  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}
                >
                  <IconButton color="info">
                    <Twitter />
                  </IconButton>
                  <IconButton color="info">
                    <Google />
                  </IconButton>
                  <IconButton color="info">
                    <Instagram />
                  </IconButton>
                  <IconButton color="info">
                    <LinkedIn />
                  </IconButton>
                  <IconButton color="info">
                    <GitHub />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        {!isMobile && (
          <Box
            component="iframe"
            src="https://gptstonks.github.io/"
            sx={{
              width: '50%',
              height: '100vh',
              border: 'none',
            }}
          />
        )}
      </Box>
    </>
  );
}

export default Footer;
