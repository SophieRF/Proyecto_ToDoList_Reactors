import { create } from "zustand";
import { ITarea } from "../types/ITarea.ts";
interface ITareaStore {
    tareas: ITarea[]
    tareaActiva: ITarea | null
    setTareaActiva: (tareaActiva: ITarea | null) => void;
    setArrayTareas: (arrayDeTareas: ITarea[]) => void;
    crearTarea: (titulo: string, descripcion: string, fechaLimite: string) => ITarea;
    editarTarea: (tareaActualizada: ITarea) => void;
    eliminarUnaTarea: (idTarea: string) => void;
    cambiarEstadoDeTarea: (idTarea: string, nuevoEstado: string) => void;
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
            estado: "Pendiente",
            fechaLimite,
        };
        set((state) => ({
            tareas: [...state.tareas, nuevaTarea]
        }))
        return nuevaTarea;
    },

    //Listar tareas
    listarTareas: () => tareaStore.getState().tareas,

    //Editar tarea
    editarTarea: (tareaActualizada) => {
        set((state) => ({
            tareas: state.tareas.map((tarea) =>
                tarea.id === tareaActualizada.id ? tareaActualizada : tarea
            ),
        }));
    },

    //Eliminar tarea
    eliminarUnaTarea: (idTarea) => {
        set((state) =>
        ({
            tareas: state.tareas.filter(
                (tarea) => tarea.id !== idTarea)
        }));
    },

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
    
}));


