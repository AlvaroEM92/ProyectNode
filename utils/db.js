const mongoose = require("mongoose");
require("dotenv").config();

function connect(){ 
mongoose 
    .connect(process.env.MONGODB_URL, {})
    .then(()=>console.log("Conectado a MongoDB"))
    .catch((err)=> console.log("Error al conectar" , err));
}
module.exports = {connect};
