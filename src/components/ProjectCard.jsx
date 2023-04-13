import React from "react";
import "./ProjectCard.css";

const ProjectCard = ({ title, imageSrc, description }) => {
  const [isFlipped, setIsFlipped] = React.useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`card-container ${isFlipped ? "is-flipped" : ""}`}
      onClick={flipCard}
    >
      <div className="card card-front">
        <img className="card-image" src={imageSrc} alt={title} />
        <div className="card-title">{title}</div>
      </div>
      <div className="card card-back">
        <div className="card-description">{description}</div>
      </div>
    </div>
  );
};

export default ProjectCard;
