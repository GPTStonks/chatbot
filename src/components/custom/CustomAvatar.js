import { Avatar } from '@mui/material';

export const CustomAvatar = ({ message, humanUser, theme, botAvatar, userAvatar }) => {
  return (
    <Avatar
      sx={{
        backgroundColor: 'transparent',
        color: theme.palette.background.paper,
        width: { xs: 24, md: 24, lg: 34 },
        height: { xs: 24, md: 24, lg: 34 },
        '& img': {
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '50%',
        },
      }}
    >
      {message.user === humanUser ? (
        <img src={userAvatar ? userAvatar : "favicon.ico"} alt="Avatar" />
      ) : (
        <img src="favicon.ico" alt="Avatar" />
      )}
    </Avatar>
  );
};
