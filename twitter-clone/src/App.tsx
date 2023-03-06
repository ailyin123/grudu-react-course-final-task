import React, { createContext, useEffect, useState } from 'react';
import { Container, Box } from '@mui/material';

import AppHeader from './components/AppHeader';
import { getUser } from './api/getUser';

export const UserContext = createContext<{ user: any, setUser: any}>({
  user: null,
  setUser: null
});

const App = ({ children }: { children: React.ReactNode}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = localStorage.getItem('authId');

    if (auth) {
      (async () => {
        try {
          const result = await getUser(auth);

          setUser(result);
        } catch (e) {
          if (e instanceof Error) {
            console.log(e.message);
          }
        }
      })();
    } else {
      setUser(null);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Container sx={{ height: '100vh' }} disableGutters>
        <AppHeader />
        <Box height="100%">
          {children}
        </Box>
      </Container>
    </UserContext.Provider>
  );
}

export default App;
