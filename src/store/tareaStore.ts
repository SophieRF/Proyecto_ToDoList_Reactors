import { create } from "zustand";
import { ITarea } from "../types/ITarea.ts";
import { sprintStore } from "./sprintStore.ts";

interface ITareaStore {
    tareas: ITarea[]
    tareaActiva: ITarea | null
    setTareaActiva: (tareaActiva: ITarea | null) => void;
    setArrayTareas:(arrayDeTareas: ITarea[]) => void;
    crearTarea: (titulo: string, descripcion: string, fechaLimite: string) => ITarea;
    editarTarea: (tareaActualizada: ITarea) => void;
    eliminarUnaTarea: (idTarea: string) => void;
    cambiarEstadoDeTarea: (idTarea: string, nuevoEstado: string) => void;
    moverTarea: (idTarea: string, idSprint: string) => void;
}

export const tareaStore = create<ITareaStore>((set) => ({

    tareas: [],
    tareaActiva: null,

    //Agregar array de tareas
    setArrayTareas: (arrayDeTareas) => set(() => (
        { tareas: arrayDeTareas })),

    //Setear la tarea activa
    setTareaActiva: (tareaActivaIn) => set(() => ({ tareaActiva: tareaActivaIn })),

    //Crear tarea
    crearTarea: (titulo, descripcion, fechaLimite) => {
        const nuevaTarea: ITarea = {
            id: Date.now().toString(),
            titulo,
            descripcion,
            fechaLimite,
            estado: ""
        };
        set((state) => ({
            tareas: [...state.tareas, nuevaTarea]
        }))
        return nuevaTarea;
    },

    //Listar tareas
    listarTareas: () => tareaStore.getState().tareas,

    //Editar tarea
    editarTarea: (tareaEditada) => set((state) => {
        const arregloTareas = state.tareas.map(
            (tarea) => tarea.id === tareaEditada.id
                ? { ...tarea, ...tareaEditada }
                : tarea
        );
        return { tareas: arregloTareas };
    }),

    //Eliminar tarea
    eliminarUnaTarea: (idTarea) => set((state) => {
        const arregloTareas = state.tareas.filter(
            (tarea) => tarea.id !== idTarea
        );
        return { tareas: arregloTareas }
    }),

    //Cambiar estado de tarea
    cambiarEstadoDeTarea: (idTarea, nuevoEstado) => set((state) => {
        const updateEstado = (tareas: ITarea[]) => {
            return tareas.map((tarea: ITarea) =>
                tarea.id === idTarea ? { ...tarea, estado: nuevoEstado }
                    : tarea);
        };
        return {
            tareas: updateEstado(state.tareas)
        };
    }),

    // Mover tarea entre sprint y backlog
    moverTarea: (idTarea, idSprint) => {
        set((state) => {
            const tareaMovida = state.tareas.find((tarea) => tarea.id === idTarea);
            if (!tareaMovida) return state;

            const sprints = sprintStore.getState().sprints;

            const nuevoBacklog = state.tareas.filter((tarea) => tarea.id !== idTarea);

            const nuevosSprints = sprints.map((sprint) => {
                if (sprint.id === idSprint) {
                    return { ...sprint, tareas: [...sprint.tareas, tareaMovida] };
                }
                return sprint;
            });

            return {
                tareas: nuevoBacklog,
                sprints: nuevosSprints,
            };
        });
    },
}));


