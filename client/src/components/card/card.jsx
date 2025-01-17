import { Link } from "react-router-dom";
import styles from "./card.module.css";

const Card = ({ flags, name, continents, id }) => {
  return (
      <Link className={styles.container} to={`${id}`}>
        <div className={styles.content}>
          <div className={styles.header}>
          <img className={styles.image} src={flags} alt={name} />
          </div>
          <div className={styles.main}>
            <h3>{name}</h3>
            <p>{continents}</p>
          </div>
        </div>
      </Link>
  );
};

export default Card;
