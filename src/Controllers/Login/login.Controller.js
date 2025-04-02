export const getLogin = (req, res) => {
  console.log("Solicitud recibida en login");  // Verifica si la solicitud llega al servidor
  res.json({
    message: "Login exitoso",
    status: "success",
  });
};
