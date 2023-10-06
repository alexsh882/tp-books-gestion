import { connect } from "mongoose";
import { environments } from "./environments.js";

export const connectDB = async () => {
    try {
        await connect(`${environments.DB.DB_URL}:${environments.DB.DB_PORT}/${environments.DB.DB_NAME}`)
        console.log('Conexión a la base de datos, exitosa.');
    } catch (error) {
        console.log(error)
    }
}