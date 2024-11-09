import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false); // Estado para controlar el popup
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://64.23.180.219:8080/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login exitoso:", data);
        setShowPopup(true); // Muestra el popup
        setTimeout(() => {
          setShowPopup(false); // Oculta el popup después de 3 segundos
          navigate("/"); // Redirige a la página de inicio
        }, 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error al iniciar sesión");
      }
    } catch (err) {
      setError("No se pudo conectar al servidor.");
      console.error("Error en la solicitud:", err);
    }
  };

  const goToSignUp = () => {
    navigate("/signup"); // Redirige a la página de registro
  };

  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form" onSubmit={handleLogin}>
          <p className="title">LOG IN</p>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">login</button>
          {error && <p className="error-message">{error}</p>}
          <p className="message">
            ¿No tienes cuenta? <span onClick={goToSignUp} style={{ cursor: 'pointer', color: '#4CAF50' }}>Registrate</span>
          </p>
        </form>
        {showPopup && (
          <div className="popup-message">
            ¡Inicio de sesión exitoso!
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
