import { useState, SyntheticEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { loginUser } from '../../api/loginUser';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    setError(null);

    if (form.password === '' || form.email === '') {
      setError('Please provide email and password');

      return;
    }

    (async () => {
      try {
        const result = await loginUser(form);

        if (result.password !== form.password) {
          setError('Invalid email or password');

          return;
        }

        localStorage.setItem('authId', result.id);
        navigate('/');
      } catch (e) {
        if (e instanceof Error && e.message === 'NotFound') {
          setError('Invalid username or password');
        }
      }
    })();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email
            <input type="text" name="email" onChange={handleChange} value={form.email} />
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" onChange={handleChange} value={form.password} />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
      {error && <div>{error}</div>}
    </>
  );
}

export default Login;
