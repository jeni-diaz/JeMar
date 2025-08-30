import { useState } from 'react'
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';

import Header from './components/header/Header';
import HomePage from './components/home/HomePage';
import ShippingQuote from './components/shipping/ShippingQuote';
import Login from './components/login/Login';
import UserRegister from './components/register/UserRegister';
import ErrorNotFound from './components/mistake/ErrorNotFound';
import Footer from './components/footer/Footer';


import './App.css';

const MainLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/shipping' element={<ShippingQuote />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<UserRegister />} />
        </Route>

        <Route path='*' element={<ErrorNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
