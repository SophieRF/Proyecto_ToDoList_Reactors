import { create } from "zustand";
import { ISprint } from "../types/ISprint.ts";

interface ISprintStore {
    sprints: ISprint[]
    sprintActiva: ISprint | null
    setSprintActiva: (sprintActiva: ISprint | null) => void;
    crearSprint: (nombre: string, fechaInicio: string, fechaCierre: string) => void;
    listarSprints: (sprints: ISprint[]) => void;
    editarSprint: (sprintEditada: ISprint) => void;
    eliminarSprint: (sprintId: string) => void;
}

export const sprintStore = create<ISprintStore>((set) => ({
    sprints: [],
    sprintActiva: null,

    //Setear Sprint Activa
    setSprintActiva: (sprintActiva) => set({ sprintActiva }),

    //Crear un Sprint
    crearSprint: (nombre, fechaInicio, fechaCierre) => set((state) => {
        const nuevoSprint = {
            id: Date.now().toString(),
            nombre,
            fechaInicio,
            fechaCierre,
            tareas: []
        };
        return { sprints: [...state.sprints, nuevoSprint] };
    }),

    //Listar Sprints
    listarSprints: () => (state) => {
        return { sprints: [...state.sprints] };
    },

    //Editar Sprint
    editarSprint: (sprintEditada) => set((state) => {
        const listaSprintsActualizada = state.sprints.map((sprint) =>
            sprint.id === sprintEditada.id
                ? { ...sprint, ...sprintEditada }
                : sprint
        );
        return { sprints: listaSprintsActualizada };
    }),

    //Eliminar Sprint
    eliminarSprint: (sprintId) => set((state) => {
        const arregloSprints = state.sprints.filter((sprint) =>
            sprint.id !== sprintId);
        return { sprints: arregloSprints };
    }),
}));