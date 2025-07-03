import React from 'react'
//COMPONENTS
import InstructiveCard from '../components/InstructiveCard';
import Footer from "../components/Footer";
//CSS
import '../styles/ComoFunciona.css';

function ComoFunciona() {
  return (
    <>
      <h1 className='space'>¿Cómo funciona UnaHur - Red Anti-Social?</h1>
      <hr />
      <InstructiveCard className="instructive-container"
        title="Creá tu identidad (o no)"
        description="Al registrarte, podés elegir un nickName. No hace falta usar tu nombre real. ¡Acá los alter egos son bienvenidos!"
      />
      <InstructiveCard
        title="Publicá lo que quieras"
        description="Andá a la sección Inicio o Crear Post. Escribí lo que se te ocurra. Podés agregar imágenes."
      />
      <InstructiveCard
        title="Etiquetá tus publicaciones"
        description="Agregá etiquetas que reflejen el contenido o el tono de tu post. Así ayudás a otros a encontrarlo."
      />
      <InstructiveCard
        title="Agregá imágenes"
        description="Podés subir las imágenes que quieras. No hace falta que estén editadas ni tengan buena calidad. Mientras no infrinja nuestras normas, todo vale."
      />
      <InstructiveCard
        title="Comentá sin compromiso"
        description="Cada post puede recibir comentarios. No tienen likes. Podés responder con humor, reflexión, sarcasmo o existencialismo puro."
      />
      <InstructiveCard
        title="Explorá el feed"
        description="En el feed de inicio vas a encontrar las publicaciones más recientes. No hay algoritmo, no hay “te puede interesar”. Ves lo que publican tus pares. Punto."
      />
      <hr />
      <h2 className='space'>¿Y si no quiero hacer nada de todo esto?</h2>
      <p>Perfecto. Podés entrar solo a mirar. Usarlo como diario personal. O simplemente entrar, publicar <b>“ya fue todo”</b> y salir.</p>
      <h2 className='space'>¿Qué NO hacemos?</h2>
      <p>
        En UnaHur - Red Anti-Social nos tomamos en serio tu privacidad y tu bienestar digital. 
        A diferencia de muchas redes sociales tradicionales, no utilizamos cookies con fines comerciales, 
        ni recopilamos tu información para mostrarte publicidad dirigida o venderte productos que no pediste. 
        Tampoco almacenamos tus datos personales con fines ocultos, ni los compartimos con empresas, marcas o terceros. 
        Tu actividad en nuestra plataforma es solo tuya. Además, no diseñamos nuestros contenidos para que te quedes pegado a la pantalla. 
        No queremos manipular tu tiempo ni tu atención. Nuestra idea no es que estés más tiempo, sino que el tiempo que estés, lo disfrutes siendo vos mismo.
      </p>
      <h5 className='space'><i>Acá no buscamos viralidad. Buscamos humanidad digital.</i></h5>
      <Footer />
    </>
  );
}

export default ComoFunciona;