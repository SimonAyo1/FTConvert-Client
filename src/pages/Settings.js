import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { useState } from 'react';

// @mui
import { Stack, Popover, MenuItem, Container, Typography, Grid } from '@mui/material';

// components

import Iconify from '../components/iconify';
import '../styles/settings.css';
// sections

export default function Settings() {
      const user = useSelector((state) => state.user.user);
  const [open, setOpen] = useState(null);
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <Helmet>
        <title> Settings | TFConvert </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Settings
          </Typography>
          {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            CVS
          </Button> */}
        </Stack>

        <Grid item xs={12} sm={6} md={4}>
          <article className="card">
            <article className="grid gap-big">
              <div className="title">
                Payment Link
                <p>Receive payments from your customers with this link.</p>
                <p>To receive payments using this url, please follow this format.</p>
                <p>https://pay-tfconvert.vercel.app/{user.id}/:your_customer_id/:amount_to_pay</p>
              </div>
              <fieldset>
                <span>link</span>
                <div className="input-group">
                  <span>https://pay-tfconvert.vercel.app/</span>
                  <input type="text" value={user.id} className="a-input" />
                </div>
                <span style={{ marginTop: 10 }}>
                  <a href={`https://pay-tfconvert.vercel.app/${user.id}/a/b`}>https://pay-tfconvert.vercel.app/{user.id}/a/b</a>
                </span>
              </fieldset>
            </article>
            <article className="grid gap-big">
              <div className="title">Company</div>

              <fieldset>
                <span>Company Name</span>
                <input type="text" value={user.company_name} className="a-input" />
              </fieldset>
              <fieldset>
                <span>Company email</span>
                <input type="text" value={user.email} className="a-input" />
              </fieldset>
            </article>
            <article className="grid gap-big">
              <div className="title">Change Password</div>
              <div className="grid col-2 gap-medium">
                <fieldset>
                  <span>Current Password</span>
                  <input type="text" placeholder="" className="a-input" />
                </fieldset>
                <fieldset>
                  <span>New Password</span>
                  <input type="text" className="a-input" />
                </fieldset>
              </div>
            </article>
          </article>
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
  );
}
