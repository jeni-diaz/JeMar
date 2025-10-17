import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

import ContactForm from "./Components/contact/ContactForm";
import ErrorNotFound from "./Components/error/ErrorNotFound";
import Footer from "./Components/footer/Footer";
import Header from "./Components/header/Header";
import HomePage from "./Components/home/HomePage";
import Login from "./Components/login/Login.jsx";
import UserRegister from "./Components/register/UserRegister";
import Shipments from "./Components/shipment/Shipments.jsx";
import Modify from "./Components/modify/Modify.jsx";

import Protected from "./Components/protected/Protected";
import RoleProtected from "./Components/protected/RoleProtected";

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
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Páginas públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<UserRegister />} />

          {/* Rutas protegidas: solo usuarios logueados */}
          <Route element={<Protected />}>
            {/* Cotización visible a todos los roles logueados */}
            <Route path="/shipment" element={<Shipments />} />

            {/* Rutas solo para empleado y superAdmin */}
            <Route
              element={
                <RoleProtected allowedRoles={["empleado", "superAdmin"]} />
              }
            >
              <Route path="/modify" element={<Modify />} />
              <Route path="/contact" element={<ContactForm />} />
            </Route>

            {/* Rutas solo para superAdmin
            <Route
              element={<RoleProtected allowedRoles={["superAdmin"]} />}
            >
              <Route path="/panel" element={<AdminPanel />} />
            </Route> */}
          </Route>

          {/* Página de error */}
          <Route path="*" element={<ErrorNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
