import { useState } from 'react';

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
  Alert,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { LoadingButton } from '@mui/lab';
import countries from './countries.json';
import { app, db } from '../../../firebase-config';

// components
import Iconify from '../../../components/iconify';
import Label from '../../../components/label/Label';
// ----------------------------------------------------------------------

export default function RegForm() {
  const lg = useMediaQuery('(min-width:601px)');
  const navigate = useNavigate();
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);
  const [country, setCountry] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState('');
  const date = new Date()
  const addUserData = (id) => {
    addDoc(collection(db, 'users'), {
      userId: id,
      company: companyName,
      email,
      wallets: [],
      payment_url: `https://www.tfconvert.com/pay/${id.slice(0, 7)}`,
      balance: 0,
      customer: 0,
      country,
      age,
      gender,
      regTime: date.toISOString(),
      notifications: [],
      isDisabled: false
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
    await createUserWithEmailAndPassword(authentication, email, password)
      .then((response) => {
        setIsLoading(false);

        console.log(response);
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
  };

  return (
    <>
      <Stack direction={lg ? 'row' : 'column'} spacing={3}>
        {error && <Label color="error">{error}</Label>}
        <Stack spacing={3}>
          <TextField
            name="email"
            label="Email address"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            name="company"
            label="Company's Name"
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
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Stack>
        <Stack spacing={3}>
          <FormControl fullWidth style={{ width: lg ? 210 : 'inherit' }}>
            <InputLabel id="demo-simple-select-label">Age Group</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age Group"
              onChange={(e) => {
                setAge(e.target.value);
              }}
            >
              <MenuItem value="20 - 25">20 - 25</MenuItem>
              <MenuItem value="26 - 30">26 - 30</MenuItem>
              <MenuItem value="31 - 35">31 - 35</MenuItem>
              <MenuItem value="36 - 40">36 - 40</MenuItem>
              <MenuItem value="41 - 45">41 - 45</MenuItem>
              <MenuItem value="45 - 50">45 - 50</MenuItem>
              <MenuItem value="51 - 60">51 - 60</MenuItem>
              <MenuItem value="61 - 70">61 - 70</MenuItem>
              <MenuItem value="70 above">70 above</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth style={{ width: lg ? 210 : 'inherit' }}>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={gender}
              label="Gender"
              onChange={(e) => {
                setGender(e.target.value);
              }}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth style={{ width: lg ? 210 : 'inherit' }}>
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={country}
              label="Country"
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
