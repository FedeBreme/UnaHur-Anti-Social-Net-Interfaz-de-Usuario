import React from 'react'
import { NavLink } from "react-router-dom";
//IMAGES
import LogoUnaHurAntiSocialNet from "../images/LogoUnaHurAnti-SocialNet.png"
//COMPONENTS
import Footer from "../components/Footer";

function QuienesSomos() {
  return (
    <>  
      <h1 className='space'>¿Quienes Somos?</h1>
      <hr></hr>
      <p>
        naHur - Red Anti-Social es una red social ficticia creada por estudiantes rebeldes, 
        inconformistas y un poco irónicos de la Universidad Nacional de Hurlingham (UnaHur).
        Nacida como una sátira a las redes sociales tradicionales, UnaHur no busca likes, seguidores ni métricas vacías. 
        Acá no venís a vender tu mejor versión. Acá venís a ser vos.
      </p>
      <img className='space logoUnaHur' src={LogoUnaHurAntiSocialNet}></img>
      <h2 className='space'>¿Qué es la Red Anti-Social?</h2>
      <p>
        UnaHur - Red Anti-Social es una plataforma digital para expresarse sin filtros, 
        para compartir ideas raras, memes, reflexiones filosóficas a las 3 AM, o simplemente gritar al vacío digital.
        Nuestros objetivos son crear una red <i>sin algoritmos manipuladores</i> ni contenido sponsoreado, 
        promover la <i>libertad de expresión auténtica</i>, sin miedo a no encajar, y fomentar la creatividad, la ironía y el pensamiento crítico en comunidad.
      </p>
      <NavLink to="/EquipoDesarrollo" className="equipoDesarrollo">
        Conocé nuestro equipo de desarrollo
      </NavLink>
      <Footer />
    </>
  )
}

export default QuienesSomos