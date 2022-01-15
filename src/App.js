import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCartId, selectUserId } from './userSlice';

import './App.css';
import Navbar from './components/navbar/Navbar';
import Account from './components/Account/Account';
import Contact from './components/Account/Contact/Contact';
import LoginDetails from './components/Account/LoginDetails/LoginDetails';
import Orders from './components/Account/Orders/Orders';
import PaymentMethods from './components/Account/PaymentMethods/PaymentMethods';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Products from './components/Products/Products';
import Basket from './components/Basket/Basket';
import Login from './components/Login/Login';
import Register from './features/Register/Register';
import ErrorPage from './components/Error/error';
import Logout from './components/Logout/Logout';
import CheckoutSuccess from './components/Checkout/CheckoutSuccess';
import { selectGuestId, selectGuestBasket } from './guestSlice';




function App() {

  
  const userId = useSelector(selectUserId);
  const cartId = useSelector(selectCartId);
  const guestId = useSelector(selectGuestId);
  const guestBasket = useSelector(selectGuestBasket);

  return (
    <Router>
      <div className="App">
        <div id='header'>
          <Navbar userId={userId} guestBasket={guestBasket}/>
        </div>
        <div id='main'>
          <Routes>
            <Route path='/' element={<Products userId={userId} guestId={guestId} guestBasket={guestBasket} />} />
            <Route path='/products/:id' element={<ProductDetail />} />
            <Route path='/account' element={<Account />} />
            <Route path='/account/orders' element={<Orders userId={userId}/>} />
            <Route path='/account/logindetails' element={<LoginDetails userId={userId} />} />
            <Route path='/account/contact' element={<Contact userId={userId} />} />
            <Route path='/account/paymentmethods' element={<PaymentMethods userId={userId} />} />
            <Route path='/basket' element={<Basket userId={userId} guestId={guestId} guestBasket={guestBasket} cartId={cartId} />} />
            <Route path='/checkout-success' element={<CheckoutSuccess userId={userId} cartId={cartId} />} />
            <Route path='/login' element={<Login guestId={guestId} guestBasket={guestBasket} />} />
            <Route path='/logout' element={<Logout guestId={guestId} />} />
            <Route path='/register' element={<Register guestBasket={guestBasket} />} />
            <Route path='/error' element={<ErrorPage />} />
            <Route path='*' element={<div><p>Nothing Here!</p></div>} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
