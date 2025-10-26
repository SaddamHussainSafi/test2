import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ShelterDashboard from './pages/Dashboard/ShelterDashboard';
import { AuthProvider, AuthContext } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Pets from './pages/Pets';
import PetDetails from './pages/PetDetails';
import Applications from './pages/Applications';
import Messages from './pages/Messages';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import AddPet from './pages/AddPet';
import ManagePets from './pages/ManagePets';
import MyPets from './pages/MyPets';
import EditPet from './pages/EditPet';

export default function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <Navbar />

        <main className="main-content">
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><ShelterDashboard /></ProtectedRoute>} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/pet/:id" element={<PetDetails />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-pet" element={<ProtectedRoute><AddPet /></ProtectedRoute>} />
          <Route path="/manage-pets" element={<ManagePets />} />
          <Route path="/my-pets" element={<MyPets />} />
          <Route path="/edit-pet/:id" element={<EditPet />} />
        </Routes>
      </main>

      <Footer />
    </div>
    </AuthProvider>
  );
}
