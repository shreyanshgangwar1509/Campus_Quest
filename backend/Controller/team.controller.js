// router.post("/createTeam", createTeam); //testing done
// router.patch("/update/:teamId", updateTeam); //testing done
// router.delete("/delete/:teamId/:userId", deleteTeam); // testing done
// router.post("/sendTeamInvite", sendTeamInvite); //testing done
// router.get("/getAllInvites/:userId", getAllTeamInvitesForAUser); //testing done
// router.get("/geexistteamembersOfATeam/:teamId", geexistteamembersOfATeam); //testing done
// router.post("/leaveTeam", leaveTeam);
// router.post("/acceptInvite", acceptInvite); //testing done
// router.post("/rejectInvite", rejectInvite); //testing done
// router.get("/participatingTeamsOfAUser/:userId", getParticipatingTeamsOfAUser); //testing done


import Team from "../models/Team.model.js";
import User from "../models/User.model.js";

// router.post("/kickAMember", kickMember);
const createTeam = async (req, res, next) => {
  const { teamName, userid } = req.body;
  
  
  console.log(req.body);
  
  if (!teamName) {
    return res.status(400).json({
      success: false,
      message: "Team name is missing",
    });
  }

  if (!userid) {
    return res.status(400).json({
      success: false,
      message: "leader is missing.",
    });
  }

  try {
    const user = await User.findById({ _id: userid });
    if (!user) {
      return res.status(422).json({
        success: false,
        message:
          "can't create team as useridId is not valid or userid is not registered",
      });
    }

    const existteam = await Team.findOne({ teamName, userid });

    if (existteam) {
      return res.status(409).json({
        success: false,
        message: "Team with same name already exists",
        team: existteam,
      });
        }
       const newTeam = await Team.create({ teamName, userid, size:1 });
    newTeam.acceptedMembers = [...newTeam.acceptedMembers, userid];
    user.participatingTeam = [...user.participatingTeam, newTeam._id];
    await user.save();
    await newTeam.save();

    return res.status(200).json({
      success: true,
      message: "Team Created!",
      team: newTeam,
    });
  } catch (error) {
    next(error);
  }
};
const updateTeam = async (req, res, next) => {
  const { teamId } = req.params;

  const { teamName } = req.body;

  if (!teamName) {
    return res.status(400).json({
      success: false,
      message: "Team name is missing.",
    });
  }
  if (!teamId) {
    return res.status(400).json({
      success: false,
      message: "TeamId is missing or Invalid.",
    });
  }

  try {
    const oldtm = await Team.findOne({ _id: teamId });

    if (!oldtm) {
      return res.status(404).json({
        success: false,
        message: "TeamId is invalid or Team Does not exist",
      });
    }

    const registeredEventsByThisTeam = oldtm.registeredEvents;
    if (registeredEventsByThisTeam.length > 0) {
      return res.status(409).json({
        success: false,
        message: "This team is already registered for some event/events",
      });
    }

    if (oldtm.teamName === teamName) {
      return res.status(409).json({
        success: false,
        message: "Same team name provided as old one",
      });
    }

    const updatedTeam = await Team.findByIdAndUpdate(
      { _id: teamId },
      { teamName: teamName },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Updated!",
      team: updatedTeam,
    });
  } catch (err) {
    next(err);
  }
};

