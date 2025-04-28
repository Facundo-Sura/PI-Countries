import { Link } from "react-router-dom";
import styles from "./card.module.css";

const Card = ({ flags, name, continents, id }) => {
  return (
    <Link className={styles.container} to={`${id}`}>
      <img className={styles.image} src={flags} alt={name} />
      <h3 className={styles.title}>{name}</h3>
      <p className={styles.info}>{continents}</p>
    </Link>
  );
};

export default Card;
