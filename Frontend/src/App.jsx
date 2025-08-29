import { useState } from 'react'

import Header from './Components/Header/header';
import Footer from './Components/Footer/footer';
import HomePage from './Components/HomePage/home-page';
import Login from './Components/Login/login';

import './App.css';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>

      <Header />
      <Login />
      <Footer />

    </>
  );
};

export default App
