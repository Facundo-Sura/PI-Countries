import { useState } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

function Navbar({ handleChange, handleSubmit }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.container}>
        <form className={styles.form} onChange={handleChange}>
          <input className={styles.input} placeholder="País" type="search" />
          <button
            className={styles.button}
            type="submit"
            onClick={handleSubmit}>
            BUSCAR
          </button>
        </form>
        <div className={styles.hamburger} onClick={toggleMenu}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
      <div className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
        <Link className={styles.link} to="/">
          BIENVENIDO
        </Link>
        <Link className={styles.link} to="/countries">
          INICIO
        </Link>
        <Link className={styles.link} to="/countries/form">
          CREAR ACTIVIDAD
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
