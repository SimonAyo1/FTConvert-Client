import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//

import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import Payments from './pages/Payments';
import Swap from './pages/Swap';
import Register from './pages/Register';
import Settings from './pages/Settings';
import ForgotPassword from './sections/auth/login/ForgotPassword';


// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'payments', element: <Payments /> },
        { path: 'fiat-crypto', element: <Swap /> },
        { path: 'settings', element: <Settings /> },
      ],
    },
    {
      path: 'auth/login',
      element: <LoginPage />,
    },
    {
      path: 'auth/reset-password',
      element: <ForgotPassword />,
    },
    {
      path: 'auth/register',
      element: <Register />,
    },

    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
