import mongoose from "mongoose";

const sprintSchema = new mongoose.Schema({
    fechaInicio: {
        type: String, require: true
    },
    fechaCierre: {
        type: String, require: true
    },
    tareas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task", default: []
    }],
    color: {
        type: String
    },
});

export default mongoose.model("sprint", sprintSchema);