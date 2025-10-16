import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';

import ContactForm from './Components/contact/ContactForm';
import ErrorNotFound from './Components/error/ErrorNotFound';
import Footer from './Components/footer/Footer';
import Header from './Components/header/Header';
import HomePage from './Components/home/HomePage';
import Login from './Components/login/Login';
import ShippingQuote from './Components/quote/ShippingQuote.jsx';
import ShippingTrack from './Components/track/ShippingTrack';
import UserRegister from './Components/register/UserRegister';

import "./Components/style/Styles.css";

const MainLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/quote' element={<ShippingQuote />} />
            <Route path='/register' element={<UserRegister />} />
            <Route path='/track' element={<ShippingTrack />} />
            <Route path='/contact' element={<ContactForm />} />
          </Route>

          <Route path='*' element={<ErrorNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;