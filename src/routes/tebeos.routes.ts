import { Router } from "express";
import { deleteTebeo, getTebeos, getTebeoWithID, changeTebeo, createTebeo } from "../controllers/tebeos.controller.js";

const router = Router();

router.get("/", getTebeos);
router.get("/:id", getTebeoWithID);
router.delete("/:id", deleteTebeo);
router.put("/:id", changeTebeo);
router.post("/", createTebeo);

export default router;