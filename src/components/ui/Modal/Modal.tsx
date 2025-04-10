import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { ITarea } from '../../types/ITarea'
import styles from './Modal.module.css'
import { useTareas } from '../../hooks/useTareas';
import { tareaStore } from '../../store/tareaStore';
import { Form } from 'react-bootstrap';
import { useSprints } from '../../hooks/useSprints';
import { sprintStore } from '../../store/sprintStore';

interface IModalProps {
  activeTarea: ITarea | null,
  openModalSee: boolean,
  handleCloseModal: () => void
}

const initialState: ITarea = {
  titulo: "",
  descripcion: "",
  estado: "",
  fechaLimite: ""

}

export default function Modal({ handleCloseModal, activeTarea, openModalSee }: IModalProps) {
  const [formValues, setFormValues] = useState<ITarea>(initialState);
  const { updateTarea } = useTareas();
  const {addTarea}=useSprints();
  const activeSprint=sprintStore((state) =>state.sprintActiva );
  const setTareaActiva = tareaStore((state) => state.setTareaActiva);

  useEffect(() => {
    if(activeTarea ){
          setFormValues((prev) =>
        prev.id ? prev : activeTarea);
    }else{
      setFormValues(initialState)
    }
    
  }, [activeTarea])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [`${name}`]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (activeTarea ) {
      updateTarea(formValues);
    } else if(activeSprint){
      addTarea(activeSprint.id!,formValues.titulo, formValues.descripcion, formValues.estado, formValues.fechaLimite);
    }
    setTareaActiva(null)
    handleCloseModal()

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
                <Form.Select name='estado' onChange={handleChange} value={formValues?.estado}>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Terminada" >Terminada</option>
                  <option value="En Progreso">En progreso</option>
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
          <>
            <div>
              <p>Título: {activeTarea?.titulo}</p>
            </div>
            <div>
              <p>Descripción: {activeTarea?.descripcion}</p>
            </div>
            <div>
              <p>Estado: {activeTarea?.estado}</p>
            </div>
            <div>
              <p>Fecha límite: {activeTarea?.fechaLimite}</p>
            </div>
            <div className={styles.buttonsDiv}>
              <button className={styles.cancelButton} onClick={handleCloseModal}>Cancelar</button>
            </div>
          </>}
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
                  <option value="En progreso">En progreso</option>
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
