const Task = require('../models/Task.js');

export const getTask = async (req, res, next) => {
    let tasks;
    try {
        tasks = await Task.find();
        if (tasks.lenght === 0) {
            res.json("No hay tareas disponibles")
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las tareas' });
    }

    res.tasks = tasks;
    next();
}

export const getTaksById = async (req, res, next) => {
    let task;
    const { id } = req.query;
    if (!id) {
        return res.status(404).json({ message: "El id no es válido" });
    }

    try {
        task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: "No se encontró una tarea con ese id" });
        }
    } catch (error) {
        res.status(500).json(message.error.message);
    }
    res.task = task;
    next();
}