import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Stack, Popover, MenuItem, Container, Typography, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
// components
import Wallet from '../components/fiat-crypto/wallet';
import Iconify from '../components/iconify';
import UserDisabled from './UserDisabled';

// sections

export default function Swap() {
  const [open, setOpen] = useState(null);
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const isDisabled = useSelector((state) => state.user.user.isDisabled);
  return (
    <>
      <Helmet>
        <title> Swap | TFConvert </title>
      </Helmet>
      {!isDisabled ? (
        <>
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Fiat To Crypto
              </Typography>
              {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            CVS
          </Button> */}
            </Stack>

            <Grid item xs={12} sm={6} md={4}>
              <div style={{ overflowX: 'scroll' }}>
                <Wallet />
              </div>
            </Grid>
          </Container>

          <Popover
            open={Boolean(open)}
            anchorEl={open}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
                p: 1,
                width: 140,
                '& .MuiMenuItem-root': {
                  px: 1,
                  typography: 'body2',
                  borderRadius: 0.75,
                },
              },
            }}
          >
            <MenuItem>
              <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
              Edit
            </MenuItem>

            <MenuItem sx={{ color: 'error.main' }}>
              <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
              Delete
            </MenuItem>
          </Popover>
        </>
      ) : (
        <UserDisabled />
      )}
    </>
  );
}
