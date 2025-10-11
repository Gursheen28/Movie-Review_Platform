export const login = (userData) => {
  localStorage.setItem("user", JSON.stringify(userData));
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
