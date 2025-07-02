import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { useForm } from "../hooks/useForm.js";

export const RegisterForm = () => {
  const {
    username,
    password,
    usernameError,
    passwordError,
    handleChangeUsername,
    handleChangePassword,
  } = useForm();
  const { handleRegister, message } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!usernameError && !passwordError)
      handleRegister({ username, password });
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2 className="register-form-title">Register</h2>
      <div className="input-container">
        <label className="username-label" htmlFor="username">
          Username
        </label>
        <input
          style={usernameError && { borderColor: "#d83434" }}
          type="text"
          id="username"
          value={username}
          onChange={handleChangeUsername}
          required
        />
        {usernameError && (
          <p className="error username-error">{usernameError}</p>
        )}
      </div>
      <div className="input-container">
        <label className="password-label" htmlFor="password">
          Password
        </label>
        <input
          style={passwordError && { borderColor: "#d83434" }}
          type="password"
          id="password"
          value={password}
          onChange={handleChangePassword}
          required
        />
        {passwordError && (
          <p className="error password-error">{passwordError}</p>
        )}
      </div>
      <button className="submit-form" type="submit">
        Register
      </button>
      {message && <div className="error-message">{message}</div>}
    </form>
  );
};
