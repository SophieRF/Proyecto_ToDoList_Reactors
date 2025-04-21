const express = require('express');
const router = express.Router();
const Sprint = require('../models/Sprint.js');
const Task = require('../models/Task.js');

// GET
router.get('/sprints', async (req, res) => {
    try {
        const sprints = await Sprint.find();
        res.json(sprints);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los sprints' });
    }
});

// GET BY ID
router.get('/sprints/:id', async (req, res) => {
    try {
        const sprint = await Sprint.findById(req.params.id);
        if (!sprint) {
            return res.status(404).json({ error: 'Sprint no encontrada' });
        }
        res.json(sprint);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las sprints' });
    }
});

// POST
router.post('/sprints', async (req, res) => {
    try {
        const newSprint = new Sprint(req.body);
        const savedSprint = await newSprint.save();
        res.status(201).json(savedSprint);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear la sprint' });
    }
});

// PUT
router.put('/sprints/:id', async (req, res) => {
    try {
        const updatedSprint = await Sprint.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSprint) {
            return res.status(404).json({ error: 'Sprint no encontrada' });
        }
        res.json(updatedSprint);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar la sprint' });
    }
});

// DELETE
router.delete('/sprints/:id', async (req, res) => {
    try {
        const deletedSprint = await Sprint.findByIdAndDelete(req.params.id);
        if (!deletedSprint) {
            return res.status(404).json({ error: 'Sprint no encontrada' });
        }
        res.json({ message: 'Sprint eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la sprint' });
    }
})

//PUT TASK
router.put('/sprints/:id/add-task/:taskId', async (req, res) => {
    try {
        const sprint = await Sprint.findById(req.params.id);
        if (!sprint) {
            return res.status(404).json({ error: 'Sprint no encontrada' });
        }

        const task = await Task.findById(req.params.taskId);
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        if (sprint.tareas.includes(req.params.taskId)) {
            return res.status(400).json({ error: 'La tarea ya está agregada al sprint' });
        }

        sprint.tareas.push(req.params.taskId);
        const updatedSprint = await sprint.save();
        res.json(updatedSprint);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar la tarea al sprint' });
    }
});

module.exports = router;