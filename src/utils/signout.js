import { getAuth, signOut } from 'firebase/auth';
import { redirect } from 'react-router-dom';

const auth = getAuth();
export const handleSignOut = async () => {
await signOut(auth)
  .then(() => {
    console.log("signed out")
    redirect('/auth/login')
  })
  .catch((error) => {
    console.log(error.message);
  });
}

