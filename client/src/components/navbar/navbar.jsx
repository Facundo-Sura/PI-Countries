import { Link } from "react-router-dom";

function Navbar({ handleChange, handleSubmit }) {
  return (
    <div className="navbar navbar-expand-lg bg-body-tertiary z-3">
      <div className="container-fluid">
        <Link className="text-decoration-none" to="/">
          <h1 className="navbar-brand">PI-PAISES</h1>
        </Link>
        <Link className="text-decoration-none" to="/countries">
          <h4 className="nav-link">INICIO</h4>
        </Link>
        <Link className="text-decoration-none" to="/countries/form">
          <h4 className="nav-link">CREAR ACTIVIDAD</h4>
        </Link>
        <form className="d-flex" onChange={handleChange}>
          <input className="form-control me-2" placeholder="País" type="search" />
          <button className="btn btn-outline-secondary" type="submit" onClick={handleSubmit}>
            BUSCAR
          </button>
        </form>
      </div>
    </div>
  );
}

export default Navbar;
