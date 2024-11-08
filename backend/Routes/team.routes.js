import express from "express";
import { acceptInvite, createTeam, deleteTeam, getAllTeamInvitesForAUser, getMembersOfATeam, getParticipatingTeamsOfAUser, kickMember, leaveTeam, rejectInvite, sendTeamInvite, updateTeam } from "../Controller/team.controller.js";
const router = express.Router();
console.log('Team routes called');

router.post("/createTeam", createTeam); //testing done
router.patch("/update/:teamId", updateTeam); //testing done
router.delete("/delete/:teamId/:userId", deleteTeam); // testing done
router.post("/sendTeamInvite", sendTeamInvite); //testing done
router.get("/getAllInvites/:userId", getAllTeamInvitesForAUser); //testing done
router.get("/getMembersOfATeam/:teamId", getMembersOfATeam); //testing done
router.post("/leaveTeam", leaveTeam);
router.post("/acceptInvite", acceptInvite); //testing done
router.post("/rejectInvite", rejectInvite); //testing done
router.get("/participatingTeamsOfAUser/:userId", getParticipatingTeamsOfAUser); //testing done
router.post("/kickAMember", kickMember);

export default router;
