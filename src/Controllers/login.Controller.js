import { transporter } from "../Services/emails.js";

export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log("Solicitud recibida en login", email);

  if(email.endsWith("@estudiantec.cr") && email === '1234@estudiantec.cr' && password === "1234") {
    await transporter.sendMail({
      from: 'Inicio seccion <salascordero2003@gmail.com>',
      to: email,
      subject: "Inicio seccion",
      text: "Te informamos que tu sesión ha sido iniciada.",
      html: `<h1>Has iniciado sesión en tu cuenta</h1><p>Hola, ${email}</p>`
    });

    return res.status(200).json({
      message: "Login exitoso",
      status: "success",
      rol: "estudiante"
    });
  }

  if(email.endsWith("@itcr.ac.cr") && email === '1234@itcr.ac.cr' && password === "1234") {
    return res.status(200).json({
      message: "Login exitoso",
      status: "success",
      rol: "profesor"
    });
  }

  if(email === "admin" && password === "admin") {
    return res.status(200).json({
      message: "Login exitoso",
      status: "success",
      rol: "admin"
    });
  }

  return res.status(401).json({
    message: "Credenciales inválidas",
    status: "error"
  });
};