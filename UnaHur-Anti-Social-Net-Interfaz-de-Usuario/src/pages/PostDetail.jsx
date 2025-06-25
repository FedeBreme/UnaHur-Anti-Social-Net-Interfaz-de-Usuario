import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`http://localhost:3001/posts/${id}`);
        if (!res.ok) throw new Error("Error al cargar el post");
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchPost();
  }, [id]);

  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Cargando post...</div>;

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      <h2>{post.title}</h2>
      <p>{post.description}</p>

      {post.images?.length > 0 && (
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "1rem" }}>
          {post.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Imagen ${i + 1}`}
              style={{ width: 150, height: 150, objectFit: "cover", borderRadius: "8px" }}
            />
          ))}
        </div>
      )}

      {post.Tags?.length > 0 && (
        <div style={{ marginBottom: "1rem" }}>
          {post.Tags.map((tag, i) => (
            <span
              key={i}
              style={{
                marginRight: 10,
                backgroundColor: "#e0e0e0",
                padding: "4px 10px",
                borderRadius: "20px",
                fontSize: "0.9rem",
              }}
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      <div>
        <h3>Comentarios ({post.Comments?.length || 0})</h3>
        {post.Comments?.length > 0 ? (
          <ul style={{ paddingLeft: "1rem" }}>
            {post.Comments.map((comment) => (
              <li key={comment.id} style={{ marginBottom: "0.5rem" }}>
                <b>{comment.nickName || "Anónimo"}:</b> {comment.text || comment.body || comment.content}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay comentarios aún.</p>
        )}
      </div>
    </div>
  );
}

export default PostDetail;
