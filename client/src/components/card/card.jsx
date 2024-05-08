import { Link } from "react-router-dom";
import "./card.css";

const Card = ({ flags, name, continents, id }) => {
  return (
      <Link to={`${id}`}>
        <div className="card-link">
          <div className="card-header">
          <img src={flags} alt={name} />
          </div>
          <div className="card-main">
            <h3>{name}</h3>
            <p>{continents}</p>
          </div>
        </div>
      </Link>
  );
};

export default Card;
