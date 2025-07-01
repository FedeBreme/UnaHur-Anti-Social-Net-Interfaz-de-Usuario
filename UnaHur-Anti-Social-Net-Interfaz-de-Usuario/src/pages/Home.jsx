import { useEffect, useState } from "react";
<<<<<<< HEAD
import PostCard from "../Componentes/PostCard";
import VisualAlert from "../Componentes/VisualAlert";
import imagen1 from "../Imagenes/tralaleroTralala.jpg";
import imagen2 from "../Imagenes/NocheLifeder16.jpg";
import '../Styles/Home.css';
=======
import PostCard from "../components/PostCard";
import VisualAlert from "../components/VisualAlert";
import imagen1 from "../images/tralaleroTralala.jpg";
import imagen2 from "../images/NocheLifeder16.jpg";
import '../styles/Home.css';
import { API_URL } from "../config";
>>>>>>> origin/dev/Franco

const imagenesDeMuestra = [imagen1, imagen2];

function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    async function traerPosts() {
      try {
<<<<<<< HEAD
        const respuesta = await fetch("http://localhost:3001/posts");
=======
       const respuesta = await fetch(`${API_URL}/posts`);
>>>>>>> origin/dev/Franco
        if (!respuesta.ok) {
          throw new Error("Error al cargar posts");
        }
        const data = await respuesta.json();
        setPosts(data);
      } catch (error) {
        setError("No se pudieron cargar los posts. " + error.message);
      }
    }

    traerPosts();
  }, []);

  const postsFiltrados = posts.filter((post) => {
    if (filtro.trim() === "") return true;
    if (!post.Tags) return false;
    return post.Tags.some((tag) =>
      tag.name.toLowerCase().includes(filtro.toLowerCase())
    );
  });

  let imagenIndex = 0;

  return (
    <>
      <h1>Home</h1>
      <hr />
      <div className="filtro-container">
        <input
          className="filtro-input"
          type="text"
          placeholder="Buscar por etiqueta"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        {error && <VisualAlert mensaje={error} />}

        {postsFiltrados.map((post) => {
          const imagenActual = imagenesDeMuestra[imagenIndex];
          imagenIndex = (imagenIndex + 1) % imagenesDeMuestra.length;

          return (
            <PostCard
              key={post.id}
              postId={post.id}
              title={post.title}
              image={imagenActual}
              description={post.description}
              tags={post.Tags?.map((tag) => tag.name) || []}
              commentCount={post.Comments?.length || 0}
              userName={post.User?.nickName}
            />
          );
        })}
      </div>
    </>
  );
}

<<<<<<< HEAD
export default Home;




=======
export default Home;
>>>>>>> origin/dev/Franco