const deleteTeam = async (req, res, next) => {
  const { teamId, userId } = req.params;

  if (!teamId) {
    return res.status(400).json({
      success: false,
      message: "Provide team ID",
    });
  }

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "userId missing",
    });
  }

  try {
    const tm = await Team.findById({ _id: teamId }).populate([
      {
        path: "acceptedMembers",
        model: User,
      },
      {
        path: "pendingMembers",
        model: User,
      },
    ]);

    if (!tm) {
      return res.status(404).json({
        success: false,
        message: "Team does not exist, can't delete",
      });
    }

    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "userId is invalid",
      });
    }

    //only leader is allowed to delete the team
    if (JSON.stringify(tm.leader) != JSON.stringify(userId)) {
      return res.status(400).json({
        success: false,
        message: "Only leader can delete the team",
      });
    }

    // check if this team is already registered in some event.
    const registeredEventsByThisTeam = tm.registeredEvents;
    if (registeredEventsByThisTeam.length > 0) {
      return res.status(409).json({
        success: false,
        message: "This team is already registered for some event/events",
      });
    }
    //first remove all the references of this team. [otherwise it will cause deletion anomaly]

    // remove this team from all users participating team
    const acMembers = tm.acceptedMembers;

    for (let i = 0; i < acMembers.length; i++) {
      const index = acMembers[i].participatingTeam.indexOf(teamId);
      if (index !== -1) {
        acMembers[i].participatingTeam.splice(index, 1); // Remove one element at the found index
      }
      await acMembers[i].save();
    }

    //remove this team from all users pending team.
    const pdMembers = tm.pendingMembers;

    for (let i = 0; i < pdMembers.length; i++) {
      const index = pdMembers[i].pendingTeam.indexOf(teamId);
      if (index !== -1) {
        pdMembers[i].pendingTeam.splice(index, 1); // Remove one element at the found index
      }
      await pdMembers[i].save();
    }

    const deletedTeam = await Team.findByIdAndDelete({ _id: teamId });

    res.status(200).json({
      success: true,
      message: "Deleted",
      team: deletedTeam,
    });
  } catch (err) {
    next(err);
  }
};

const sendTeamInvite = async (req, res, next) => {
  const { teamName, sendToEmail, leaderId } = req.body;

  //{teamName, leaderId} combo of this is unique in team collection

  if (!teamName) {
    return res.status(400).json({
      success: false,
      message: "TeamName missing",
    });
  }

  if (!sendToEmail) {
    return res.status(400).json({
      success: false,
      message: "Recipient email address is missing",
    });
  }
  if (!leaderId) {
    return res.status(400).json({
      success: false,
      message: "Leader ID is missing",
    });
  }

  try {
    const tm = await Team.findOne({ teamName, leader: leaderId });

    if (!tm) {
      return res.status(404).json({
        success: false,
        message: "Invalid team name or invalid leaderID",
      });
    }

    //check if this team is participating in any event, if so you can't add members.

    if (tm.registeredEvents.length > 0) {
      return res.status(400).json({
        success: false,
        message:
          "Team is already participating in any event, can't send the invite",
      });
    }

    const ld = await User.findById({ _id: leaderId });
    if (!ld) {
      return res.status(400).json({
        success: false,
        message: "leaderId is invalid",
      });
    }
    var maxTeamSize = tm.size;
    var currentTeamSize = tm.acceptedMembers.length + tm.pendingMembers.length;

    if (currentTeamSize >= maxTeamSize) {
      return res.status(409).json({
        success: false,
        message: "Team size is currently full",
      });
    }
    const targetUser = await User.findOne({ email: sendToEmail });
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: "targetUser is not registered.",
      });
    }

    //first check the interCollege participation in not allowed.
    if (sendToEmail.includes("mnnit.ac.in")) {
      const leaderEmail = ld.email;
      if (!leaderEmail.includes("mnnit.ac.in")) {
        return res.status(400).json({
          success: false,
          message: "Inter College participation is not allowed.",
        });
      }
    }

    if (!sendToEmail.includes("mnnit.ac.in")) {
      const leaderEmail = ld.email;
      if (leaderEmail.includes("mnnit.ac.in")) {
        return res.status(400).json({
          success: false,
          message: "Inter College participation is not allowed.",
        });
      }
    }
    // leader can not sent the invite to himself

    if (JSON.stringify(targetUser._id) === JSON.stringify(leaderId)) {
      return res.status(400).json({
        success: false,
        message: "You can not send team invite to yourself",
      });
    }

    const targetUserId = JSON.stringify(targetUser._id);

    const acceptedMembersArray = tm.acceptedMembers;
    const pendingMembersArray = tm.pendingMembers;

    for (let i = 0; i < acceptedMembersArray.length; i++) {
      const currUserId = JSON.stringify(acceptedMembersArray[i]);
      if (targetUserId === currUserId) {
        return res.status(409).json({
          success: false,
          message: "User is already in the team and accepted by leader",
        });
      }
    }

    for (let i = 0; i < pendingMembersArray.length; i++) {
      const currUserId = JSON.stringify(pendingMembersArray[i]);

      if (currUserId === targetUserId) {
        return res.status(409).json({
          success: false,
          message: "Team Invitation Already sent.",
        });
      }
    }

    targetUser.pendingTeam = [...targetUser.pendingTeam, tm._id];
    tm.pendingMembers = [...tm.pendingMembers, targetUser._id];

    await tm.save();
    await targetUser.save();

    res.status(200).json({
      success: true,
      message: `Invite sent successfully to ${targetUser.name}`,
    });
  } catch (err) {
    next(err);
  }
};

