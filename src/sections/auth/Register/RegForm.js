import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, CircularProgress, Alert } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { LoadingButton } from '@mui/lab';
import { app, db } from '../../../firebase-config';

// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function RegForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState('');
  const addUserData = (id) => {
    addDoc(collection(db, 'users'), {
      userId: id,
      company: companyName,
      email,
      wallets: [],
      payment_url: `https://www.tfconvert.com/pay/${id.slice(0, 7)}`,
      balance: 0,
      customer: 0,
    });
  };
  const handleRegister = async () => {
    setIsLoading(true);
    const authentication = getAuth();
    await createUserWithEmailAndPassword(authentication, email, password)
      .then((response) => {
        setIsLoading(false);

        console.log(response);
        sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
        navigate('/auth/login', { replace: true });
        return addUserData(response.user.uid);
      })

      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setError(error);
      });
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          name="company"
          label="Company's Name"
          onChange={(e) => {
            setCompanyName(e.target.value);
          }}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Have an account ?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        disabled={isLoading}
        onClick={handleRegister}
      >
        {isLoading ? <CircularProgress color="warning" /> : 'Register'}
      </LoadingButton>
      {error && <Alert color="error">{error}</Alert>}
    </>
  );
}
