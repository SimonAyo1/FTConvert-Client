import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, CircularProgress, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import Label from '../../../components/label/Label';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    const authentication = getAuth();

    await signInWithEmailAndPassword(authentication, email, password)
      .then(() => {
        setIsLoading(false);

        navigate('/dashboard');
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.code);
        switch (err.code) {
          case 'auth/network-request-failed':
            setError("Can't connect to the internet !");
            break;
          case 'auth/Invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            setError('Invalid user credentials');
            break;
          case 'auth/wrong-password':
            setError('Wrong password');
            break;
          default:
        }
      });
  };

  return (
    <>
      <Stack spacing={3}>
        {error && <Label color="error">{error}</Label>}
        <TextField name="email" label="Email address" onChange={(e) => setEmail(e.target.value)} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link
          variant="subtitle2"
          underline="hover"
          onClick={() => navigate('/auth/reset-password', { replace: true })}
          style={{ cursor: 'pointer' }}
        >
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        disabled={isLoading}
        onClick={handleLogin}
      >
        {isLoading ? <CircularProgress color="secondary" /> : 'Login'}
      </LoadingButton>
    </>
  );
}
