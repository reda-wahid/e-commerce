// hooks/useAuth.js
import { useState, useEffect } from "react";
import { getUsers, saveUsers, getLoggedUser } from "../services/LocalStordge";

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getLoggedUser());
  }, []);

  const login = (email, password) => {
    const users = getUsers();

    const index = users.findIndex(
      (u) => u.email === email && u.password === password
    );

    if (index === -1) return false;

    const updated = users.map((u, i) =>
      i === index ? { ...u, isLoggedIn: true } : { ...u, isLoggedIn: false }
    );

    saveUsers(updated);
    setUser(updated[index]);
    return true;
  };

  const logout = () => {
    const users = getUsers().map((u) => ({
      ...u,
      isLoggedIn: false,
    }));

    saveUsers(users);
    setUser(null);
  };

  return { user, login, logout };
}