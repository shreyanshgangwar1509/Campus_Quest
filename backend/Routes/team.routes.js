import express from "express";
const router = express.Router();

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
