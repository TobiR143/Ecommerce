import { useContext, useEffect, useState } from "react";
import { LoginForm } from "../components/LoginForm.jsx";
import { RegisterForm } from "../components/RegisterForm.jsx";
import "../styles/AuthPage.css";
import { UserContext } from "../contexts/userContext.jsx";
import { useNavigate } from "react-router-dom";

export const AuthPage = () => {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const [loginSelected, setLoginSelected] = useState(true);

  useEffect(() => {
    if (userData) {
      if (userData.username) navigate("/");
    }
  }, [userData, navigate]);

  const handleClick = () => {
    setLoginSelected(!loginSelected);
  };

  return (
    <>
      <div className="auth-forms">
        {loginSelected ? (
          <div className="login-form-container">
            <LoginForm />
            <p onClick={handleClick} className="is-registered-question">
              Aren't you registered?
            </p>
          </div>
        ) : (
          <div className="register-form-container">
            <RegisterForm />
          </div>
        )}
      </div>
    </>
  );
};
