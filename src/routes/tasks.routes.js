const express = require('express');
const router = express.Router();
const Task = require('../models/Task.js');

// GET
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las tareas' });
    }
});

// GET BY ID
router.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las tareas' });
    }
});

// POST
router.post('/tasks', async (req, res) => {
    try {
        const newTask = new Task(req.body);
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear la tarea' });
    }
});

// PUT
router.put('/tasks/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar la tarea' });
    }
});

// DELETE
router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        if (task.sprintId) {
            return res.status(400).json({ error: 'No se puede eliminar la tarea porque está asignada a un sprint' });
        }

        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Tarea eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
})

module.exports = router;
