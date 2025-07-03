import { Navigate, Route, Routes } from "react-router-dom";
import './App.css'
import Header from './components/Header'
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import Login from "./pages/Login";
import QuienesSomos from "./pages/QuienesSomos";
import ComoFunciona from "./pages/ComoFunciona";
import PostDetail from "./pages/PostDetail";
import EquipoDesarrollo from "./pages/EquipoDesarrollo"
import NuevaPublicacion from "./pages/NuevaPublicacion"; 
import Register from "./pages/Register"

function App() {
  return <>
    <Header />
    <Routes>
      <Route path="/" element={<Navigate to="/Home" />} />
      <Route path="/Home" element={ <Home/> }/>
      <Route path="/Perfil" element={ <Perfil/> }/>
      <Route path="/Login" element={ <Login/>} />
      <Route path="/Register" element={<Register />} />
      <Route path="/QuienesSomos" element={ <QuienesSomos/> }/>
      <Route path="/ComoFunciona" element={ <ComoFunciona/> }/>
      <Route path="/post/:id" element={ <PostDetail />} />
      <Route path="/EquipoDesarrollo" element={ <EquipoDesarrollo />} />
      <Route path="/NuevaPublicacion" element={<NuevaPublicacion />} />
    </Routes>
  </>
}

export default App