import axios from "axios"
import { ENDPOINTS } from "../utils/constantes"
import { ISprint } from "../types/ISprint"
import { putSprintBar } from "../http/sprintsBar";

export const getSprintsController = async():Promise<ISprint[]| undefined> => {
    try{
        const response=await axios.get<{sprints:ISprint[]}>(ENDPOINTS.SPRINTS);
        return response.data.sprints;
    }catch(err){
        console.log("Hubo un problema al obtener los sprints", err)
    }
}

//Crear Sprint
export const createSprintController = async (sprintNuevo: ISprint) => {
    try {
        const sprintsBd = await getSprintsController();

        if (sprintsBd) {
            await putSprintBar([...sprintsBd, sprintNuevo]);
        } else {
            await putSprintBar([sprintNuevo]);
        }

        return sprintNuevo;
    } catch (error) {
        console.log("Error en createTareaController", error);
    }
};

// Actualizar sprint
export const updateSprintController = async (
    sprintActualizado: ISprint
) => {
    try {
        const sprintsBd = await getSprintsController();

        if (sprintsBd) {
            const result = sprintsBd.map((sprintBd) =>
                sprintBd.id === sprintActualizado.id
                    ? { ...sprintBd, ...sprintActualizado }
                    : sprintBd
            );

            await putSprintBar(result);
        }
        return sprintActualizado; 
    } catch (error) {
        console.log("Error en updateSprintController", error);
    }
};

//Eliminar Sprint
export const deleteSprintController = async (idSprintAEliminar: string) => {
    try {
        const sprintsDb = await getSprintsController();

        if (sprintsDb) {
            const result = sprintsDb.filter(
                (sprintDb) => sprintDb.id !== idSprintAEliminar
            );

            await putSprintBar(result);
        }
    } catch (error) {
        console.log("Error en deleteSprintController", error);
    }
};
