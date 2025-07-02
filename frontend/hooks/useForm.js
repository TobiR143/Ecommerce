import { useState } from "react";
import { UserValidate } from "../Validations/UserValidate.js";

export const useForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    
    const handleChangeUsername = (e) => {
      setUsername(e.target.value);
      const result = UserValidate.username({ username: e.target.value });
      if (!result.success) {
        setUsernameError(result.error);
      } else {
        setUsernameError(null);
      }
    };
    
    const handleChangePassword = (e) => {
      setPassword(e.target.value);
      const result = UserValidate.password({ password: e.target.value });
      if (!result.success) {
        setPasswordError(result.error);
      } else {
        setPasswordError(null);
      }
    };

    return {
        username,
        password,
        handleChangeUsername,
        handleChangePassword,
        usernameError,
        passwordError
    }
}