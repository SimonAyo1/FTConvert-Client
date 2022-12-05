import { getAuth, sendPasswordResetEmail, updatePassword } from 'firebase/auth';
import { useState } from 'react';

const useResetPassword = (email = null, user = null, newPassword = null, type) => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  switch (type) {
    case 'reset-from-login':
      const auth = getAuth();
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setMessage('Password reset link sent to your email');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(error.message);
          // ..
        });
      break;
    case 'reset-from-dashboard':
      updatePassword(user, newPassword)
        .then(() => {
          setMessage('Password Reset Successfull');
        })
        .catch((error) => {
          setError(error.message);
          console.log(error);
        });
        break;
    default:
      break;
  }

  return { message, error };
};
export default useResetPassword;
