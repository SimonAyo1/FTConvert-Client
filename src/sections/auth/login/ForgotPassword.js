import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getAuth, sendPasswordResetEmail, updatePassword } from 'firebase/auth';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, TextField, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Label from '../../../components/label/Label';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function ForgotPassword() {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleReset = () => {
    setError(null)
    setMessage(null)
    setIsLoading(true);
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
        setMessage('Password reset link sent to your email');
      })
      .catch((err) => {
        setIsLoading(false);

        switch (err.code) {
          case 'auth/network-request-failed':
            setError("Can't connect to the internet !");
            break;
          case 'auth/Invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            setError('Email not found');
            break;
        
          default:
        }
        // ..
      });
  };
  return (
    <>
      <Helmet>
        <title> Reset Password | TFConvert </title>
      </Helmet>

      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Reset Password
            </Typography>
            <img
              src="https://img.freepik.com/free-photo/fun-3d-illustration-american-referee_183364-80815.jpg?w=740&t=st=1668888763~exp=1668889363~hmac=8a48cdab34b8ba4d017397d9edd196b9666dd756248fd843b61f650dfbfed758"
              alt="login"
            />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Changing Password... ? We got you covered !
            </Typography>

            <Typography variant="body2" sx={{ mb: 3 }}>
            
              <Link
                variant="subtitle2"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/auth/login', { replace: true })}
              >
                Login
              </Link>
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Stack spacing={3}>
              {error && <Label color="error">{error}</Label>}
              {message && <Label color="success">{message}</Label>}
              <TextField name="email" label="Email address" onChange={(e) => setEmail(e.target.value)} />

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                disabled={isLoading}
                onClick={handleReset}
              >
                {isLoading ? <CircularProgress color="secondary" /> : 'Reset'}
              </LoadingButton>
            </Stack>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
