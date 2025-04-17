import { transporter } from "../Services/emails.js";
import { db, app } from "../Services/fireBaseConnect.js";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";


//PARA EL INFOESCUELA 

export const informacionEscuela = async (req, res) => {
    const { userId } = req.query;
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
  

//PARA EL CURSOSESCUELA

export const informacionCursosEscuela = async (req, res) => {
  const { userId } = req.query;

  try {
    // 1. Obtener todos los usuarios
    const usuariosSnapshot = await getDocs(collection(db, "Usuarios"));
    const usuariosMap = new Map();

    let cursosIds = [];
    let programasIds = [];

    for (const doc of usuariosSnapshot.docs) {
      const datos = doc.data();
      usuariosMap.set(doc.id, { id: doc.id, ...datos });

      if (doc.id === userId) {
        cursosIds = datos.cursos || [];
        programasIds = datos.programas || [];
      }
    }

    if (cursosIds.length === 0 && programasIds.length === 0) {
      return res.status(404).json({ error: "El usuario no tiene cursos ni programas" });
    }

    // 2. Obtener todos los cursos
    const cursosSnapshot = await getDocs(collection(db, "Cursos"));
    const cursosFiltrados = cursosSnapshot.docs
      .filter(doc => cursosIds.includes(doc.id))
      .map(doc => {
        const curso = doc.data();

        const profesorInfo = usuariosMap.get(curso.profesor) || { id: curso.profesor, nombre: "Desconocido" };
        const estudiantesInfo = (curso.Estudiantes || []).map(id => usuariosMap.get(id) || { id, nombre: "Desconocido" });

        return {
          id: doc.id,
          nombre: curso.nombre,
          semestre: curso.semestre,
          tipo: curso.tipo,
          profesor: profesorInfo,
          estudiantes: estudiantesInfo
        };
      });

    // 3. Obtener todos los programas
    const programasSnapshot = await getDocs(collection(db, "Programas"));
    const programasFiltrados = programasSnapshot.docs
      .filter(doc => programasIds.includes(doc.id))
      .map(doc => ({ id: doc.id, ...doc.data() }));

    // 4. Devolver respuesta
    return res.status(200).json({
      cursos: cursosFiltrados,
      programas: programasFiltrados
    });

  } catch (error) {
    console.error("Error al obtener la información:", error);
    return res.status(500).json({ error: "Error al obtener la información de cursos y programas" });
  }
};
