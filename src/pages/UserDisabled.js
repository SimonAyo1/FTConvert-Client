import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';

// ----------------------------------------------------------------------

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

export default function UserDisabled() {
  return (
    <>
      <Helmet>
        <title> User Diasbled | TFConvert </title>
      </Helmet>

      <Container style={{marginTop: -100}}>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
           Disabled Account !
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            For some reasons your account has been disabled. Please contact the company.
          </Typography>

         
        </StyledContent>
      </Container>
    </>
  );
}
