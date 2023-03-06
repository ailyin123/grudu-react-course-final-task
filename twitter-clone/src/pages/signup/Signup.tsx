import { useState, SyntheticEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import * as EmailValidator from 'email-validator';
import { Grid, Typography, Card, CardContent, TextField, Button, Snackbar, Alert, Link } from '@mui/material';

import { signUpUser } from '../../api/signUpUser';

interface ErrorType {
  email: string | null;
  name: string | null;
  password: string | null;
}

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    name: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState<ErrorType>({
    email: null,
    name: null,
    password: null
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

    let errors: ErrorType = {
      email: null,
      name: null,
      password: null
    }

    setFormErrors(errors);

    if (!EmailValidator.validate(form.email)) {
      errors = { ...errors, email: 'Invalid email' };
    }

    if (form.name.length < 1 || form.name.length > 512) {
      errors = { ...errors, name: 'Invalid name' };
    }

    if (form.password.length < 8 || form.password.length > 256) {
      errors = { ...errors, password: 'Invalid password' };
    }

    if (errors.email || errors.name || errors.password) {
      setFormErrors(errors);

      return;
    }

    (async () => {
      try {
        const result = await signUpUser(form);

        localStorage.setItem('authId', result.id);

        navigate('/');
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
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
            <Typography align="center">Sign up</Typography>
            <form onSubmit={handleSubmit}>
            <TextField
                name="email"
                label="Email"
                variant="outlined"
                size="small"
                onChange={handleChange}
                value={form.email}
                margin="dense"
                fullWidth
                error={!!formErrors.email}
                helperText={formErrors.email}
              />
              <TextField
                name="name"
                label="Full name"
                variant="outlined"
                size="small"
                onChange={handleChange}
                margin="dense"
                value={form.name}
                fullWidth
                error={!!formErrors.name}
                helperText={formErrors.name}
              />
              <TextField
                name="password"
                type="password"
                label="Password"
                variant="outlined"
                size="small"
                onChange={handleChange}
                value={form.password}
                margin="dense"
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
          Already have an account? <Link href="/login">Log in</Link>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Signup;
