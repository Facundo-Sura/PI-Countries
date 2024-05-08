import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar({ handleChange, handleSubmit }) {
  return (
    <div className="nav-conteiner">
      <Link to="/">
        <h1>PI-PAISES</h1>
        </Link>
      <div className="option-conteiner">
        <Link to="/countries">
          <button>INICIO</button>
        </Link>
        <Link to="/countries/form">
          <button>CREAR ACTIVIDAD</button>
        </Link>
        <form onChange={handleChange}>
          <input placeholder="Pais..." type="search" />
          <button type="submit" onClick={handleSubmit}>
            BUSCAR
          </button>
        </form>
      </div>
    </div>
  );
}

export default Navbar;
