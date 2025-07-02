import { createContext, useState, useEffect } from "react";
import { API_URL } from "../constants/constants.js";
import { fetchUser } from "../logic/fetchUser.js";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser()
      .then((res) => setUserData(res))
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = async ({ username, password }) => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`${API_URL}/api/user/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setUserData({
          username: data.user.user,
          id: data.user.id,
        });
      } else {
        setMessage("Username or password is incorrect");
      }
    } catch (error) {
      setMessage("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, password }) => {
    setLoading(true);
    setMessage("");
    try {
      setMessage(null);
      const response = await fetch(`${API_URL}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        setUserData({ username: data.user.user });
      } else {
        setMessage("User already exists");
      }
    } catch (error) {
      setMessage("Registration failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`${API_URL}/api/user/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setUserData(null);
      }
    } catch (error) {
      console.error("Logout failed:", error);
      setMessage("Logout failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        loading,
        handleLogin,
        handleLogout,
        handleRegister,
        userData,
        message,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
