import { useShallow } from "zustand/shallow"
import { sprintStore } from "../store/sprintStore"
import { createSprintController, deleteSprintController, getSprintsController, updateSprintController } from "../data/sprintController"
import { ISprint } from "../types/ISprint"
import { useCallback } from "react"
import { ITarea } from "../types/ITarea"
import { deleteTareaController } from "../data/tareasController"

export const useSprints = () => {
    const {sprints, listarSprints, crearSprint, editarSprint, agregarTareaASprint, editarTareaDeSprint, eliminarTareaDeSprint, eliminarSprint}=sprintStore(
        useShallow((state) => ({
            sprints:state.sprints,
            listarSprints:state.listarSprints,
            crearSprint:state.crearSprint,
            editarSprint:state.editarSprint,
            agregarTareaASprint:state.agregarTareaASprint,
            editarTareaDeSprint:state.editarTareaDeSprint,
            eliminarTareaDeSprint:state.eliminarTareaDeSprint,
            eliminarSprint:state.eliminarSprint
        }))
    )
    //GET
    const getSprints = useCallback(async () => {
        const data = await getSprintsController();
        if (data) listarSprints(data)
    }, [listarSprints])

    //POST
    const createSprint = async (nombre: string, fechaInicio: string, fechaCierre: string) => {
        const nuevoSprint = crearSprint(nombre, fechaInicio, fechaCierre);
        try {
            await createSprintController(nuevoSprint);
        } catch (error) {
            console.log("Error al crea una tarea", error)
        }
    }

    //UPDATE SPRINT
    const updateSprint = async (sprintEditado: ISprint) => {
        const estadoPrevio = sprints.find((el) => el.id === sprintEditado.id);
        editarSprint(sprintEditado)

        try {
            await updateSprintController(sprintEditado)
        } catch (error) {
            if (estadoPrevio) editarSprint(estadoPrevio);
            console.log("Error al editar la tarea. Reseteando a estado previo", error)
        }
    }

    //ADD TAREA SPRINT
    const addTareaSprint = async (idSprint: string, titulo: string, descripcion: string, estado: string, fechaLimite: string) => {
        const nuevaTarea = { id: Date.now().toString(), titulo, descripcion, estado, fechaLimite }
        agregarTareaASprint(idSprint, nuevaTarea)
        const sprintActual = sprints.find((s) => s.id === idSprint);
        if (!sprintActual) return;

        const sprintActualizado: ISprint = {
            ...sprintActual,
            tareas: [...sprintActual.tareas, nuevaTarea],
        };

    try {
      await updateSprintController(sprintActualizado);
    } catch (error) {
      console.log("Error al guardar la tarea en el backend", error);
    }
    }

    //UPDATE TAREA SPRINT
    const editTareaSprint = async (sprintActivo: ISprint, tareaEditada: ITarea) => {
        const estadoPrevio = sprintActivo?.tareas.find((el) => el.id === tareaEditada.id);
        
        if (sprintActivo) {
          editarTareaDeSprint(sprintActivo.id!, tareaEditada);
        }
      
        const tareasActualizadas = sprintActivo.tareas.map((tarea) =>
          tarea.id === tareaEditada.id ? { ...tarea, ...tareaEditada } : tarea
        );
      
        const sprintActualizado: ISprint = {
          ...sprintActivo,
          tareas: tareasActualizadas
        };
      
        try {
          await updateSprintController(sprintActualizado);
        } catch (error) {
          if (estadoPrevio) {
            editarTareaDeSprint(sprintActivo.id!, estadoPrevio);
            getSprints()
          }
          console.log("Error al editar la tarea", error);
        }
      };
      
      //DELETE TAREA SPRINT
      const deleteTareaSprint = async (idSprint: string, tareaId: string) => {

        eliminarTareaDeSprint(idSprint, tareaId);
    
        const sprintActual = sprints.find((s) => s.id === idSprint);
        if (!sprintActual) return;
    
        const sprintActualizado: ISprint = {
            ...sprintActual,
            tareas: sprintActual.tareas.filter((tarea) => tarea.id !== tareaId),
        };
    
        try {
            await updateSprintController(sprintActualizado);
    
            await deleteTareaController(tareaId);
        } catch (error) {
            console.log("Error al borrar la tarea o actualizar el sprint", error);
            getSprints(); 
        }
    };

    //DELETE SPRINT
    const deleteSprint = async (idSprint: string) => {
    
            eliminarSprint(idSprint);
    
            try {
                await deleteSprintController(idSprint);
            } catch (error) {
                console.log(`Error al eliminar la tarea: ${error}`, error)
            }
        }
  return {
    sprints,
    getSprints,
    createSprint,
    updateSprint,
    addTareaSprint,
    editTareaSprint,
    deleteTareaSprint,
    deleteSprint
  }
}
