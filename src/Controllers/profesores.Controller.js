import { Timestamp } from 'firebase/firestore';
import { db, app } from "../Services/fireBaseConnect.js";
import { collection, getDocs, updateDoc, doc, getDoc, addDoc, query, where, arrayUnion} from "firebase/firestore";


export const getInfoProfesores = async (req, res) => {

    const { id } = req.params;
    try {
        const docRef = doc(db, "Usuarios", id);
        const docSnap = await getDoc(docRef);
        console.log("entro al controlador de profesores")
        if (docSnap.exists()) {
            res.status(200).json(docSnap.data());
        } else {
            res.status(404).json({ message: "No such document!" });
        }
    } catch (error) {
        console.error("Error getting document:", error);
        res.status(500).json({ message: "Error getting document" });
    }
}
