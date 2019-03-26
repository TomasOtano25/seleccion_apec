export const authHeader = () => {
  let token = localStorage.getItem("token");

  if (token) {
    console.log({ Authorization: "Bearer " + token });
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
};
