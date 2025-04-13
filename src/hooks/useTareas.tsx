import { useShallow } from "zustand/shallow";
import { tareaStore } from "../store/tareaStore";
import { ITarea } from "../types/ITarea";
import { createTareaController, deleteTareaController, getTareasController, updateEstadoTareaController, updateTareaController } from "../data/tareasController";

export const useTareas = () => {

    const {
        tareas, setArrayTareas, crearTarea, editarTarea, eliminarUnaTarea, cambiarEstadoTarea
    } = tareaStore(
        useShallow((state) => ({
            tareas: state.tareas,
            setArrayTareas: state.setArrayTareas,
            crearTarea: state.crearTarea,
            editarTarea: state.editarTarea,
            eliminarUnaTarea: state.eliminarUnaTarea,
            cambiarEstadoTarea: state.cambiarEstadoDeTarea
        }))
    )

    const getTareas = async () => {
        const data = await getTareasController();
        if (data) setArrayTareas(data);
    };

    const createTarea = async (titulo: string, descripcion: string, fechaLimite: string) => {
        const nuevaTarea = crearTarea(titulo, descripcion, fechaLimite);
        try {
            await createTareaController(nuevaTarea);
        } catch (error) {
            console.log(`Error al crear la tarea: ${error}`)
        }
    };

    const updateTarea = async (tareaEditada: ITarea) => {

        const estadoPrevio = tareas.find((el) => el.id === tareaEditada.id);
        editarTarea(tareaEditada);

        try {
            await updateTareaController(tareaEditada);
        } catch (error) {
            if (estadoPrevio) editarTarea(estadoPrevio);
            console.log(`Error al editar la tarea: ${error}`);
        }
    };

    const deleteTarea = async (idTarea: string) => {

        eliminarUnaTarea(idTarea);

        try {
            await deleteTareaController(idTarea);
        } catch (error) {
            console.log(`Error al eliminar la tarea: ${error}`)
        }
    };

    const updateEstadoTarea = async (id: string, nuevoEstado: string) => {
        const tareaPrev = tareas.find((t) => t.id === id);

        if (!tareaPrev) {
            console.warn("Tarea no encontrada");
            return;
        }
        cambiarEstadoTarea(id, nuevoEstado);

        try {
            await updateEstadoTareaController(id, nuevoEstado);

        } catch (error) {
            cambiarEstadoTarea(id, tareaPrev.estado);
            console.error(`Error al actualizar el estado de la tarea: ${error}`);
        }
    };

    return {
        tareas,
        getTareas,
        createTarea,
        updateTarea,
        deleteTarea,
        updateEstadoTarea
    }
};