const getAllTeamInvitesForAUser = async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "userId missing",
    });
  }

  try {
    const user = await User.findById({ _id: userId })
      .populate({
        path: "pendingTeam", // Populate the teams in pending invites
        model: Team, // Reference the Team model
      })
      .exec();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not found with provided userID",
      });
    }

    const pendingTeamInvites = user.pendingTeam;

    res.status(200).json({
      success: true,
      message: "All Invites Retrieved SuccessFully",
      teams: pendingTeamInvites,
    });
  } catch (err) {
    next(err);
  }
};

const getMembersOfATeam = async (req, res, next) => {
  const { teamId } = req.params;

  if (!teamId) {
    return res.status(400).json({
      success: false,
      message: "teamId missing",
    });
  }

  try {
    const acMembers = await Team.findById({ _id: teamId }).populate({
      path: "acceptedMembers",
      model: User,
    });

    if (!acMembers) {
      return res.status(404).json({
        // Added 404 Not Found for invalid teamId
        success: false,
        message: "Team not found",
      });
    }

    const pdMembers = await Team.findById({ _id: teamId }).populate({
      path: "pendingMembers",
      model: User,
    });

    const allMembers = [
      ...acMembers.acceptedMembers,
      ...pdMembers.pendingMembers,
    ];

    res.status(200).json({
      success: true,
      message: "fetched successfully!",
      acceptedMembers: acMembers.acceptedMembers,
      pendingMembers: pdMembers.pendingMembers,
      allMembers: allMembers,
    });
  } catch (err) {
    next(err);
  }
};

const acceptInvite = async (req, res, next) => {
  const { userId, teamId } = req.body;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "userId missing",
    });
  }

  if (!teamId) {
    return res.status(400).json({
      success: false,
      message: "teamId missing",
    });
  }

  try {
    const user = await User.findById({ _id: userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }
    const tm = await Team.findById({ _id: teamId });

    if (!tm) {
      return res.status(404).json({
        success: false,
        message: "team not found",
      });
    }

    if (tm.registeredEvents.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Team is already in any event.",
      });
    }

    //first check if user have this invite or not
    if (!user.pendingTeam.includes(teamId)) {
      return res.status(400).json({
        success: false,
        message: "You dont have this invite",
      });
    }

    const pendingTeams = user.pendingTeam;
    const toBeRemoved = teamId;

    const newPendingTeams = pendingTeams.filter(
      (team) => JSON.stringify(team) != JSON.stringify(toBeRemoved)
    );
    user.pendingTeam = newPendingTeams;

    //then add this team to the user's participatingTeam

    const participatingTeams = user.participatingTeam;
    const newParticipatingTeams = [...participatingTeams, teamId];
    user.participatingTeam = newParticipatingTeams;

    //then remove this user from this team's pending members

    const teamPendingMembers = tm.pendingMembers;
    const toBeRemovedUser = userId;

    const newTeamPendingMembers = teamPendingMembers.filter(
      (us) => JSON.stringify(us) != JSON.stringify(toBeRemovedUser)
    );
    tm.pendingMembers = newTeamPendingMembers;

    //then add this user to the team's accepted members.
    const acceptedMembersOfTeam = tm.acceptedMembers;
    const newAcceptedMembers = [...acceptedMembersOfTeam, userId];
    tm.acceptedMembers = newAcceptedMembers;

    await tm.save();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Invite Accepted!",
    });
  } catch (err) {
    next(err);
  }
};

