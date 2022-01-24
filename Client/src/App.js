import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Account from './features/Account/Account';
import Contact from './features/Account/Contact/Contact';
import LoginDetails from './features/Account/LoginDetails/LoginDetails';
import Orders from './features/Account/Orders/Orders';
import OrdersProducts from './features/Account/Orders/OrdersProducts/ordersProducts';
import PaymentMethods from './features/Account/PaymentMethods/PaymentMethods';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Products from './features/Products/Products';
import Basket from './features/Basket/Basket';
import Login from './components/Login/Login';
import Register from './components/Register/Register'
import ErrorPage from './components/Error/error';
import Logout from './components/Logout/Logout';
import CheckoutSuccess from './components/Checkout/CheckoutSuccess';
import { useState } from 'react';


function App() {

  const [ timeoutId, setTimeoutId ] = useState(null);

  return (
    <Router>
      <div className="App">
        <div id='header'>
          <Navbar />
        </div>
        <div id='main'>
          <Routes>
            <Route path='/' element={<Products />} />
            <Route path='/products/:id' element={<ProductDetail />} />
            <Route path='/account' element={<Account />} />
            <Route path='/account/orders' element={<Orders />} />
            <Route path='/account/orders/:id' element={<OrdersProducts />} />
            <Route path='/account/logindetails' element={<LoginDetails />} />
            <Route path='/account/contact' element={<Contact />} />
            <Route path='/account/paymentmethods' element={<PaymentMethods />} />
            <Route path='/basket' element={<Basket />} />
            <Route path='/checkout-success' element={<CheckoutSuccess />} />
            <Route path='/login' element={<Login setTimeoutId={setTimeoutId} />} />
            <Route path='/logout' element={<Logout timeoutId={timeoutId} />} />
            <Route path='/register' element={<Register setTimeoutId={setTimeoutId}  />} />
            <Route path='/error' element={<ErrorPage />} />
            <Route path='*' element={<div><p>Nothing Here!</p></div>} /> 
          </Routes>
        </div>
        <div id='footer'>
          <p>&#9400; The Ukulele Site 2022</p>
        </div>
      </div>
    </Router>
  );
}

export default App;
