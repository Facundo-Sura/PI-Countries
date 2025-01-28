import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/Footer";

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
    <div id="detail" className="w-100 h-100">
      <Navbar />
      <div id="custom-bg" className="bg-dark card mb-3 text-white m-5">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              className="img-fluid rounded-start w-100"
              src={country?.flags}
              alt={country.name}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title">
                {country?.name} ({country?.id}) {country?.continents}
              </h2>
              <h5 className="card-text">Capital: {country?.capital}</h5>
              <h5 className="card-text">Subregión: {country?.subregion}</h5>
              <h5 className="card-text">Área: {country?.area}</h5>
              <h5 className="card-text">Población: {country?.population}</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="w-100 position-absolute bottom-0 start-0">
        <Footer />
      </div>
    </div>
  );
}

export default Detail;
