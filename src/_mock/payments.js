import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const PAYMENTLIST = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  method: sample([
    'Card',
    'Neobank',
    'Wells Fargo',
    'Stripe Alt',
  ]),
  amount: faker.commerce.price(18, 329),
  status: sample(['Success', 'Error']),
  date: faker.date.recent().toLocaleString(),
  userId: faker.datatype.uuid()
}));

export default PAYMENTLIST;
