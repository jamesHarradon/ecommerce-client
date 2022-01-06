import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setUserId, selectUserId } from './userSlice';

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



function App() {

  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

  useEffect(() => {
    dispatch(setUserId());  
  },[dispatch])

  return (
    <Router>
      <div className="App">
        <div id='header'>
          <Navbar userId={userId}/>
        </div>
        <Routes>
          <Route path='/' element={<Products userId={userId} />} />
          <Route path='/products/:id' element={<ProductDetail />} />
          <Route path='/account' element={<Account />} />
          <Route path='/account/orders' element={<Orders userId={userId}/>} />
          <Route path='/account/logindetails' element={<LoginDetails userId={userId} />} />
          <Route path='/account/contact' element={<Contact userId={userId} />} />
          <Route path='/account/paymentmethods' element={<PaymentMethods userId={userId} />} />
          <Route path='/basket' element={<Basket userId={userId} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/register' element={<Register />} />
          <Route path='/error' element={<ErrorPage />} />
          <Route path='*' element={<div><p>Nothing Here!</p></div>} /> 
        </Routes>
        </div>
      
    </Router>
  );
}

export default App;
