import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

function Navbar({ handleChange, handleSubmit }) {
  return (
    <nav className={styles.container}>
      <Link className={styles.link} to="/">
        PI-PAISES
      </Link>
      <Link className={styles.link} to="/countries">
        INICIO
      </Link>
      <Link className={styles.link} to="/countries/form">
        CREAR ACTIVIDAD
      </Link>
      <form className={styles.form} onChange={handleChange}>
        <input className={styles.input} placeholder="País" type="search" />
        <button className={styles.button} type="submit" onClick={handleSubmit}>
          BUSCAR
        </button>
      </form>
    </nav>
  );
}

export default Navbar;
