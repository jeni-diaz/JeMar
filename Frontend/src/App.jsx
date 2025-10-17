import { BrowserRouter, Route, Routes } from "react-router-dom";

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
          {/* Rutas públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<UserRegister />} />

          {/* 🔒 Solo usuarios logueados */}
          <Route element={<Protected />}>
            <Route path="/shipment" element={<Shipments />} />

            {/* 🔒 Solo empleados o superAdmin */}
            <Route
              element={<RoleProtected allowedRoles={["empleado", "superAdmin"]} />}
            >
              <Route path="/modify" element={<Modify />} />
            </Route>
          </Route>

          {/* Ruta de contacto (pública o protegida según prefieras) */}
          <Route path="/contact" element={<ContactForm />} />

          {/* Página 404 */}
          <Route path="*" element={<ErrorNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
