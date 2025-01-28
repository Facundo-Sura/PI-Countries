import { Link } from "react-router-dom";
import React, { useState } from "react";

function Landing() {
  const [rotation, setRotation] = useState(0);

  const handleMouseMove = (e) => {
    const image = document.getElementById("btn-img");
    if (image) {
      const rect = image.getBoundingClientRect();
      const imageX = rect.left + rect.width / 2; // Centro X de la imagen
      const imageY = rect.top + rect.height / 2; // Centro Y de la imagen

      // Calcula el ángulo entre el puntero y el centro de la imagen
      const angle = Math.atan2(e.clientY - imageY, e.clientX - imageX);
      setRotation((angle * 180) / Math.PI); // Convierte el ángulo a grados
    }
  };

  return (
    <div
      className="w-100 h-100 z-0 bg-black overflow-hidden position-absolute"
      onMouseMove={handleMouseMove}
    >
      <video
        src="bgk.mp4"
        autoPlay
        muted
        loop
        className="w-100 overflow-y-hidden z-0 position-absolute top-0 start-0 bottom-0 end-0"
      ></video>
      <header className="d-flex justify-content-around align-items-md-center pb-0 mb-0 border-bottom bg-white bg-opacity-50 z-1 position-absolute w-100">
        <div className="w-25 d-flex justify-content-around">
          <a
            href="https://github.com/Facundo-Sura
"
            className="z-3 focus-ring"
          >
            <svg
              className="focus-ring m-2 z-3"
              width="30"
              height="30"
              fill="black"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/facundo-martin-emiliano-s-974b74253/">
            <svg
              className="focus-ring m-2"
              width="30"
              height="30"
              fill="black"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
            </svg>
          </a>
          <a href="https://www.facebook.com/facundo.sura">
            <svg
              className="focus-ring m-2"
              width="30"
              height="30"
              fill="black"
              viewBox="0 0 16 16"
            >
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
            </svg>
          </a>
        </div>
      </header>
      <main className="text-center text-white z-1 position-absolute top-50 start-50 translate-middle">
        <h1>Countries</h1>
        <Link
          to="/countries"
          className="text-white text-decoration-none focus-ring position-relative"
        >
          <img
            className="w-50 z-2"
            id="btn-img"
            src="goto.png"
            alt="go"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: "transform 0.5s ease", // Suaviza la rotación
            }}
          />
          <h1 className="z-0 position-absolute top-50 start-50 translate-middle">
            IR
          </h1>
        </Link>
        <h2>
          Prtoyecto Individual <strong>Soy Henry</strong>
        </h2>
      </main>
      <footer className="bg-gradient z-1 position-absolute bottom-0 start-0 end-0">
        <hr className="p-2 m-0" />
        <p className="text-center text-white">
          All rights reserved{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.146 4.992c-1.212 0-1.927.92-1.927 2.502v1.06c0 1.571.703 2.462 1.927 2.462.979 0 1.641-.586 1.729-1.418h1.295v.093c-.1 1.448-1.354 2.467-3.03 2.467-2.091 0-3.269-1.336-3.269-3.603V7.482c0-2.261 1.201-3.638 3.27-3.638 1.681 0 2.935 1.054 3.029 2.572v.088H9.875c-.088-.879-.768-1.512-1.729-1.512" />
          </svg>{" "}
          Powered by{" "}
          <a
            href=""
            className="link-light link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover"
          >
            Facundo Sura
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Landing;
