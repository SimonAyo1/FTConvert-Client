import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { getAuth, sendEmailVerification } from 'firebase/auth';
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
import { useEffect, useState } from 'react';

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

export default function VerifyEmail(props) {
  const auth = getAuth();
  const { email } = props;
  const [verifyText, setVerifyText] = useState("Verify")
  const handleVerification = async () => {
    setVerifyText("Resend")
    await sendEmailVerification(auth.currentUser).then((e) => {
   
    });
  };
 

  return (
    <>
      <Helmet>
        <title> Verify Email </title>
      </Helmet>

      <Container style={{ marginTop: -130 }}>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            Email Verification
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>Click on verify to get a verification link sent to your email</Typography>
          <br />
          <Typography sx={{ color: 'text.primary' }}>{email}</Typography>
          <br />
          <Button size="large" variant="contained" onClick={handleVerification}>
            {verifyText}
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}
