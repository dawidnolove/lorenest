import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import bcrypt from 'bcryptjs';

function Login({ onLogin, handleFlip }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };
    
    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=(.*\d.*){2,}).{8,}$/;
        return regex.test(password);
    };
    
    const handleLogin = async (event) => {
        event.preventDefault();
        
        if (!validateEmail(email)) {
            alert("Niepoprawny email");
            return;
        }
        if (!validatePassword(password)) {
            alert("Hasło musi mieć minimum 8 znaków, w tym dużą literę i dwie cyfry")
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        onLogin({ email, password: hashedPassword});
    };

    return (
        <div className="login-container">
        <h2>Logowanie</h2>
        <form onSubmit={handleLogin}>
          <input type="text" id="mail" name="mail" placeholder="E-MAIL" required />
          <input type="password" id="password" name="password" placeholder="HASŁO" required />
          <input type="submit" value="Zaloguj się" />
        </form>
        <div className="footer">
          <p onClick={handleFlip}>Nie masz konta? <a href="#" style={{ color: "#aaa" }}>Zarejestruj się</a></p>
        </div>
        <span className="google-login">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login failed");
            }}
          />
        </span>
      </div>
    );
}

export default Login;