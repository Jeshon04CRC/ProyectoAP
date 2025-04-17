import { transporter } from "../Services/emails.js";
import { db, app } from "../Services/fireBaseConnect.js";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";


export const informacionEscuela = async (req, res) => {
    const { userId } = req.body;
    try {
      const querySnapshot = await getDocs(collection(db, "Usuarios"));

      for (const doc of querySnapshot.docs) {
        const datos = doc.data();
        if (doc.id === userId) {
          console.log("InformacionDepatamento:", datos);
          return res.status(200).json({datos});
        }
      }
  
      console.log("Correo o contraseña incorrectos.");
      return res.status(400).json({ error: "Correo o contraseña incorrectos." });
  
    } catch (error) {
      console.error("Error al validar credenciales:", error);
      return res.status(401).json({ error: "Error al validar credenciales" });
    }
}

export const actualizarInfoEscuela = async (req, res) => {
    const { userId, formData } = req.body;
    try {

      console.log("userId:", userId);
      console.log("formData:", formData);
      // Obtén la referencia al documento del usuario en la colección "Usuarios"
      const docRef = doc(db, 'Usuarios', userId); // 'Usuarios' es la colección, y userId es el ID del documento
  
      // Actualiza solo los campos que deseas modificar
      await updateDoc(docRef, formData);
  
      console.log("Documento actualizado correctamente");
      return res.status(200).json({ message: "Documento actualizado correctamente" });
    } 
    catch (error) {
      console.error("Error al actualizar el documento:", error);
      return res.status(400).json({ error: "Error al actualizar el documento" });
    }
  };

const obtenerInformacion = async (id) => {
    try {
      const querySnapshot = await getDocs(collection(db, "Usuarios"));

      for (const doc of querySnapshot.docs) {
        const data = doc.data();
        if (doc.id === id) {
          console.log("InformacionDepatamento:", data);
          return data; // ahora sí retorna correctamente
        }
      }
  
      console.log("Correo o contraseña incorrectos.");
      return 400;
  
    } catch (error) {
      console.error("Error al validar credenciales:", error);
      return 401;
    }
  };
  