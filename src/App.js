import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useEffect, useState } from 'react';

import './App.css';
import Navbar from './components/navbar/Navbar';
import Account from './components/Account/Account';
import Addresses from './components/Account/Addresses/Addresses';
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

  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ userId, setUserId ] = useState('')

  const checkActive = async () => {
    try {
      const response = await fetch('http://localhost:4000/auth/active/2', {credentials: 'include'});
      if (response.ok) {
        const json = await response.json();
        setLoggedIn(true);
        setUserId(json)
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    checkActive();
  })

  return (
    <Router>
      <div className="App">
        <div id='header'>
          <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        </div>
        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='/products/:id' element={<ProductDetail />} />
          <Route path='/account' element={<Account />} />
          <Route path='/account/orders' element={<Orders />} />
          <Route path='/account/logindetails' element={<LoginDetails />} />
          <Route path='/account/addresses' element={<Addresses />} />
          <Route path='/account/paymentmethods' element={<PaymentMethods />} />
          <Route path='/basket' element={<Basket userId={userId} />} />
          <Route path='/login' element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path='/logout' element={<Logout setLoggedIn={setLoggedIn} setUserId={setUserId} />} />
          <Route path='/register' element={<Register setLoggedIn={setLoggedIn} />} />
          <Route path='/error' element={<ErrorPage />} />
          <Route path='*' element={<div><p>Nothing Here!</p></div>} /> 
        </Routes>
        </div>
      
    </Router>
  );
}

export default App;
