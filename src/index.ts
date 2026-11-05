import express from "express";
import tebeosRoutes from "./routes/tebeos.routes.js"
import { connectMongo } from "./config/database.js";
import { configTebeoCollection } from "./controllers/tebeos.controller.js";
import type { Collection } from "mongodb";
import type { TebeoT } from "./models/tebeos.model.js";

const app = express();

app.use(express.json());

const startServer = () => {

    connectMongo().then((db)=>{
        const tebeosCollection:Collection<TebeoT> = db.collection("Tebeos");
        configTebeoCollection(tebeosCollection);

        app.use("/tebeos", tebeosRoutes);

        app.listen(3001, ()=>{
            console.log("Api funcionando en el puerto 3001")
        })

    }).catch(()=>{
        console.log("No se ha podido conectar a Mongo, así que nada de API guapín")
    })

};

startServer();