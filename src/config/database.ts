import { Db, MongoClient } from 'mongodb';

const client = new MongoClient("mongodb+srv://adrianolivapizarro_db_user:adrian1A@cluster0.zgp1mii.mongodb.net/");



export const connectMongo = ():Promise<Db> => {

    return client.connect().then(()=>{
        console.log("Conectado al Monguito");

        return client.db("Practica_3_Back")
    }).catch((error)=>{
        console.log("Error al conectar con Mongo");
        throw error;
    })

}   