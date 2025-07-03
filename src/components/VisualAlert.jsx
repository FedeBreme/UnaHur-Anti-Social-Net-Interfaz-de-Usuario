//CSS
import '../styles/VisualAlert.css';

function VisualAlert({ mensaje }) {
  return (
    <div className="alert">
      {mensaje}
    </div>
  );
}

export default VisualAlert;