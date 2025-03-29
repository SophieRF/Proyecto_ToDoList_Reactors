import styles from './Modal.module.css'

interface IModalProps {
    handleCloseModal: () => void
}

export default function Modal({ handleCloseModal }: IModalProps) {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.innerDiv}>
        <div className={styles.titulo}>
          <h1>Crear Tarea</h1>
        </div>
        <form className={styles.formulario}>
          <div>
            <label>Título:</label>
            <input
              type='text'
              placeholder='Ingrese un título para la tarea'
              name='titulo'
              className={styles.inputBox}
            />
          </div>
          <div>
            <label>Descripción:</label>
            <textarea
              placeholder='Ingrese una descripción'
              name='descripcion'
              className={styles.inputTextarea}
            />
          </div>
          <div className={styles.fechaInput}>
            <label>Fecha límite:</label>
            <input
              type='date'
              name='fecha'
            />
          </div>
        </form>
        <div className={styles.buttonsDiv}>
          <button className={styles.cancelButton} onClick={handleCloseModal}>Cancelar</button>
          <button type='submit' className={styles.acceptButton}>Aceptar</button>
        </div>
      </div>
    </div>
  )
}
