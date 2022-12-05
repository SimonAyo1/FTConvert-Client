import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useSelector } from 'react-redux';

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, CircularProgress } from '@mui/material';

// sections
import { AppNewsUpdate, AppCurrentVisits, AppWebsiteVisits, AppWidgetSummary } from '../sections/@dashboard/app';
import UserDisabled from './UserDisabled';


// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
   const user = useSelector((state) => state.user.user);
    const isDisabled = useSelector((state) => state.user.user.isDisabled);
   
  return  ( 
    
    !isDisabled ?
 (
    <>
      <Helmet>
        <title> Dashboard | TFConvert </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back {user.company_name}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Balance" total={`${user.balance}`} icon={'mdi:money'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Customers" total={`${user.customer}`} icon={'ic:baseline-people-alt'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Wallets"
              total={`${user.wallets.length}`}
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
 ) : (<UserDisabled />) 
  )   
   
}
