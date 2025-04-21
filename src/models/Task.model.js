import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    titulo: {
        type: String,
        require: true
    },
    descripcion: {
        type: String
    },
    estado: {
        type: String,
        require: true,
        enum: ["pendiente", "en progreso", "completada"],
    },
    fechaLimite: {
        type: Date,
        require: true
    },
    color: {
        type: String
    },
});

const Task = mongoose.model("task", taskSchema);

module.exports = Task;