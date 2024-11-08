
import express from "express";
import { getActiveUsers, getMessage, postMessage } from "../Controller/Chat.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { io } from "../socket/socket.js";


const router = express.Router();

router.get("/:id",getMessage);

router.post("/send/:id",(req,res)=>postMessage(req,res,io));

router.get("/active",authMiddleware,getActiveUsers);

export default router;