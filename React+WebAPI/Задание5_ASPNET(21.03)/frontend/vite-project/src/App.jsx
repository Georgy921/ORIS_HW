import { useState } from 'react'
import ToursPage from "./pages/ToursPage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ToursDetailsPage from "./pages/ToursDetailsPage";
import Footer from "./components/Footer/Footer";
import { useAuth } from './contexts/AuthContext';
import AuthModal from './components/AuthModal/AuthModal';
import { AuthProvider } from './contexts/AuthContext';

function App() {  

  return (
    
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<ToursPage/>}/>
          <Route path="/tours" element={<ToursPage />} />
          <Route path="/tours/:id" element={<ToursDetailsPage/>}/>
        </Routes>
        <AuthModal/>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App
  