import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';

import ContactForm from './Components/contact/ContactForm';
import ErrorNotFound from './Components/error/ErrorNotFound';
import Footer from './Components/footer/Footer';
import Header from './Components/header/Header';
import HomePage from './Components/home/HomePage';
import Login from './Components/login/Login.jsx';
import UserRegister from './Components/register/UserRegister';
import Shipments from './Components/shipment/shipments.jsx';
import Modify from './Components/modify/Modify.jsx';

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
            <Route path='/register' element={<UserRegister />} />
            <Route path='/contact' element={<ContactForm />} />
            <Route path='/shipment' element={<Shipments/>} />
            <Route path='/modify' element={<Modify/>}/>
          </Route>

          <Route path='*' element={<ErrorNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;