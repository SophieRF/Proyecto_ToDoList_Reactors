const express = require('express');
const router = express.Router();
const Backlog = require('../models/Backlog.js');
const Task = require('../models/Task.js');

// GET
router.get('/backlog', async (req, res) => {
    try {
        const backlog = await Backlog.find();
        res.json(backlog);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el backlog' });
    }
});

// POST
router.post('/backlog', async (req, res) => {
    try {
        const newBacklog = new Backlog(req.body);
        const savedBacklog = await newBacklog.save();
        res.status(201).json(savedBacklog);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el backlog' });
    }
});

//PUT TASK
router.put('/backlog/add-task/:taskId', async (req, res) => {
    
    try {
        const task = await Task.findById(req.params.taskId);
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        if (backlog.tareas.includes(req.params.taskId)) {
            return res.status(400).json({ error: 'La tarea ya está agregada al backlog' });
        }

        backlog.tareas.push(req.params.taskId);
        const updatedBacklog = await backlog.save();
        res.json(updatedBacklog);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar la tarea al backlog' });
    }
});