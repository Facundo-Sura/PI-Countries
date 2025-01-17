import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

function Navbar({ handleChange, handleSubmit }) {
  return (
    <div className={styles.container}>
      <Link className={styles.link} to="/">
        <h1>PI-PAISES</h1>
      </Link>
      <form onChange={handleChange}>
        <input placeholder="Pais..." type="search" />
        <button type="submit" onClick={handleSubmit}>
          BUSCAR
        </button>
      </form>
      <div className={styles.links}>
        <Link className={styles.link} to="/countries">
          <h4>INICIO</h4>
        </Link>
        <Link className={styles.link} to="/countries/form">
          <h4>CREAR ACTIVIDAD</h4>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
