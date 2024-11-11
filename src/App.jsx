import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Header from './components/Header/Header';
import Renew from './components/Renew/Renew';
import UserProfile from './components/UserProfile/UserProfile';
import ContractDetails from './components/ContractDetails/ContractDetails';
import CreateContract from './components/CreateContract/CreateContract';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/renew/:id" element={<Renew />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/contract-details/:id" element={<ContractDetails />} />
        <Route path="/create-contract" element={<CreateContract />} />
      </Routes>
    </Router>
  );
};

export default App;
