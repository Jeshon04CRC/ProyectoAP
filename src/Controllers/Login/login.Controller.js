export const postLogin = (req, res) => {
  const { email, password } = req.body; // Aquí se extraen los datos enviados desde el frontend

  console.log("Solicitud recibida en login");
  console.log("Email:", email);
  console.log("Password:", password);

  // Aquí podrías hacer la validación contra una base de datos
  if (email === '1234' && password === '1234') {
    res.json({
      message: "Login exitoso",
      status: "success",
    });
  } else {
    res.status(401).json({
      message: "Credenciales inválidas",
      status: "error",
    });
  }
};