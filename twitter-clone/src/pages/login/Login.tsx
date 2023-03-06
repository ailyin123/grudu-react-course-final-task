import { useState, SyntheticEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Card, CardContent, TextField, Button, Snackbar, Alert, Link } from '@mui/material';

import { loginUser } from '../../api/loginUser';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    let errors = {
      email: '',
      password: '',
    }

    setFormErrors(errors);

    if (form.email === '') {
      errors = { ...errors, email: 'Email is required' };
    }

    if (form.password === '') {
      errors = { ...errors, password: 'Password is required' };
    }

    if (form.password === '' || form.email === '') {
      setFormErrors(errors);

      return;
    }

    (async () => {
      try {
        const result = await loginUser(form);

        localStorage.setItem('authId', result.id);
        navigate('/');
      } catch (e) {
        if (e instanceof Error && e.message === 'NotFound') {
          setError('Invalid username or password');
          setOpen(true);
        }
      }
    })();
  }

  return (
    <Grid container height="100%" alignItems="center" justifyContent="center">
      <Grid item>
        <Card sx={{ width: '400px', marginBottom: '12px' }} variant="outlined">
          <CardContent>
            <Typography align="center">Log in</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                size="small"
                onChange={handleChange}
                value={form.email}
                margin="normal"
                fullWidth
                error={!!formErrors.email}
                helperText={formErrors.email}
              />
              <TextField
                name="password"
                type="password"
                label="Password"
                variant="outlined"
                size="small"
                onChange={handleChange}
                value={form.password}
                fullWidth
                error={!!formErrors.password}
                helperText={formErrors.password}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ marginTop: '10px' }}
              >
                Submit
              </Button>
            </form>
            <Snackbar
              open={open}
              autoHideDuration={2000}
              onClose={handleClose}
            >
              <Alert severity="error" sx={{ width: '100%' }}>
                {error}
              </Alert>
            </Snackbar>
          </CardContent>
        </Card>
        <Typography align="center">
          Don't have an account? <Link href="/signup">Sign up</Link>
        </Typography>
      </Grid>
    </Grid>

  );
}

export default Login;
