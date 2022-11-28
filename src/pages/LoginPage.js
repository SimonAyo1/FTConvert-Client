import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';

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

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');
   const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title> Login | TFConvert </title>
      </Helmet>

      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back To TFConvert
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
              Sign in to TFConvert
            </Typography>

            <Typography variant="body2" sx={{ mb: 3 }}>
              Don’t have an account? {''}
              <Link
                variant="subtitle2"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/auth/register', { replace: true })}
              >
                Get started
              </Link>
            </Typography>

            <Divider sx={{ my: 3 }} />

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
