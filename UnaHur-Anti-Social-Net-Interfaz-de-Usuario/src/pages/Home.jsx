import { useEffect, useState } from "react";
import PostCard from "../Componentes/PostCard";
import imagen1 from "../Imagenes/tralaleroTralala.jpg";
import imagen2 from "../Imagenes/NocheLifeder16.jpg";

const imagenesDeMuestra = [imagen1, imagen2];

function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("http://localhost:3001/posts");
        if (!res.ok) throw new Error("Error al cargar posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchPosts();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (posts.length === 0) return <div>Cargando posts...</div>;

  let imagenIndex = 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      {posts.map((post) => {
        const imagenActual = imagenesDeMuestra[imagenIndex];
        imagenIndex++;

        if (imagenIndex >= imagenesDeMuestra.length) {
          imagenIndex = 0;
        }

        return (
          <PostCard
            key={post.id}
            postId={post.id}
            title={post.title}
            image={imagenActual}
            description={post.description}
            tags={post.Tags?.map(tag => tag.name) || []}
            commentCount={post.Comments?.length || 0}
            userName={post.User?.nickName}
          />
        );
      })}
    </div>
  );
}

export default Home;
