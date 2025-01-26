import { Link } from "react-router-dom";
import styles from "./card.module.css";

const Card = ({ flags, name, continents, id }) => {
  return (
      <Link className={styles.container} to={`${id}`}>
        <div className="col">
          <div className="card">
          <img className="card-img-top" src={flags} alt={name} />
          </div>
          <div className="card-body">
            <h3 className="card-title text-light">{name}</h3>
            <p className="card-text text-light">{continents}</p>
          </div>
        </div>
      </Link>
  );
};

export default Card;
