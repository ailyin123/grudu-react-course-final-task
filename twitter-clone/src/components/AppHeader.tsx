import { Box, AppBar, Toolbar, Typography, Avatar } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../App';
import stringAvatar from '../utils/stringAvatar';

const AppHeader = () => {
  const { user } = useContext(UserContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Another Twitter Clone
          </Typography>
          {user && <Avatar {...stringAvatar(user.name)} />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default AppHeader;
