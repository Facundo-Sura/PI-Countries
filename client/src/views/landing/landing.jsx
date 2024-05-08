import { Link } from "react-router-dom";
import "./landing.css";

function Landing() {
  return (
    <div className="land-cont">
      <div className="land-assets">
        <div className="titulo">
          <h1>PI-PAÍSES</h1>
        </div>
        <div className="boton">
          <Link to="/countries">
            <button>INICIO</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
