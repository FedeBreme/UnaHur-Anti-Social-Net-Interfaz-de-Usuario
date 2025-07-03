import React, { useState } from 'react';
//CSS
import '../styles/EquipoDesarrollo.css';
//IMAGENES
import Federico from '../images/Federico.png';
import Tomas from '../images/Tomas.jpeg';
import Franco from '../images/Franco.jpeg';
import Footer from "../components/Footer";


function EquipoDesarrollo() {
  const [fedeActivo, setFedeActivo] = useState(false);
  const [francoActivo, setFrancoActivo] = useState(false);
  const [tomasActivo, setTomasActivo] = useState(false);

  return (
    <>
      <h1 className='space'>Nuestro equipo de desarrollo</h1>
      <hr />
      <p>
        Detrás de <i>UnaHur - Red Anti-Social</i> hay un grupo de estudiantes comprometidos que combinaron creatividad,
        conocimiento técnico y muchas horas de trabajo para darle vida a esta plataforma.
      </p>

      <div className="equipo-container">
        <div className="card" style={{ width: "20rem" }}>
          <img src={Federico} className="card-img-top" alt="Federico" />
          <div className="card-body">
            <h5 className="card-title">Federico José Breme</h5>
            <p className="card-text">Desarrollador FullStack</p>
            <button onClick={() => setFedeActivo(!fedeActivo)} className="ver-mas">
              {fedeActivo ? 'Ocultar descripción' : 'Ver más'}
            </button>
            <p className={`descripcion ${fedeActivo ? 'mostrar' : ''}`}>
              Federico participó de forma integral en el desarrollo del proyecto, tanto en el diseño y funcionalidad del frontend como en la lógica del backend. Coordinó la arquitectura general, propuso soluciones técnicas eficientes y colaboró activamente en la integración entre cliente y servidor.
            </p>
          </div>
        </div>

        <div className="card" style={{ width: "20rem" }}>
          <img src={Franco} className="card-img-top" alt="Franco" />
          <div className="card-body">
            <h5 className="card-title">Franco Pfahel</h5>
            <p className="card-text">Desarrollador BackEnd</p>
            <button onClick={() => setFrancoActivo(!francoActivo)} className="ver-mas">
              {francoActivo ? 'Ocultar descripción' : 'Ver más'}
            </button>
            <p className={`descripcion ${francoActivo ? 'mostrar' : ''}`}>
              Franco se encargó de la construcción y mantenimiento de la lógica del servidor. Diseñó la estructura de la base de datos, implementó rutas, validaciones y se ocupó de que la API REST funcione de forma segura y estable.
            </p>
          </div>
        </div>

        <div className="card" style={{ width: "20rem" }}>
          <img src={Tomas} className="card-img-top" alt="Tomás" />
          <div className="card-body">
            <h5 className="card-title">Tomás Troncoso</h5>
            <p className="card-text">Desarrollador FrontEnd</p>
            <button onClick={() => setTomasActivo(!tomasActivo)} className="ver-mas">
              {tomasActivo ? 'Ocultar descripción' : 'Ver más'}
            </button>
            <p className={`descripcion ${tomasActivo ? 'mostrar' : ''}`}>
              Tomás se enfocó en crear una interfaz amigable, intuitiva y accesible. Implementó los componentes visuales y una estética coherente con la idea de la red anti-social.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EquipoDesarrollo;