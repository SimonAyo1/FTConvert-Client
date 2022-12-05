import React, { useState, useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {  useDispatch } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { db } from "../../firebase-config";
import { userActions } from '../../store/user/userSlice';
import Header from './header';
import Nav from './nav';
import { AuthContext } from '../../context/AuthContext';
import VerifyEmail from '../../pages/VerifyEmail';



// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export default function MainLayout() {
 
  const { currentUser, isEmailVerified } = useContext(AuthContext);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);
  
    const [data, setData] = useState({
      id: null,
      company_name: null,
      email: null,
      payment_url: null,
      balance: null,
      wallets: [],
    });
    const fetchData = async (id) => {
      const req = query(collection(db, 'users'), where('userId', '==', `${id}`));
      const querySnapshot = await getDocs(req).catch((e) => {
        console.log(e);
      });
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        setData({
          id: doc.data().userId,
          company_name: doc.data().company,
          email: doc.data().email,
          payment_url: doc.data().payment_url,
          balance: doc.data().balance,
          wallets: doc.data().wallets,
        });
        dispatch(
          userActions.addUser({
            id: doc.data().userId,
            company_name: doc.data().company,
            email: doc.data().email,
            payment_url: doc.data().payment_url,
            balance: doc.data().balance,
            wallets: doc.data().wallets,
            dId: doc.id
          })
        );
        console.log(doc.data());
        console.log('data', data.balance);
        setIsLoading(false);
      });
    };

    useEffect(() => {
      fetchData(currentUser.uid);
    }, []);
  console.log("main main")
  const [open, setOpen] = useState(false);

  return currentUser ? (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />

      <Nav openNav={open} onCloseNav={() => setOpen(false)} />

      <Main>{ isEmailVerified ? (
        !isLoading ? (<Outlet />) :  (
    <CircularProgress color="secondary" />
  )) : (<VerifyEmail email={currentUser.email} />)}</Main>
    </StyledRoot>
  ) : (
    ''
  );
}
