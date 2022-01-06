import { configureStore } from '@reduxjs/toolkit';
import basketSlice from '../components/Basket/basketSlice';
import contactSlice from '../components/Account/Contact/contactSlice';
import productsSlice from '../components/Products/productsSlice';
import userSlice from '../userSlice';
import paymentSlice from '../components/Account/PaymentMethods/paymentSlice';
import loginDetailsSlice from '../components/Account/LoginDetails/loginDetailsSlice'
import ordersSlice from '../components/Account/Orders/ordersSlice'

export const store = configureStore({
  reducer: {
    products: productsSlice,
    basketProducts: basketSlice,
    contacts: contactSlice,
    user: userSlice,
    paymentMethod: paymentSlice,
    loginDetails: loginDetailsSlice,
    orders: ordersSlice

  },
});
