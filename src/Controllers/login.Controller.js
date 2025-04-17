import { transporter } from "../Services/emails.js";
import { db, app } from "../Services/fireBaseConnect.js";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log("Solicitud recibida en login", email);
/*
  if(email.endsWith("@estudiantec.cr") && email === '1234@estudiantec.cr' && password === "1234") {
    await transporter.sendMail({
      from: 'Inicio seccion <salascordero2003@gmail.com>',
      to: email,
      subject: "Inicio seccion",
      text: "Te informamos que tu sesión ha sido iniciada.",
      html: `<h1>Has iniciado sesión en tu cuenta</h1><p>Hola, ${email}</p>`
    });
*/
const credenciales = await validarCredenciales(email.toLowerCase(), password);
let id = credenciales.id;
let tipo = credenciales.tipoUsuario;

console.log("Tipo de usuario:", tipo);
  if(tipo === "Estudiante"){
    return res.status(200).json({
      message: "Login exitoso",
      status: "success",
      rol: "estudiante",
      id: id
    });
  }
  else if(tipo === "Profesor"){
    return res.status(200).json({
      message: "Login exitoso",
      status: "success",
      rol: "profesor",
      id: id
    });
  } 
  else if(tipo === "Administrador"){
    return res.status(200).json({
      message: "Login exitoso",
      status: "success",
      rol: "admin",
      id: id
    });
  } 
  else if(tipo === "Escuela"){
    return res.status(200).json({
      message: "Login exitoso",
      status: "success",
      rol: "escuela",
      id: id
    });
  }
  else if(tipo === 400){
    return res.status(401).json({
      message: "Credenciales inválidas",
      status: "error"
    });
  }

  else if(tipo === 401){
    return res.status(402).json({
      message: "Error al validar credenciale",
      status: "error"
    });
  }

  return res.status(401).json({
    message: "Credenciales inválidas",
    status: "error"
  });
};



const validarCredenciales = async (emailIngresado, contrasenaIngresada) => {
  try {
    const querySnapshot = await getDocs(collection(db, "Usuarios"));

    for (const doc of querySnapshot.docs) {
      const data = doc.data();
      if (
        data.correo?.toLowerCase() === emailIngresado.toLowerCase() &&
        data.contrasena === contrasenaIngresada
      ) {
        console.log("Usuario autenticado:", data);
        return {
          tipoUsuario: data.tipoUsuario,
          id: doc.id
        }; // ahora sí retorna correctamente
      }
    }

    console.log("Correo o contraseña incorrectos.");
    return 400;

  } catch (error) {
    console.error("Error al validar credenciales:", error);
    return 401;
  }
};




