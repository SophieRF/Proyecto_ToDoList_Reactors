import axios from "axios";
import { ISprint } from "../types/ISprint";
import { ISprintBar } from "../types/ISprintBar";
import { ENDPOINTS } from "../utils/constantes";

export const putSprintBar= async (sprints:ISprint[]) => {
    try{
        const response = await axios.put<ISprintBar>(ENDPOINTS.SPRINTS, {
            sprints: sprints,
        });

        return response.data;
    }catch(err){
        console.log("Hubo un error en el sprintBar", err)
    }
}