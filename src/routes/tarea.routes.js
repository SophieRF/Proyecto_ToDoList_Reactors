
const express=require('express')
const router=express.Router()
const Tarea=require("../models/tareas.model")

// Get todas las tareas
router.get("/sprints/tareas", async (req, res) => {
    try{
        const tareas=await Tarea.find()
        console.log("Get todas las tares", tareas)
        if(tareas.length === 0){
            return res.status(204).json([])
        }
        res.json(tareas)
    }catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
})