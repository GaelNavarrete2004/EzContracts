import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://ezcontract-e556acf4694e.herokuapp.com/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullname, email, password }), // Enviamos fullname, email y password
      });

      if (response.ok) {
        console.log("Registro exitoso");
        navigate("/login"); // Redirige al login después del registro
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error en el registro");
      }
    } catch (err) {
      setError("No se pudo conectar al servidor.");
      console.error("Error en la solicitud:", err);
    }
  };

  const goToLogin = () => {
    navigate("/login"); // Redirige a la página de inicio de sesión
  };

  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form" onSubmit={handleSignUp}>
          <p className="title">SIGN UP</p>
          <input
            type="text"
            placeholder="Usuario"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Get Started</button>
          {error && <p className="error-message">{error}</p>}
          <p className="message">
            ¿Ya tienes una cuenta? <span onClick={goToLogin} style={{ cursor: 'pointer', color: '#4CAF50' }}>Inicia sesión</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
