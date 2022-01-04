import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
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
import { useState } from 'react';
import Logout from './components/Logout/Logout';



function App() {

  const [ user, setUser ] = useState(false);


  return (
    <Router>
      <div className="App">
        <div id='header'>
          <Navbar user={user} setUser={setUser}/>
        </div>
        <Routes>
          <Route path='/products' element={<Products />} />
          <Route path='/products/:id' element={<ProductDetail />} />
          <Route path='/account' element={<Account />} />
          <Route path='/account/orders' element={<Orders />} />
          <Route path='/account/logindetails' element={<LoginDetails />} />
          <Route path='/account/addresses' element={<Addresses />} />
          <Route path='/account/paymentmethods' element={<PaymentMethods />} />
          <Route path='/basket' element={<Basket />} />
          <Route path='/login' element={<Login setUser={setUser} />} />
          <Route path='/register' element={<Register setUser={setUser} />} />
          <Route path='/error' element={<ErrorPage />} />
          <Route path='*' element={<div><p>Nothing Here!</p></div>} /> 
        </Routes>
        </div>
      
    </Router>
  );
}

export default App;
