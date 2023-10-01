import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  Tooltip,
} from '@mui/material';
import {
  Twitter,
  Google,
  Instagram,
  LinkedIn,
  GitHub,
  Home,
  Email,
  Phone,
  Print,
  CloseOutlined,
} from '@mui/icons-material';

import LinkIcon from '@mui/icons-material/Link';
import SettingsIcon from '@mui/icons-material/Settings';
import { useTheme } from '@emotion/react';

function Footer({ closeFooter }) {
  const theme = useTheme();
  return (
    <Box sx={{ p: 4, backgroundColor: theme.palette.background.paper }}>
      <Tooltip title="Close Footer" placement="top">
        <IconButton
          onClick={closeFooter}
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            color: theme.palette.primary.main,
          }}
        >
          <CloseOutlined />
        </IconButton>
      </Tooltip>
      <Container>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" m={4}>
              GPTStonks
            </Typography>
            <Typography variant="body2" color={theme.palette.text.secondary} align="justify">
              GPTStonks Chatbot democratizes the access to financial data by providing a chat
              interface on top of OpenBB's functionalities. Its main contributions include modern
              design, customizable data, and swift real-time responses.
            </Typography>
            <Box mt={2} align="left">
              <LinkIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
              <Link color="primary" href="https://gptstonks.github.io/">
                GPTStonks Github Pages
              </Link>
              <br />
              <LinkIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
              <Link href="mailto:gptstonks@gmail.com" color={theme.palette.text.secondary}>
                gptstonks@gmail.com
              </Link>
              <br />
              <LinkIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
              <Link href="https://github.com/gptstonks" color={theme.palette.text.secondary}>
                github.com/gptstonks
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" m={4}>
              Functionalities
            </Typography>
            <Typography variant="body2" color={theme.palette.text.secondary} align="justify">
              The chatbot can currently perform general financial knowledge and utilize OpenBB
              functions. All Hugging Face models are supported and OpenAI's model support is
              imminent.
            </Typography>
            <Divider sx={{ m: 3.5 }} />
            <Box mt={2}>
              <SettingsIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
              <Typography variant="body2" color={theme.palette.text.secondary} display="inline">
                Note: The chatbot is intended for finance and investing topics only.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" m={4}>
              Stay Updated
            </Typography>
            <Typography variant="body2" color={theme.palette.text.secondary} align="justify">
              Follow us on social media for the latest updates and news.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
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
        <Box mt={5} mb={4}>
          <Typography variant="body2" color={theme.palette.text.secondary} align="center">
            © 2023 Copyright:
            <Link color={theme.palette.info.main} href="https://gptstonks.github.io/">
              GPTStonks
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
