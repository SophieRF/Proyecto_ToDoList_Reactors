import axios from "axios";
import { ISprint } from "../types/ISprint";
import { ISprintBar } from "../types/ISprintBar";

export const putSprintBar= async (sprints:ISprint[]) => {
    try{
        const response = await axios.put<ISprintBar>(import.meta.env.VITE_SPRINTS_ENDPOINT, {
            sprints: sprints,
        });

        return response.data;
    }catch(err){
        console.log("Hubo un error en el sprintBar", err)
    }
}