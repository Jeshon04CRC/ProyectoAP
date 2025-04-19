import { transporter } from "../Services/emails.js";
import { db, app } from "../Services/fireBaseConnect.js";
import { collection, getDocs, updateDoc, doc, getDoc} from "firebase/firestore";


// ---------------------------------------INFORMACION DEL ESTUDIANTE ----------------------------------------
export const informacionEstudiante = async (req, res) => {
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


// ---------------------------------------ACTUALIZAR LOS DATOS DEL ESTUDIANTE ----------------------------------------
export const registrarPerfilAcademico = async (req, res) => {
  const { userId, carrera, nivelAcademico, promedio } = req.body;

  console.log("📥 Datos recibidos en registrarPerfilAcademico:");
  console.log("userId:", userId);
  console.log("carrera:", carrera);
  console.log("nivelAcademico:", nivelAcademico);
  console.log("promedio:", promedio);

  try {
    const ref = doc(db, "Usuarios", userId);
    const docSnap = await getDoc(ref);

    if (!docSnap.exists()) {
      return res.status(404).json({ error: "Estudiante no encontrado" });
    }

    await updateDoc(ref, {
      carrera: carrera || "",
      nivelAcademico: nivelAcademico || "",
      ponderado: promedio || ""
    });

    return res.status(200).json({ message: "Perfil académico registrado" });
  } catch (error) {
    console.error("❌ Error en Firestore:", error);
    return res.status(500).json({ error: "Error al registrar perfil académico" });
  }
};


// -----------------------------------OBTENER TODAS LAS ASISTENCIAS (OPORTUNIDADES)--------------------------------------------
export const obtenerOportunidades = async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, "Asistencias"));
    console.log("Documentos en asistencias:", snapshot.docs.length);

    const oportunidades = snapshot.docs.map((doc) => {
      try {
        const data = doc.data();
        console.log("Asistencia encontrada:", data);

        return {
          id: doc.id,
          titulo: data.tituloPrograma || "Sin título",
          escuela: data.departamento || "No asignado",
          encargado: data.personaACargo || "Sin encargado",
          horas: `${data.totalHoras || "0"} horas mínimas a la semana`,
          requisitos: Array.isArray(data.requisitos)
            ? data.requisitos.join(', ')
            : "Sin requisitos",
          descripcion: data.descripcion || "",
          tipo: data.tipo || "",
          estado: data.estado || "",
          horario: data.horario || "Sin horario definido",
          cantidadVacantes: data.cantidadVacantes || "0",
          cantidadSolicitudes: data.cantidadSolicitudes || "0",
          objetivos: data.objetivos || "No especificados",
          beneficio: data.beneficio || "No aplica"
        };
      } catch (err) {
        console.error("Error al mapear asistencia:", err);
        return null;
      }
    }).filter(item => item !== null);

    console.log("Total oportunidades enviadas:", oportunidades.length);
    return res.status(200).json({ oportunidades });

  } catch (error) {
    console.error("Error al obtener oportunidades:", error);
    return res.status(500).json({ error: "No se pudieron obtener las oportunidades" });
  }
};
