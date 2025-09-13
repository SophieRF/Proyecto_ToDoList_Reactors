import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styles from './Modal.module.css'
import { Form } from 'react-bootstrap';
import { ITarea } from '../../../types/ITarea';
import { useTareas } from '../../../hooks/useTareas';
import { useSprints } from '../../../hooks/useSprints';
import { sprintStore } from '../../../store/sprintStore';
import { tareaStore } from '../../../store/tareaStore';

interface IModalProps {
  activeTarea: ITarea | null,
  openModalSee: boolean,
  handleCloseModal: () => void
  variant: 'default' | 'board'
}

const initialState: ITarea = {
  titulo: "",
  descripcion: "",
  estado: "Pendiente",
  fechaLimite: ""

}

export default function Modal({ handleCloseModal, activeTarea, openModalSee, variant }: IModalProps) {
  const [formValues, setFormValues] = useState<ITarea>(initialState);
  const { editTareaSprint, addTareaSprint } = useSprints();
  const { updateTarea, createTarea } = useTareas();
  const activeSprint = sprintStore((state) => state.sprintActiva);
  const setTareaActiva = tareaStore((state) => state.setTareaActiva);

  useEffect(() => {
    if (activeTarea) {
      setFormValues((prev) =>
        prev.id ? prev : activeTarea);
    } else {
      setFormValues(initialState)
    }

  }, [activeTarea])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [`${name}`]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (variant === 'board' && activeSprint) {
      if (activeTarea) {
        editTareaSprint(activeSprint, formValues);
      } else {
        addTareaSprint(
          activeSprint.id!,
          formValues.titulo,
          formValues.descripcion,
          formValues.estado,
          formValues.fechaLimite
        );
      }
    } else if (variant === 'default') {
      if (activeTarea) {
        updateTarea(formValues)
      } else {
        createTarea(
          formValues.titulo,
          formValues.descripcion,
          formValues.fechaLimite
        )
      }
    }

    setTareaActiva(null);
    handleCloseModal();

  }

  return (
    <div className={styles.mainDiv}>
      <div className={styles.innerDiv}>
        <div className={styles.titulo}>
          {(activeTarea) ? (openModalSee ? <h1>Ver Tarea</h1> : <h1>Editar Tarea</h1>) : (<h1>Crear Tarea</h1>)}
        </div>
        {!openModalSee && activeTarea &&
          <>
            <form onSubmit={handleSubmit} className={styles.formulario}>
              <div>
                <label>Título:</label>
                <input
                  type='text'
                  name='titulo'
                  className={styles.inputBox}
                  onChange={handleChange}
                  value={formValues?.titulo}
                />
              </div>
              <div>
                <label>Descripción:</label>
                <textarea
                  name='descripcion'
                  className={styles.inputTextarea}
                  onChange={handleChange}
                  value={formValues?.descripcion}
                />
              </div>
              <div>
                <label>Estado:</label>
                <Form.Select name='estado' onChange={handleChange} value={formValues.estado}>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Terminada" >Terminada</option>
                  <option value="En Progreso">En Progreso</option>
                </Form.Select>
              </div>
              <div className={styles.fechaInput}>
                <label>Fecha límite:</label>
                <input
                  type='date'
                  name='fechaLimite'
                  value={formValues?.fechaLimite}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.buttonsDiv}>
                <button className={styles.cancelButton} onClick={handleCloseModal}>Cancelar</button>
                <button type='submit' className={styles.acceptButton}>Aceptar</button>
              </div>
            </form>
          </>}
        {openModalSee && activeTarea &&
          <form className={styles.formulario + ' ' + styles.viewMode}>
            <div className={styles.infoContainer}>
              <div className={styles.infoItem}>
                <label>Título:</label>
                <span>{activeTarea.titulo}</span>
              </div>
              <div className={styles.infoItem}>
                <label>Fecha Límite:</label>
                <span>{activeTarea.fechaLimite}</span>
              </div>
              <div className={styles.infoItem}>
                <label>Estado:</label>
                <span>{activeTarea.estado}</span>
              </div>
            </div>

            <div className={styles.buttonsDiv}>
              <button className={styles.cancelButton + ' ' + styles.fullWidthButton} onClick={handleCloseModal}>Cerrar</button>
            </div>
          </form>
        }
        {!openModalSee && activeTarea == null &&
          <>
            <form onSubmit={handleSubmit} className={styles.formulario}>
              <div>
                <label>Título:</label>
                <input
                  type='text'
                  placeholder="Ingrese el título de la tarea"
                  name='titulo'
                  className={styles.inputBox}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Descripción:</label>
                <textarea
                  placeholder="Ingrese una descripción para la tarea"
                  name='descripcion'
                  className={styles.inputTextarea}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Estado:</label>
                <Form.Select name='estado' onChange={handleChange} value={formValues.estado}>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Terminada">Terminada</option>
                  <option value="En Progreso">En Progreso</option>
                </Form.Select>
              </div>
              <div className={styles.fechaInput}>
                <label>Fecha límite:</label>
                <input
                  type='date'
                  name='fechaLimite'
                  onChange={handleChange}
                />
              </div>
              <div className={styles.buttonsDiv}>
                <button className={styles.cancelButton} onClick={handleCloseModal}>Cancelar</button>
                <button type='submit' className={styles.acceptButton}>Aceptar</button>
              </div>
            </form>
          </>}
      </div>
    </div>
  )
}
