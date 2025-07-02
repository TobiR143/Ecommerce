import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { useForm } from "../hooks/useForm.js";

export const LoginForm = () => {
  const {
    username,
    password,
    usernameError,
    passwordError,
    handleChangeUsername,
    handleChangePassword,
  } = useForm();
  const { handleLogin, message } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!usernameError && !passwordError) handleLogin({ username, password });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="login-form-title">Login</h2>
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
        Login
      </button>
      {message && <div className="error-message">{message}</div>}
    </form>
  );
};
