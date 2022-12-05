import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(null);
  // const [uid, setUid] = useState(null);
 const navigate = useNavigate();  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/auth/login');
      } else {
        setCurrentUser(user);
        setPending(false);
        setIsEmailVerified(user.emailVerified);
      }
    });
  }, []);

  if (pending) {
    return (
      <>
        {' '}
        <div className="spinner">
          <div className="circle one" />
          <div className="circle two" />
          <div className="circle three" />
        </div>
      </>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isEmailVerified,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
