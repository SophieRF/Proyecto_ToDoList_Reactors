import axios from "axios"; 
import { ITarea } from "../types/ITarea";
import { IBacklog } from "../types/IBacklog";
import { ENDPOINTS } from "../utils/constantes";

// Actualizar el objeto global del json server
export const putBacklog = async (tareas: ITarea[]) => {
    try {
        const response = await axios.put<IBacklog>(ENDPOINTS.BACKLOG, {
            tareas: tareas,
        });

        return response.data; 
    } catch (error) {
        console.error("Algo salió mal en putBacklog", error); 
    }
};