import styles from "./detail.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/Footer";

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
    <div className={styles.container}>
      <Navbar />
      <div className={styles.card}>
        <img className={styles.image} src={country?.flags} alt={country.name} />
        <div className={styles.content}>
          <h2 className={styles.title}>
            {country?.name} ({country?.id}) {country?.continents}
          </h2>
          <h5 className={styles.info}>Capital: {country?.capital}</h5>
          <h5 className={styles.info}>Subregión: {country?.subregion}</h5>
          <h5 className={styles.info}>Área: {country?.area}</h5>
          <h5 className={styles.info}>Población: {country?.population}</h5>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Detail;
