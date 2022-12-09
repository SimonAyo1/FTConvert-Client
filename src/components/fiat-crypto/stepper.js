import react, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';
import { TextField, FormControl, InputLabel, Select, MenuItem, CircularProgress, Alert } from '@mui/material';
import { useSelector } from 'react-redux';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';

const steps = ['Select crypto', 'Checkout', 'Receive Crypto'];

export default function FTCStepper() {
  const user = useSelector((state) => state.user.user);
  const date = new Date();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [coin, setCoin] = useState(null);
  const [amount, setAmount] = useState(null);
  const [address, setAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const [acceptedCryptos, setAcceptedCryptos] = useState([]);
  const [isFetchingCrypto, setIsFetchingCrypto] = useState(false);
  const [rate, setRate] = useState(null);

  const fetchAcceptedCryptos = async () => {
    setIsFetchingCrypto(true);
    const querySnapshot = await getDocs(collection(db, 'accepted-cryptos')).catch(() =>
      alert('Please check your network, crypto list is not loaded')
    );
    if (querySnapshot.empty) {
      setAcceptedCryptos([{ name: 'Crypto has not been added' }]);
      setIsFetchingCrypto(false);
    } else {
      querySnapshot.forEach((doc) => {
        setIsFetchingCrypto(false);
        console.log('fetched');
        setAcceptedCryptos((e) => [
          ...e,
          {
            name: doc.data().name,
            rate: doc.data().rate,
            dId: doc.id,
          },
        ]);
      });
    }
  };

  const handleRequest = async (id) => {
    setIsLoading(true);
    if (user.balance !== 0) {
      await addDoc(collection(db, 'users_crypto_fiat_requests'), {
        id: uuidv4().slice(0, 10),
        userId: user.id,
        amount,
        company: user.company_name,
        cryptocurrency: coin,
        status: 'pending',
        wallet_address: address,
        price: (amount * rate),
        time: date.toUTCString(),
        transactionFee: (user.transactionFee / 100) * (amount * rate),
      })
        .then((e) => {
          alert('successfuly requested');
          setIsLoading(false);
        })
        .catch((e) => {
          alert(e.message);

          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setError('Your Balance Is Not Enough !');
    }
  };
  const handleChange = (event) => {
    setCoin(event.target.value);
  };
  const isStepOptional = (step) => {
    return step === null;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    if (activeStep === steps.length - 1) {
      handleRequest();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    fetchAcceptedCryptos();
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <fragment>
          <div>
            {isLoading ? (
              <div style={{ textAlign: 'center', marginTop: 50 }}>
                <CircularProgress />
              </div>
            ) : (
              <div style={{ textAlign: 'center', marginTop: 50 }}>
                {error === null ? (
                  <Alert severity="success">
                    You have successfuly requested for a payment of {amount} {coin} !
                  </Alert>
                ) : (
                  <Alert severity="error">{error}</Alert>
                )}
              </div>
            )}
          </div>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Buy Again</Button>
          </Box>
        </fragment>
      ) : (
        <fragment>
          {activeStep === 0 &&
            (isFetchingCrypto ? (
              <CircularProgress color="secondary" size={20} />
            ) : (
              <div style={{ marginTop: 50 }}>
                <div style={{ marginBottom: 10 }}>
                  {' '}
                  <TextField
                    id="amount"
                    label="Amount"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <div style={{ marginBottom: 10 }}>
                  {' '}
                  <TextField
                    id="address"
                    label="Wallet Address"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Crypto</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={coin}
                      label="Crypto"
                      onChange={handleChange}
                    >
                      <MenuItem value={null}>Crypto</MenuItem>
                      {acceptedCryptos.map((crypto) => (
                        <MenuItem value={crypto.name} onClick={() => setRate(crypto.rate)}>
                          {crypto.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
            ))}
          {activeStep === 1 && (
            <div className="receipt" style={{ marginTop: 40, marginBottom: 20 }}>
              <header className="receipt__header">
                <p className="receipt__title">Transaction Overview</p>
                <p className="receipt__date">{date.toUTCString()}</p>
              </header>
              <dl className="receipt__list">
                <div className="receipt__list-row">
                  <dt className="receipt__item">Cryptocurrency</dt>
                  <dd className="receipt__cost">{coin}</dd>
                </div>
                <div className="receipt__list-row">
                  <dt className="receipt__item">Amount</dt>
                  <dd className="receipt__cost">{amount}</dd>
                </div>
                <div className="receipt__list-row">
                  <dt className="receipt__item">Cost</dt>
                  <dd className="receipt__cost">${amount * rate}</dd>
                </div>
                <div className="receipt__list-row">
                  <dt className="receipt__item">Transaction Fee</dt>
                  <dd className="receipt__cost">${(user.transactionFee / 100) * (amount * rate)}</dd>
                </div>
                <div className="receipt__list-row">
                  <dt className="receipt__item">Wallet</dt>
                  <dd className="receipt__cost">{address}</dd>
                </div>
              </dl>
            </div>
          )}
          {activeStep === 2 && (
            <div>
              <p>Ready to buy ?</p>
            </div>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            <Button onClick={handleNext} disable={isLoading}>
              {activeStep === steps.length - 1 ? 'Buy Crypto' : 'Next'}
            </Button>
          </Box>
        </fragment>
      )}
    </Box>
  );
}
