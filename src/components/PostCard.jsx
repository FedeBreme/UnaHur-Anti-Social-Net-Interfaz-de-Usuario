import { Link } from "react-router-dom";
//CSS
import '../styles/PostCard.css';

const PostCard = ({ title, image, description, tags, commentCount, postId, userName }) => {
  return (
    <div className="card mb-3 card-container" style={{ width: "35rem" }}>
      <div className="card-header">
        <h3 className="mb-0">{userName || "Usuario desconocido"}</h3>
      </div>
      <h5 className="card-title p-2">{title}</h5>
      <img src={image} className="card-img-top" alt="Imagen del post" />
      <div className="card-body">
        <p className="card-text">{description}</p>
        <p className="card-tag">Tags: {tags.join(", ")}</p>
        <p className="card-comments">Comentarios: {commentCount}</p>
        <Link to={`/post/${postId}`} className="btn btn-primary">Ver más</Link>
      </div>
    </div>
  );
};

export default PostCard;