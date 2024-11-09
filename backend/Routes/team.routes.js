import express from "express";
import { createTeam, deleteTeam, jointeam, leaveTeam, teammember } from "../Controller/team.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
const router = express.Router();
console.log('Team routes called');

router.post("/createTeam", authMiddleware,createTeam); 
router.delete("/delete/:teamId/:userId",authMiddleware, deleteTeam); 
router.post("/leaveTeam", authMiddleware,leaveTeam);
router.post("/jointeam/:teamId",authMiddleware,jointeam)
router.get('/allteamMember/:teamId', authMiddleware,teammember);
export default router;
