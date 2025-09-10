import { ChangeEvent, useEffect, useState } from 'react'
import { ITarea } from '../../types/ITarea'
import styles from './TareaEntry.module.css'
import { tareaStore } from '../../store/tareaStore'
import { useTareas } from '../../hooks/useTareas'
import { Form } from 'react-bootstrap'
import Modal from '../ui/Modal/Modal'
import { useSprints } from '../../hooks/useSprints'
import { sprintStore } from '../../store/sprintStore'

interface ITareaEntryProps {
  tarea: ITarea;
  variant: 'default' | 'board';
}

export default function TareaEntry({ tarea, variant }: ITareaEntryProps) {

  const [openModal, setOpenModal] = useState(false);
  const [openModalSee, setOpenModalSee] = useState(false);
  const setTareaActiva = tareaStore((state) => state.setTareaActiva);
  const activeSprint = sprintStore((state) => state.sprintActiva);
  const { getTareas, createTarea, updateTarea, deleteTarea } = useTareas();
  const { updateSprint, editTareaSprint, deleteTareaSprint } = useSprints()
  const fechaLimite = new Date(tarea.fechaLimite || "");
  const tiempoRestante = fechaLimite.getTime() - Date.now();
  const tresDiasEnMs = 3 * 24 * 60 * 60 * 1000;
  const tareaAVencer = tiempoRestante <= tresDiasEnMs && tiempoRestante > 0;
  const { getSprints, sprints } = useSprints();

  useEffect(() => {
    getSprints();
  }, [getSprints])

  const handleOpenModalSee = () => {
    setTareaActiva(tarea)
    setOpenModalSee(true)
    setOpenModal(true)
  }

  const handleOpenModalEntry = () => {
    setTareaActiva(tarea)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModalSee(false)
    setTareaActiva(null)
    setOpenModal(false)
  }
  const handleDelete = () => {

    if (variant === 'board' && activeSprint) {
      deleteTareaSprint(activeSprint.id!, tarea.id!);
    } else if (variant === 'default') {
      deleteTarea(tarea.id!);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedTarea = { ...tarea, [name]: value };
    if (variant === 'board' && activeSprint) {
      editTareaSprint(activeSprint, updatedTarea);
    } else if (variant === 'default') {
      updateTarea(updatedTarea);
    }
    getTareas();
  };

  const handleEnviarAlBacklog = async () => {
    if (!activeSprint || !tarea.id) return;
  
    try {
      await deleteTareaSprint(activeSprint.id!, tarea.id);
  
      await createTarea(tarea.titulo, tarea.descripcion, tarea.fechaLimite!);
  
      await getTareas();
  
    } catch (error) {
      console.error("Error al enviar la tarea al backlog:", error);
    }
  };

  const handleMoverAlSprint = async (
    e: ChangeEvent<HTMLSelectElement>,
    tarea: ITarea,
    sprints: ReturnType<typeof useSprints>["sprints"],
    deleteTarea: ReturnType<typeof useTareas>["deleteTarea"],
    updateSprint: ReturnType<typeof useSprints>["updateSprint"],
    getSprints: ReturnType<typeof useSprints>["getSprints"]
  ) => {
    const idSprintDestino = e.target.value;
    const sprintDestino = sprints.find((s) => s.id === idSprintDestino);
    if (!sprintDestino|| idSprintDestino === "") return;

    try {
      await deleteTarea(tarea.id!);

      const sprintActualizado = {
        ...sprintDestino,
        tareas: [...(sprintDestino.tareas || []), tarea],
      };

      await updateSprint(sprintActualizado);

      await getSprints();

    } catch (error) {
      console.error("Error al mover la tarea al sprint:", error);
    }
  };

  return (
    <div
      className={`${variant === 'board' ? styles.boardStyle : styles.backlogStyle} 
    ${tareaAVencer ? styles.fechaCercana : ''}`}
    >
      <div>
        <div>
          <h1 className={styles.title}>{tarea.titulo}</h1>
          <p>{tarea.descripcion}</p>
          <p>{tarea.fechaLimite}</p>
        </div>

        {variant === 'board' && (
          <div className={styles.estadoWrapper}>
            <button 
            className={styles.botonEnviar}
            onClick={handleEnviarAlBacklog}>
              Enviar al Backlog
            </button>

            <div className={styles.dropdownEstado}>
              <label htmlFor={`estado-${tarea.id}`}>Estado:</label>
              <Form.Select
                id={`estado-${tarea.id}`}
                name="estado"
                value={tarea.estado}
                onChange={handleChange}
              >
                <option value="Pendiente">Pendiente</option>
                <option value="En progreso">En progreso</option>
                <option value="Terminada">Terminada</option>
              </Form.Select>
            </div>

          </div>
        )}
      </div>
      <div className={styles.divBotones}>
        {variant === "default" && (
          <div className={styles.dropdownMoverASprint}>
            <label htmlFor={`sprint-${tarea.id}`}>Mover a Sprint:</label>
            <Form.Select
              id={`sprint-${tarea.id}`}
              name="sprintId"
              defaultValue=""
              onChange={(e) =>
                handleMoverAlSprint(e, tarea, sprints, deleteTarea, updateSprint, getSprints)}
            >
              <option value="" disabled>Seleccionar sprint...</option>
              {sprints.length > 0 && sprints.map((sprint) => (
                <option
                  key={sprint.id}
                  value={sprint.id}>
                  {sprint.nombre}
                </option>
              ))}
            </Form.Select>
          </div>
        )}

        <div>
          <button
            className={styles.botonVisibility}
            onClick={handleOpenModalSee}>
            <span className="material-symbols-outlined">
              visibility
            </span>
          </button>
        </div>
        <div>
          <button
            className={styles.botonEdit}
            onClick={handleOpenModalEntry}>
            <span className="material-symbols-outlined">
              edit
            </span>
          </button>
        </div>
        <div>
          <button
            className={styles.botonDelete}
            onClick={handleDelete}>
            <span className="material-symbols-outlined">
              delete
            </span>
          </button>
        </div>
      </div>
      {openModal && <Modal
        handleCloseModal={handleCloseModal}
        activeTarea={tarea}
        openModalSee={openModalSee}
        variant={variant} />}
    </div>
  )
}
