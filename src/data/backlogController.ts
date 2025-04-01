import axios from "axios";
import { ITarea } from "../types/ITarea";
import { ENDPOINTS } from "../utils/constantes";
import { putBacklog } from "../http/backlog";

//Obtener tareas
export const getTareasController = async (): Promise<
    ITarea[] | undefined
> => {
    try {
        const response = await axios.get<{ tareas: ITarea[] }>(ENDPOINTS.BACKLOG);
        return response.data.tareas;
    } catch (error) {
        console.log("Problemas en getTareasController", error); 
    }
};

//Crear Tarea
export const createTareaController = async (tareaNueva: ITarea) => {
    try {
        const tareasBd = await getTareasController();

        if (tareasBd) {
            await putBacklog([...tareasBd, tareaNueva]);
        } else {
            await putBacklog([tareaNueva]);
        }

        return tareaNueva;
    } catch (error) {
        console.log("Error en createTareaController", error);
    }
};

// Actualizar tarea
export const updateTareaController = async (
    tareaActualizada: ITarea
) => {
    try {
        const tareasBd = await getTareasController();

        if (tareasBd) {
            const result = tareasBd.map((tareaBd) =>
                tareaBd.id === tareaActualizada.id
                    ? { ...tareaBd, ...tareaActualizada }
                    : tareaBd
            );

            await putBacklog(result);
        }
        return tareaActualizada; 
    } catch (error) {
        console.log("Error en updateTareaController", error);
    }
};

//Eliminar Tarea
export const deleteTareaController = async (idTareaAEliminar: string) => {
    try {
        const tareasBd = await getTareasController();

        if (tareasBd) {
            const result = tareasBd.filter(
                (tareaBd) => tareaBd.id !== idTareaAEliminar
            );

            await putBacklog(result);
        }
    } catch (error) {
        console.log("Error en deleteTareaController", error);
    }
};
