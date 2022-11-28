import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';


// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase-config';
import { userActions } from '../store/user/userSlice';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';


// ----------------------------------------------------------------------

export default function DashboardAppPage() {
 const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  
  const [isLoading , setIsLoading] = useState(true)
  
 const [data , setData] = useState({
  id: null,
  company_name: null,
  email: null,
  payment_url: null,
  balance: null,
  wallets: []
 })
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
    

  const theme = useTheme();


  return !isLoading && currentUser ? (
    <>
      <Helmet>
        <title> Dashboard | TFConvert </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back {data.company_name}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Balance" total={`${data.balance}`} icon={'mdi:money'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Customers" total={`${data.customer}`} icon={'ic:baseline-people-alt'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Wallets"
              total={`${data.wallets.length}`}
              icon={'material-symbols:account-balance-wallet'}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <AppWebsiteVisits
              title="Revenue"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Card',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Neobank',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Crypto',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="Crypto News Updates"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.lorem.words(5),
                description: faker.lorem.words(3),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Fiat - Crypto Swap"
              chartData={[
                { label: 'BTC', value: 4344 },
                { label: 'ETH', value: 5435 },
                { label: 'BUSD', value: 1443 },
                { label: 'USDT', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  ) : (
    'Loading data...'
  );
}
