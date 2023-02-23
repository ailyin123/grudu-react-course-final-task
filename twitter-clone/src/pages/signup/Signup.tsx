import { useState, SyntheticEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import * as EmailValidator from 'email-validator';


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

  const [errors, setErrors] = useState<ErrorType>({
    email: null,
    name: null,
    password: null
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    let errors: ErrorType = {
      email: null,
      name: null,
      password: null
    }

    setErrors(errors);

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
      setErrors(errors);

      return;
    }

    (async () => {
      try {
        const result = await signUpUser(form);

        localStorage.setItem('authId', result.id);

        navigate('/');
      } catch (e) {
        alert(e);
      }
    })();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Email
          <input type="text" name="email" onChange={handleChange} value={form.email} />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </label>
      </div>
      <div>
        <label>
          Full name
          <input type="text" name="name" onChange={handleChange} value={form.name} />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </label>
      </div>
      <div>
        <label>
          Password
          <input type="password" name="password" onChange={handleChange} value={form.password} />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Signup;
