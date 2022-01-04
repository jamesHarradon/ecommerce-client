import { configureStore } from '@reduxjs/toolkit';

import productsSlice from '../components/Products/productsSlice';

export const store = configureStore({
  reducer: {
    products: productsSlice,
  },
});