const rejectInvite = async (req, res, next) => {
  const { userId, teamId } = req.body;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "userId missing",
    });
  }

  if (!teamId) {
    return res.status(400).json({
      success: false,
      message: "teamId missing",
    });
  }

  try {
    const user = await User.findById({ _id: userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    const tm = await Team.findById({ _id: teamId });

    if (!tm) {
      return res.status(404).json({
        success: false,
        message: "team not found",
      });
    }

    // first check if user have this team invite or not.
    if (!user.pendingTeam.includes(teamId)) {
      return res.status(400).json({
        success: false,
        message: "You dont have this invite",
      });
    }

    //then remove this user from pending members of this team
    const pendingInvites = tm.pendingMembers;

    const toBeRemovedUser = userId;
    const newPendingInvites = pendingInvites.filter(
      (us) => JSON.stringify(us) != JSON.stringify(toBeRemovedUser)
    );

    tm.pendingMembers = newPendingInvites;

    //remove this team from user's pending teams

    const pendingTeams = user.pendingTeam;
    const toBeRemovedTeam = teamId;
    const newPendingTeams = pendingTeams.filter(
      (team) => JSON.stringify(team) != JSON.stringify(toBeRemovedTeam)
    );

    user.pendingTeam = newPendingTeams;

    tm.save();
    user.save();

    res.status(200).json({
      success: true,
      message: "Invite Rejected!",
    });
  } catch (err) {
    next(err);
  }
};

const userProfile = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "userId is missing",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fetched Successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};

const updateResume = async (req, res, next) => {
  const { email, resumeLink } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "missing userId",
    });
  }

  if (!resumeLink) {
    return res.status(400).json({
      success: false,
      message: "missing resumeLink",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user does not exist",
      });
    }

    user.resumeLink = resumeLink;
    user.save();

    res.status(200).json({
      success: true,
      message: "Resume Updated!",
      user,
    });
  } catch (err) {
    next(err);
  }
};

const leaveTeam = async (req, res, next) => {
  const { userId, teamId } = req.body;

  if (!teamId) {
    return res.status(400).json({
      success: false,
      message: "teamId missing, can't leave this team",
    });
  }

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "userId missing, can't leave this team",
    });
  }

  try {
    const user = await User.findById({ _id: userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Not authorized to leave this team",
      });
    }

    const tm = await Team.findById({ _id: teamId });

    if (!tm) {
      return res.status(404).json({
        success: false,
        message: "Team does not exist",
      });
    }

    // check if this team is already registered for any event.

    const registeredEventsByThisTeam = tm.registeredEvents;
    if (registeredEventsByThisTeam.length > 0) {
      return res.status(400).json({
        success: false,
        message:
          "this team is already participating in some event/events, so can's leave team right now",
      });
    }

    //check if leader want to leave the team.

    if (JSON.stringify(tm.leader) === JSON.stringify(userId)) {
      return res.status(400).json({
        success: false,
        message:
          "leader can't leave the team, however you can delete the team.",
      });
    }

    //check if this user is in the team or not.

    if (!tm.acceptedMembers.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "this user is not in the team",
      });
    }

    // remove this user from team's accepted members

    const currentTeamAcceptedMembers = tm.acceptedMembers;
    const userToBeRemoved = userId;

    const newTeamAcceptedMembers = currentTeamAcceptedMembers.filter(
      (us) => JSON.stringify(us) != JSON.stringify(userToBeRemoved)
    );

    tm.acceptedMembers = newTeamAcceptedMembers;

    // remove this team from this user's participating teams.
    const userParticipatingTeams = user.participatingTeam;

    const teamToBeRemoved = teamId;
    const newUserParticipatingTeams = userParticipatingTeams.filter(
      (team) => JSON.stringify(team) != JSON.stringify(teamToBeRemoved)
    );

    user.participatingTeam = newUserParticipatingTeams;

    await tm.save();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Successfully left the team",
    });
  } catch (err) {
    next(err);
  }
};

