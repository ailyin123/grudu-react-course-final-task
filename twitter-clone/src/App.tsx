import React from 'react';
import { Container, Box, AppBar, Toolbar, Typography, Button} from '@mui/material';

const App = ({ children }: { children: React.ReactNode}) => {
  return (
    <Container sx={{ height: '100vh' }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Another Twitter Clone
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box height="100%">
        {children}
      </Box>
    </Container>
  );
}

export default App;
