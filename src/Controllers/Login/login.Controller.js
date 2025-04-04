export const postLogin = (req, res) => {
  const { email, password } = req.body; // Aquí se extraen los datos enviados desde el frontend

  console.log("Solicitud recibida en login");
  console.log("Email:", email);
  console.log("Password:", password);

  if(email.endsWith("@estudiantec.cr") || email.endsWith("@itcr.ac.cr")){ 
    if (email.endsWith("@estudiantec.cr") && (email === '1234@estudiantec.cr' && password === "1234")){
      res.status(200).json({
        message: "Login exitoso",
        status: "success",
      });
    }
    else if (email.endsWith("@itcr.ac.cr") && (email === '1234@itcr.ac.cr' && password === "1234")) {
      res.status(201).json({
        message: "Login exitoso",
        status: "success",
      });
    }
    else {
      res.status(401).json({
        message: "Credenciales inválidas",
        status: "error",
      });
    }
  }
  else {
    res.status(401).json({
      message: "Dominio inválido. Debe ser @estudiantes.com o @itcr.ac.cr",
      status: "error",
    });
  }
};