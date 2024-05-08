import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/navbar";
import "./detail.css";

function Detail() {
  const params = useParams();
  const [country, setCountry] = useState({});

  useEffect(() => {
    axios(`http://localhost:3001/countries/${params?.id}`)
      .then(({ data }) => {
        if (data?.id) {
          setCountry(data);
        } else {
          alert("no existe el Pais");
        }
      })
      .catch(() => {
        console.log("Se rompió");
      });

    return () => setCountry({});
  }, [params?.id]);

  return (
    <div>
      <Navbar />
      <div className="detail-conteiner">
        <div className="card-image">
          <img src={country?.flags} alt={country.name} />
        </div>
        <div className="card-detail">
          <h2>
            {country?.name} ({country?.id}) {country?.continents}
          </h2>
          <h5>Capital: {country?.capital}</h5>
          <h5>Subregión: {country?.subregion}</h5>
          <h5>Área: {country?.area}</h5>
          <h5>Población: {country?.population}</h5>
        </div>
      </div>
    </div>
  );
}

export default Detail;
