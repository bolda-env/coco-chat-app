import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    // const tokenString = sessionStorage.getItem("token");
    // const userToken = JSON.parse(tokenString);
    return localStorage.token;
  };

  const [token, setToken] = useState(getToken());
  const [userId, setUserId] = useState("");

  const saveToken = (userToken) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
    setUserId,
    userId,
  };
}
