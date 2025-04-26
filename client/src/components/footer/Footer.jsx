import styles from "./Footer.module.css";

const Footer = () => {
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
        <a className={styles.link} href="https://github.com/Facundo-Sura" target="_blank">
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
        <form className={styles.form} method="POST" action="http://localhost:3001/contact">
          <input
            type="text"
            name="fullname"
            placeholder="Nombre y Apellido"
            required
            className={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className={styles.input}
          />
          <textarea
            name="message"
            placeholder="Escribe tu mensaje..."
            required
            className={styles.textarea}
          />
          <button type="submit" className={styles.button}>
            Enviar
          </button>
        </form>
      </section>
    </footer>
  );
};

export default Footer;
