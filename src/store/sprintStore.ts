import { create } from "zustand";
import { ISprint } from "../types/ISprint.ts";
import { ITarea } from "../types/ITarea.ts";

interface ISprintStore {
    sprints: ISprint[]
    sprintActiva: ISprint | null
    setSprintActiva: (sprintActiva: ISprint | null) => void;
    crearSprint: (nombre: string, fechaInicio: string, fechaCierre: string) => ISprint;
    listarSprints: (sprints: ISprint[]) => void;
    editarSprint: (sprintEditada: ISprint) => void;
    agregarTareaASprint: (sprintId: string, tarea: ITarea) => void;
    editarTareaDeSprint: (sprintId: string, tarea: ITarea) => void;
    eliminarTareaDeSprint: (sprintId: string, tareaId: string) => void;
    eliminarSprint: (sprintId: string) => void;
}

export const sprintStore = create<ISprintStore>((set) => ({
    sprints: [],
    sprintActiva: null,

    //Setear Sprint Activa
    setSprintActiva: (sprintActivaInput) => set({ sprintActiva: sprintActivaInput }),

    //Crear un Sprint
    crearSprint: (nombre, fechaInicio, fechaCierre) => {
        const nuevoSprint: ISprint = {
            id: Date.now().toString(),
            nombre,
            fechaInicio,
            fechaCierre,
            tareas: []
        };
        set((state) => ({
            sprints: [...state.sprints, nuevoSprint]
        }))
        return nuevoSprint;
    },

    //Listar Sprints
    listarSprints: (sprints) => set({ sprints }),


    //Editar Sprint
    editarSprint: (sprintEditada) => set((state) => {
        const listaSprintsActualizada = state.sprints.map((sprint) =>
            sprint.id === sprintEditada.id
                ? { ...sprint, ...sprintEditada }
                : sprint
        );
        return { sprints: listaSprintsActualizada };
    }),

    // Agregar una tarea a un sprint por id
    agregarTareaASprint: (sprintId, nuevaTarea) => set((state) => {
        const sprints = state.sprints.map((sprint) => sprint.id === sprintId ? { ...sprint, tareas: [...sprint.tareas, nuevaTarea] } : sprint)
        return { sprints }
    }
    ),
    // Editar una tarea de un sprint
    editarTareaDeSprint: (sprintId, tareaEditada) => set((state) => {
        const sprints = state.sprints.map((sprint) => {
            if (sprint.id === sprintId) {
                const tareasActualizadas = sprint.tareas.map((tarea) =>
                    tarea.id === tareaEditada.id ? { ...tarea, ...tareaEditada } : tarea
                );
                return { ...sprint, tareas: tareasActualizadas };
            }
            return sprint;
        });
        return { sprints };
    }),

    //Borrar tarea desde sprint
    eliminarTareaDeSprint: (sprintId, tareaId) => set((state) => {
        const sprints = state.sprints.map((sprint) => {
            if (sprint.id === sprintId) {
                const tareasActualizadas = sprint.tareas.filter((tarea) => tarea.id !== tareaId);
                return { ...sprint, tareas: tareasActualizadas };
            }
            return sprint;
        });

        const sprintActiva = state.sprintActiva?.id === sprintId
            ? { ...state.sprintActiva, tareas: state.sprintActiva.tareas.filter(t => t.id !== tareaId) }
            : state.sprintActiva;

        return { sprints, sprintActiva };
    }),

    //Eliminar Sprint
    eliminarSprint: (sprintId) => set((state) => {
        const arregloSprints = state.sprints.filter((sprint) =>
            sprint.id !== sprintId);
        return { sprints: arregloSprints };
    }),
}));