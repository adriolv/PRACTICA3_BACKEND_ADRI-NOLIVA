import type { Request, Response } from "express";
import { ObjectId, type Collection } from "mongodb";
import type { TebeoT } from "../models/tebeos.model.js";

let tebeosCollection: Collection<TebeoT>;

export const configTebeoCollection = (collection: Collection<TebeoT>) => {
    tebeosCollection = collection;
}

export const getTebeos = (
    req: Request,
    res: Response
) => {
    tebeosCollection.find().toArray().then((tebeos) => {
        res.json(tebeos);
    }).catch(() => {
        res.status(500).json({
            error: "Petó la llamada"
        });
    });
}

export const getTebeoWithID = (
    req: Request,
    res: Response
) => {
    const id = String(req.params.id);

    if (!ObjectId.isValid(id)) {
        res.status(400).json({
            error: "Invalid ID"
        });
        return;
    }

    tebeosCollection.findOne({
        _id: new ObjectId(id)
    }).then((result) => {
        if (!result) {
            res.status(404).json({
                error: "Tebeo no encontrado"
            });
            return;
        }

        res.json(result);
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            error: "Algo ha ido mal al buscar el tebeo"
        });
    });
}

export const createTebeo = (
    req: Request,
    res: Response
) => {
  
    if (req.body.titulo === undefined || req.body.titulo === "") {
        res.status(400).json({ error: "Falta el título" });
        return;
    }
    if (req.body.autor === undefined || req.body.autor === "") {
        res.status(400).json({ error: "Falta el autor" });
        return;
    }
    if (req.body.editorial === undefined || req.body.editorial === "") {
        res.status(400).json({ error: "Falta la editorial" });
        return;
    }
    if (req.body.numero === undefined || req.body.numero <= 0) {
        res.status(400).json({ error: "Número incorrecto" });
        return;
    }
    if (req.body.fechaPublicacion === undefined || req.body.fechaPublicacion === "") {
        res.status(400).json({ error: "Falta la fecha" });
        return;
    }
    if (req.body.precio === undefined || req.body.precio < 0) {
        res.status(400).json({ error: "Precio incorrecto" });
        return;
    }
    if (req.body.leido === undefined) {
        res.status(400).json({ error: "Falta si está leído" });
        return;
    }

    const newTebeo: TebeoT = {
        titulo: req.body.titulo,
        autor: req.body.autor,
        editorial: req.body.editorial,
        numero: req.body.numero,
        fechaPublicacion: req.body.fechaPublicacion,
        precio: req.body.precio,
        leido: req.body.leido
    };

    tebeosCollection.insertOne(newTebeo).then((result) => {
        res.status(201).json({
            _id: result.insertedId,
            ...newTebeo
        });
    }).catch(() => {
        res.status(500).json({
            error: "Error al crear el tebeo"
        });
    });
}

export const deleteTebeo = (
    req: Request,
    res: Response
) => {
    const id = String(req.params.id);

    if (!ObjectId.isValid(id)) {
        res.status(400).json({
            error: "Invalid ID"
        });
        return;
    }

    tebeosCollection.findOneAndDelete({
        _id: new ObjectId(id)
    }).then((result) => {
        if (!result) {
            res.status(404).json({
                error: "Tebeo no encontrado"
            });
            return;
        }

        res.json(result);
    }).catch(() => {
        res.status(500).json({
            error: "Se lió la picha eliminando"
        });
    });
}

export const changeTebeo = (
    req: Request,
    res: Response
) => {
    const id = String(req.params.id);

    if (!ObjectId.isValid(id)) {
        res.status(400).json({
            error: "Invalid ID"
        });
        return;
    }

    if (req.body.titulo === undefined || req.body.titulo === "") {
        res.status(400).json({ error: "Falta el título" });
        return;
    }
    if (req.body.autor === undefined || req.body.autor === "") {
        res.status(400).json({ error: "Falta el autor" });
        return;
    }
    if (req.body.editorial === undefined || req.body.editorial === "") {
        res.status(400).json({ error: "Falta la editorial" });
        return;
    }
    if (req.body.numero === undefined || req.body.numero <= 0) {
        res.status(400).json({ error: "Número incorrecto" });
        return;
    }
    if (req.body.fechaPublicacion === undefined || req.body.fechaPublicacion === "") {
        res.status(400).json({ error: "Falta la fecha" });
        return;
    }
    if (req.body.precio === undefined || req.body.precio < 0) {
        res.status(400).json({ error: "Precio incorrecto" });
        return;
    }
    if (req.body.leido === undefined) {
        res.status(400).json({ error: "Falta si está leído" });
        return;
    }

    const tebeoActualizado: TebeoT = {
        titulo: req.body.titulo,
        autor: req.body.autor,
        editorial: req.body.editorial,
        numero: req.body.numero,
        fechaPublicacion: req.body.fechaPublicacion,
        precio: req.body.precio,
        leido: req.body.leido
    };

    tebeosCollection.replaceOne({
        _id: new ObjectId(id)
    }, tebeoActualizado).then((result) => {
        if (result.matchedCount === 0) {
            res.status(404).json({
                error: "Tebeo no encontrado"
            });
            return;
        }

        res.json({
            _id: new ObjectId(id),
            ...tebeoActualizado
        });
    }).catch(() => {
        res.status(500).json({
            error: "Se lió cambiando"
        });
    });
}