import { useState } from 'react'
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';

import BackArrow from './components/back/BackArrow'
//ShippingChange
import ErrorNotFound from './components/error/ErrorNotFound';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import HomePage from './components/home/HomePage';
import Login from './components/login/Login';
import ShippingQuote from './components/quote/ShippingQuote';
import UserRegister from './components/register/UserRegister';
import ShippingTrack from './components/track/ShippingTrack';

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
      <BackArrow />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/quote' element={<ShippingQuote />} />
          <Route path='/register' element={<UserRegister />} />
          <Route path='/track' element={<ShippingTrack />} />
        </Route>

        <Route path='*' element={<ErrorNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
