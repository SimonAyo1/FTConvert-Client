import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  CircularProgress,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { LoadingButton } from '@mui/lab';
import countries from './countries.json';
import { db } from '../../../firebase-config';

// components
import Iconify from '../../../components/iconify';
import Label from '../../../components/label/Label';
// ----------------------------------------------------------------------

export default function RegForm() {
  const lg = useMediaQuery('(min-width:601px)');
  const navigate = useNavigate();
  const [fullName, setFullName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('+46');
  const [country, setCountry] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState('');
  const [transactionFee, setTransactionFee] = useState(0);

  const FetchTxFee = async () => {
    const querySnapshot = await getDocs(collection(db, 'general-settings'));
    querySnapshot.forEach((doc) => {
      setTransactionFee(doc.data().transactionFee);
      console.log(doc.data().transactionFee);
    });
  };

  useEffect(() => {
    FetchTxFee();
  }, []);

  const date = new Date();
  const handlePhoneNumber = (newValue) => {
    setPhoneNumber(newValue);
  };

  const addUserData = (id) => {
    addDoc(collection(db, 'users'), {
      userId: id,
      company: companyName,
      email,
      wallets: [],
      payment_url: `https://www.pay-tfconvert.vercel.app/${id.slice(0, 7)}`,
      balance: 0,
      customer: 0,
      country,
      fullName,
      phoneNumber,
      regTime: date.toISOString(),
      notifications: [],
      isDisabled: false,
      transactionFee,
    });
  };
  const handleLogin = async (email, password) => {
    const authentication = getAuth();
    setIsLoading(true);
    await signInWithEmailAndPassword(authentication, email, password).then(() => {
      navigate('/dashboard');
    });
  };
  const handleRegister = async () => {
    setIsLoading(true);
    const authentication = getAuth();
    if (companyName === '' || email === '' || fullName === '' || country === null) {
      setError('Some form field(s) are empty !');
      setIsLoading(false);
    } else if (!matchIsValidTel(phoneNumber)) {
      setError('Invalid Phone Number');
      setIsLoading(false);
    } else {
      await createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          setIsLoading(false);

          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
          addUserData(response.user.uid);
          return handleLogin(email, password);
        })

        .catch((err) => {
          setIsLoading(false);
          switch (err.code) {
            case 'auth/email-already-in-use':
              setError('Email already in use');
              break;
            case 'auth/invalid-email':
              setError('Invalid Email');
              break;
            case 'auth/weak-password':
              setError('Weak Password');
              break;
            default:
          }
        });
    }
  };

  return (
    <>
      {error && (
        <Label color="error" style={{ marginBottom: 20 }}>
          {error}
        </Label>
      )}

      <Stack direction={lg ? 'row' : 'column'} spacing={3}>
        <Stack spacing={3}>
          <TextField
            name="email"
            label="Email address"
            type="email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            name="company"
            label="Company's Name"
            type="text"
            required
            onChange={(e) => {
              setCompanyName(e.target.value);
            }}
          />

          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Stack>
        <Stack spacing={3}>
          <TextField
            name="Full Name"
            label="Full Name"
            required
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
          {/* <TextField
            name="Phone Number"
            label="Phone Number"
            type="tel"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          /> */}
          <MuiTelInput value={phoneNumber} required onChange={handlePhoneNumber} />
          <FormControl fullWidth style={{ width: lg ? 210 : 'inherit' }}>
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={country}
              label="Country"
              required
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            >
              {countries.map((e) => (
                <MenuItem value={e.name}>{e.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Have an account ?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        disabled={isLoading}
        onClick={handleRegister}
      >
        {isLoading ? <CircularProgress color="secondary" /> : 'Register'}
      </LoadingButton>
    </>
  );
}
