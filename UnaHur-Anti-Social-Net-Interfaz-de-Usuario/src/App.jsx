import { Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import Header from './Componentes/Header';
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import QuienesSomos from "./pages/QuienesSomos";
import ComoFunciona from "./pages/ComoFunciona";
import PostDetail from "./pages/PostDetail";
import NuevaPublicacion from "./pages/nuevaPublicacion"; 

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/Home" />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Perfil" element={<Perfil />} />
        <Route path="/QuienesSomos" element={<QuienesSomos />} />
        <Route path="/ComoFunciona" element={<ComoFunciona />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/NuevaPublicacion" element={<NuevaPublicacion />} /> 
      </Routes>
    </>
  );
}

export default App;