const kickMember = async (req, res, next) => {
  const { leaderId, teamId, userTobeKickedId } = req.body;

  if (!leaderId) {
    return res.status(400).json({
      success: false,
      message: "leaderId missing",
    });
  }

  if (!teamId) {
    return res.status(400).json({
      success: false,
      message: "teamId is missing",
    });
  }

  if (!userTobeKickedId) {
    return res.status(400).json({
      success: false,
      message: "userTobeKeckedId is missing",
    });
  }

  try {
    const ld = await User.findById({ _id: leaderId });
    if (!ld) {
      return res.status(404).json({
        success: false,
        message: "leader id is invalid or does not exist in db",
      });
    }

    const tm = await Team.findById({ _id: teamId });
    if (!tm) {
      return res.status(404).json({
        success: true,
        message: "team does not exist with teamId",
      });
    }

    const userToBeKicked = await User.findById({ _id: userTobeKickedId });
    if (!userToBeKicked) {
      return res.status(404).json({
        success: false,
        message: "target user does not exist",
      });
    }

    //check if the team is not participating in any event
    const registeredEventsByThisTeam = tm.registeredEvents;
    if (registeredEventsByThisTeam > 0) {
      return res.status(400).json({
        success: false,
        message:
          "can't kick this user beacuse this team is registered for some event/events",
      });
    }

    // check if user is authorized to kick user [only team creator can kick members]

    const currentUserId = leaderId;
    const teamLeaderId = tm.leader;

    if (currentUserId != teamLeaderId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to kick this user",
      });
    }

    //team leader can't kick himself from the team.

    if (JSON.stringify(userToBeKicked) === JSON.stringify(tm.leader)) {
      return res.status(400).json({
        success: false,
        message:
          "leader can't kick himself, however leader can delete the team",
      });
    }

    //check if userToBeKicked is in the team

    if (!tm.acceptedMembers.includes(userTobeKickedId)) {
      return res.status(400).json({
        success: false,
        message: "user is not the in team",
      });
    }

    //remove this user from team's accpeted members.
    const currentTeamAcceptedMembers = tm.acceptedMembers;
    const userKicking = userTobeKickedId;

    const newTeamAcceptedMembers = currentTeamAcceptedMembers.filter(
      (us) => JSON.stringify(us) != JSON.stringify(userKicking)
    );

    tm.acceptedMembers = newTeamAcceptedMembers;

    //remove this team from user's participating teams
    const currentParticipatingTeams = userToBeKicked.participatingTeam;
    const teamToBeRemoved = teamId;

    const newParticipatingTeams = currentParticipatingTeams.filter(
      (team) => JSON.stringify(team) != JSON.stringify(teamToBeRemoved)
    );
    userToBeKicked.participatingTeam = newParticipatingTeams;

    await tm.save();
    await userToBeKicked.save();
    res.status(200).json({
      success: true,
      message: "User kicked out successfully",
    });
  } catch (err) {
    next(err);
  }
};

const getParticipatingTeamsOfAUser = async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "userId is missing",
    });
  }

  try {
    const user = await User.findById({ _id: userId }).populate([
      {
        path: "participatingTeam",
        model: Team,
        populate: [
          {
            path: "acceptedMembers",
            model: User,
          },
          {
            path: "registeredEvents",
            model: Event,
          },
        ],
      },
    ]);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does Not exist Or No Team",
      });
    }

    const acceptedTeams = user.participatingTeam;

    res.status(200).json({
      success: true,
      message: "fetched successfully!",
      totalTeams: acceptedTeams,
    });
  } catch (err) {
    next(err);
  }
};

export {
  acceptInvite, createTeam, deleteTeam, getAllTeamInvitesForAUser,
  getMembersOfATeam, getParticipatingTeamsOfAUser, kickMember, leaveTeam, rejectInvite, sendTeamInvite, updateResume, updateTeam, userProfile
};

