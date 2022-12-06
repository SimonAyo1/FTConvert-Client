import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { useContext, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { updateEmail } from 'firebase/auth';
import { Link } from 'react-router-dom';
// @mui
import { Stack, Container, Typography, Grid, Button, CircularProgress } from '@mui/material';

// components

import Iconify from '../components/iconify';
import '../styles/settings.css';
import { db } from '../firebase-config';
import { AuthContext } from '../context/AuthContext';
import UserDisabled from './UserDisabled';

// sections

export default function Settings() {
  const user = useSelector((state) => state.user.user);
  const [open, setOpen] = useState(null);
  const userRef = doc(db, 'users', `${user.dId}`);
  const [companyName, setCompanyName] = useState(null);
  const [email, setEmail] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdatingCN, setIsUpdatingCN] = useState(false);
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const handleCompanyNameUpdate = async () => {
    setIsUpdatingCN(true);
    if (companyName === null) {
      alert('Please enter a name');
      setIsUpdatingCN(false);
    } else {
      await updateDoc(userRef, {
        company: companyName,
      }).then(() => {
        setIsUpdatingCN(false);
        alert('Successfully Updated !');
      });
    }
  };
  const handleEmailUpdate = async () => {
    setIsUpdatingEmail(true);
    if (email === null) {
      alert('Please enter a new email');
      setIsUpdatingCN(false);
    } else {
      await updateDoc(userRef, {
        email,
      }).then(() => {});
      await updateEmail(currentUser, email)
        .then(() => {
          setIsUpdatingEmail(false);
          alert('Successfully Updated !');
        })
        .catch((error) => {
          setIsUpdatingEmail(false);
         
          // An error occurred
          // ...
        });
    }
  };
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
        <title> Settings | TFConvert </title>
      </Helmet>
      {!isDisabled ? (
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
                    <a href={`https://pay-tfconvert.vercel.app/${user.id}/a/b`}>
                      https://pay-tfconvert.vercel.app/{user.id}/a/b
                    </a>
                  </span>
                </fieldset>
              </article>
              <article className="grid gap-big">
                <div className="title">Company</div>

                <fieldset>
                  <span>Company Name</span>
                  <input
                    type="text"
                    placeholder={user.company_name}
                    className="a-input"
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                  <br />
                  <Button
                    variant="outlined"
                    size="small"
                    style={{ width: '10%', alignSelf: 'flex-end' }}
                    onClick={handleCompanyNameUpdate}
                  >
                    {isUpdatingCN ? <CircularProgress color="secondary" size={20} /> : 'Update'}
                  </Button>
                </fieldset>
                <fieldset>
                  <span>Company email</span>
                  <input
                    type="text"
                    placeholder={user.email}
                    className="a-input"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <br />
                  <Button
                    variant="outlined"
                    size="small"
                    style={{ width: '10%', alignSelf: 'flex-end' }}
                    onClick={handleEmailUpdate}
                  >
                    {isUpdatingEmail ? <CircularProgress color="secondary" size={20} /> : 'Update'}
                  </Button>
                </fieldset>
              </article>
              <article className="grid gap-big">
                <Link to="/auth/reset-password" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" style={{ width: '30%' }}>
                    Change Password
                  </Button>
                </Link>
              </article>
            </article>
          </Grid>
        </Container>
      ) : (
        <UserDisabled />
      )}
    </>
  );
}
