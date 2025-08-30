import { useState } from 'react'

import Header from './Components/Header/header';
import Footer from './Components/Footer/footer';
import HomePage from './Components/HomePage/home-page';
import ShippingQuote from './Components/ShippingQuote/shipping-quote ';
import Login from './Components/Login/login';
import UserRegister from './Components/UserRegister/user-register';

import './App.css';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>

      <Header />
      <ShippingQuote />
      <Footer />

    </>
  );
};

export default App
