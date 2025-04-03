import { useSprints } from '../../hooks/useSprints'
import { ISprint } from '../../types/ISprint'
import styles from './ModalSprints.module.css'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { sprintStore } from '../../store/sprintStore'

interface IModalSprintProps{
    activeSprint:ISprint | null,
    openModalSee:boolean,
    handleCloseModal:() => void
}

const initialState={
    nombre:"",
    fechaInicio:"",
    fechaCierre:"",
    tareas:[]
}

export const ModalSprints = ({handleCloseModal, activeSprint, openModalSee}:IModalSprintProps) => {
    const {createSprint, updateSprint}=useSprints();
    const [formValues, setFormValues]=useState<ISprint>(initialState);

    const setSprintActive=sprintStore((state) => state.setSprintActiva);

    const handleSubmit=async (e:FormEvent) => {
        e.preventDefault();
        if(activeSprint){
            updateSprint(formValues)
        }else{
            createSprint(formValues.nombre, formValues.fechaInicio, formValues.fechaCierre)
        }

        setSprintActive(null)
        handleCloseModal()
    }

    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
      const {name, value} =e.target
      setFormValues((prev) => ({... prev, [`${name}`]: value}))
    }

    useEffect(() => {
        if(activeSprint){
            setFormValues((prev) => 
            prev.id ? prev : activeSprint)
        }else{
            setFormValues(initialState)
        }
    }, [activeSprint])
  return (
    <div className={styles.mainDiv}>
      <div className={styles.innerDiv}>
        <div className={styles.titulo}>
          {(activeSprint) ? (openModalSee ? <h1>Ver Sprint</h1> : <h1>Editar Sprint</h1>) : (<h1>Crear Sprint</h1>)}
        </div>
        {!openModalSee && activeSprint &&
          <>
            <form onSubmit={handleSubmit} className={styles.formulario}>
              <div>
                <label>Nombre del sprint:</label>
                <input
                  type='text'
                  name='nombre'
                  className={styles.inputBox}
                  onChange={handleChange}
                  value={formValues?.nombre}
                />
              </div>
              <div>
              <label>Fecha de inicio:</label>
                <input
                  type='date'
                  name='fechaInicio'
                  value={formValues?.fechaInicio}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.fechaInput}>
                <label>Fecha de cierre:</label>
                <input
                  type='date'
                  name='fechaLimite'
                  value={formValues?.fechaCierre}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.buttonsDiv}>
                <button className={styles.cancelButton} onClick={handleCloseModal}>Cancelar</button>
                <button type='submit' className={styles.acceptButton}>Aceptar</button>
              </div>
            </form>
          </>}
        {openModalSee && activeSprint &&
          <>
            <div>
              <p>Nombre del sprint: {activeSprint?.nombre}</p>
            </div>
            <div>
              <p>Fecha de inicio: {activeSprint?.fechaInicio}</p>
            </div>
            <div>
              <p>Fecha de cierre: {activeSprint?.fechaCierre}</p>
            </div>
            <div className={styles.buttonsDiv}>
              <button className={styles.cancelButton} onClick={handleCloseModal}>Cancelar</button>
            </div>
          </>}
        {!openModalSee && activeSprint == null &&
          <>
            <form onSubmit={handleSubmit} className={styles.formulario}>
              <div>
                <label>Nombre del sprint:</label>
                <input
                  type='text'
                  placeholder="Ingrese el nombre del sprint"
                  name='nombre'
                  className={styles.inputBox}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.fechaInput}>
                <label>Fecha de inicio:</label>
                <input
                  type='date'
                  name='fechaInicio'
                  onChange={handleChange}
                />
              </div>
              <div className={styles.fechaInput}>
                <label>Fecha de cierre:</label>
                <input
                  type='date'
                  name='fechaCierre'
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
