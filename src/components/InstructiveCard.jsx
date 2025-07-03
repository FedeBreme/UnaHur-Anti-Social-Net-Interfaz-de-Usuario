//CSS
import '../styles/InstructiveCard.css'

const InstructiveCard = ({ title, description }) => {
  return (
    <div className="card card-container instructive-card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
};

export default InstructiveCard;