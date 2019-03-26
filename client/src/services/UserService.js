const logout = () => {
  localStorage.removeItem("token");
};

export const userService = { logout };
