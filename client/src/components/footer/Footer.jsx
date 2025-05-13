import { useState } from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ success: null, message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita el refresh
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ success: true, message: "Mensaje enviado con éxito!" });
        setFormData({ fullname: "", email: "", message: "" }); // Limpia el formulario
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al enviar");
      }
    } catch (error) {
      setStatus({ success: false, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className={styles.container}>
      <section className={styles.section}>
        <h3 className={styles.title}>Links</h3>
        <a
          className={styles.link}
          href="https://www.facebook.com/facundo.sura"
          target="_blank">
          Facebook
        </a>
        <a
          className={styles.link}
          href="https://www.linkedin.com/in/facundo-martin-emiliano-s-974b74253/"
          target="_blank">
          LinkedIn
        </a>
        <a
          className={styles.link}
          href="https://github.com/Facundo-Sura"
          target="_blank">
          Github
        </a>
      </section>
      <section className={styles.section}>
        <h3 className={styles.title}>Proyectos</h3>
        <a className={styles.link} href="" target="_blank">
          Proyecto Grupal Moda Urbana
        </a>
        <a
          className={styles.link}
          href="https://pi-countries-tau-steel.vercel.app/"
          target="_blank">
          Proyeto Individual Paises
        </a>
        <a
          className={styles.link}
          href="https://pi-rick-morty.vercel.app/"
          target="_blank">
          Proyecto Integrador Rick & Morty
        </a>
      </section>
      <section className={styles.section}>
        <h2 className={styles.name}>EleDevSur</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="fullname"
            placeholder="Nombre y Apellido"
            value={formData.fullname}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <textarea
            name="message"
            placeholder="Escribe tu mensaje..."
            value={formData.message}
            onChange={handleChange}
            required
            className={styles.textarea}
          />
          <button 
            type="submit" 
            className={styles.button}
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
          {status.message && (
            <p style={{ color: status.success ? "green" : "red" }}>
              {status.message}
            </p>
          )}
        </form>
      </section>
    </footer>
  );
};

export default Footer;
