import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Header from './components/Header/Header';
import Renew from './components/Renew/Renew';
import UserProfile from './components/UserProfile/UserProfile';
import ContractDetails from './components/ContractDetails/ContractDetails';
import CreateContract from './components/CreateContract/CreateContract';
import Cookies from 'js-cookie'; // Usamos js-cookie para manejar las cookies

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Comprobamos si hay una cookie de autenticación
  useEffect(() => {
    const token = Cookies.get('quackCookie');
    if (token) {
      setIsAuthenticated(true); // Si existe el token, el usuario está autenticado
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Si no está autenticado, redirige al login */}
        <Route path="/" element={isAuthenticated ? <Header /> : <Navigate to="/login" />} />

        {/* Ruta de login */}
        <Route path="/login" element={<Login />} />

        {/* Ruta de signup */}
        <Route path="/signup" element={<SignUp />} />

        {/* Rutas protegidas, solo accesibles si está autenticado */}
        <Route path="/renew" element={isAuthenticated ? <Renew /> : <Navigate to="/login" />} />
        <Route path="/user-profile" element={isAuthenticated ? <UserProfile /> : <Navigate to="/login" />} />
        <Route path="/contract-details/:id" element={isAuthenticated ? <ContractDetails /> : <Navigate to="/login" />} />
        <Route path="/create-contract" element={isAuthenticated ? <CreateContract /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
