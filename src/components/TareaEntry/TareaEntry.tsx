import { ChangeEvent, useState } from 'react'
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
  variant?: 'default' | 'board';
}

export default function TareaEntry({ tarea, variant }: ITareaEntryProps) {
  const [openModal, setOpenModal] = useState(false);
  const [openModalSee, setOpenModalSee] = useState(false);
  const setTareaActiva = tareaStore((state) => state.setTareaActiva)
  const activeSprint = sprintStore((state) => state.sprintActiva);
  const { getTareas } = useTareas();
  const { editTarea, deleteTarea } = useSprints()
  const fechaLimite = new Date(tarea.fechaLimite || "");
  const tiempoRestante = fechaLimite.getTime() - Date.now();
  const tresDiasEnMs = 3 * 24 * 60 * 60 * 1000;
  const tareaAVencer = tiempoRestante <= tresDiasEnMs && tiempoRestante > 0;

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
    if (activeSprint) {
      deleteTarea(activeSprint.id!, tarea.id!);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedTarea = { ...tarea, [name]: value };
    if (activeSprint) {
      editTarea(activeSprint, updatedTarea);
      getTareas()
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
            <button className={styles.botonEnviar}>
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
      {openModal && <Modal handleCloseModal={handleCloseModal} activeTarea={tarea} openModalSee={openModalSee} />}
    </div>
  )
}
