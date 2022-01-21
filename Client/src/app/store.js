import { combineReducers, configureStore } from '@reduxjs/toolkit';
import basketSlice from '../features/Basket/basketSlice';
import basketProductsSlice from '../features/Basket/BasketProducts/basketProductsSlice';
import contactSlice from '../features/Account/Contact/contactSlice';
import productsSlice from '../features/Products/productsSlice';
import userSlice from '../userSlice';
import paymentSlice from '../features/Account/PaymentMethods/paymentSlice';
import loginDetailsSlice from '../features/Account/LoginDetails/loginDetailsSlice'
import ordersSlice from '../features/Account/Orders/ordersSlice';
import guestSlice from '../guestSlice';

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import ordersProductsSlice from '../features/Account/Orders/OrdersProducts/ordersProductsSlice';



const appReducer = combineReducers({
  products: productsSlice,
  basket: basketSlice,
  basketProducts: basketProductsSlice,
  contacts: contactSlice,
  user: userSlice,
  paymentMethod: paymentSlice,
  loginDetails: loginDetailsSlice,
  orders: ordersSlice,
  ordersProducts: ordersProductsSlice,
  guest: guestSlice
});

const rootReducer = (state, action) => {
  if (action.type === 'user/logout') {
    state = undefined
  }

  return appReducer(state, action);
}

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

//using persist allows redux to keep state after a page refresh
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});
