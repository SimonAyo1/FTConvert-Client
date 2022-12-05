//
import { AuthProvider } from '../../context/AuthContext';
import MainLayout from './MainLayout';

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  return (
    <AuthProvider>
      <>
        <MainLayout />
      </>
    </AuthProvider>
  )
}
