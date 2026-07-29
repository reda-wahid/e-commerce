export const getUsers = () => {
  return JSON.parse(localStorage.getItem("users")) || [];
};

export const saveUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

export const getLoggedUser = () => {
  return getUsers().find((u) => u.isLoggedIn) || null;
};