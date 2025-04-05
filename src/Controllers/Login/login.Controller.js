import { transporter } from "../../Services/emails.js"; // Importa la función trasposter desde utils


export const postLogin = async (req, res) => {
  const { email, password } = req.body; // Aquí se extraen los datos enviados desde el frontend

  console.log("Solicitud recibida en login");
  console.log("Email:", email);
  console.log("Password:", password);

  if(email.endsWith("@estudiantec.cr") || email.endsWith("@itcr.ac.cr")){ 
    if (email.endsWith("@estudiantec.cr") && (email === '1234@estudiantec.cr' && password === "1234") ){
      /*
      await transporter.sendMail({
        from: '"Inicio seccion " <salascordero2003@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Inicio seccion", // Subject line
        text: "Te informamos que tu sesión en tu cuenta ha sido iniciada.", // plain text body
        html: ` <h1>¡Has iniciado sesión en tu cuenta!</h1>
                <p>Hola,</p>
                <p>Te informamos que tu sesión en <strong>email</strong> ha sido iniciada correctamente.</p>
                <p>Si no fuiste tú, por favor cambia tu contraseña lo antes posible.</p>`, // html body
      });
      */
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
  else if (email === "admin" && password === "admin") {
    res.status(202).json({
      message: "Login exitoso",
      status: "success",
    });
  }

  else {
    res.status(401).json({
      message: "Dominio inválido. Debe ser @estudiantes.com o @itcr.ac.cr",
      status: "error",
    });
  }
};