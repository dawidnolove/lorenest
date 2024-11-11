import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import bcrypt from 'bcryptjs';

function Signup({ onSignup, handleFlip }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=(.*\d.*){2,}).{8,}$/;
        return regex.test(password);
    };

    const validatePhoneNumber = (phoneNumber) => {
        const regex = /^\d{9}$/;
        return regex.test(phoneNumber);
    };

    const handleSignup = async (event) => {
      event.preventDefault();
  
      if (!validateEmail(email)) {
          alert("Niepoprawny email");
          return;
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);

      const userData = {
        email: email,
        password: hashedPassword,
        phone_number: phoneNumber,
      };
      try {
        const response = await fetch('http://localhost/backend/register.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        const data = await response.json();
        if (data.success) {
          onSignup(data);
        } else {
          alert(data.message || 'Błąd rejestracji');
        }
      } catch (error) {
        console.error('Błąd połączenia: ', error);
        alert('Wystąpił błąd rejestracji');
      }
  
      //onSignup({ email, hashedPassword, phoneNumber });
  };
  
  return (
      <div className="signup-container">
          <h2>Rejestracja</h2>
          <form onSubmit={handleSignup}>
              <input 
                  type="text" 
                  id="email" 
                  name="email" 
                  placeholder="E-MAIL" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
              />
              <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  placeholder="HASŁO" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
              />
              <input 
                  type="tel" 
                  id="phone-number" 
                  name="phone-number" 
                  placeholder="TELEFON" 
                  value={phoneNumber} 
                  onChange={(e) => setPhoneNumber(e.target.value)} 
                  required 
              />
              <input type="submit" value="Dalej" />
          </form>
          <div className="footer">
              <p onClick={handleFlip}>Masz już konto? <a href="#" style={{ color: "#aaa" }}>Zaloguj się</a></p>
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

export default Signup;