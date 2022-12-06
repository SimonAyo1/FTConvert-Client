

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
import { RegForm } from '../sections/auth/Register';
// sections


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

export default function Register() {
     const navigate = useNavigate();
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> Register | TFConvert </title>
      </Helmet>

      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Let's Get You Registered !
            </Typography>
            <img
              src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=740&t=st=1670347211~exp=1670347811~hmac=3c499be808b828276ea6c76225394a05632089acc9da9187a11ed2dafa4f3370"
              alt="login"
            />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign up for TFConvert
            </Typography>

            <Typography variant="body2" sx={{ mb: 3 }}>
              Have an account? {''}
              <Link
                variant="subtitle2"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/auth/login', { replace: true })}
              >
                Log in
              </Link>
            </Typography>

            <Divider sx={{ my: 3 }} />

            <RegForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
