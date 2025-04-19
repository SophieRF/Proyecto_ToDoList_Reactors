const mongoose=require('mongoose')

const tareaSchema= new mongoose.Schema({
    titulo: String,
    descripcion: String,
    estado: String,
    fechaLimite: String
})

module.exports=mongoose.model("Tarea", tareaSchema)