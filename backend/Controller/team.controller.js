import mongoose from 'mongoose';
import Team from "../models/Team.model.js";
import User from "../models/User.model.js";

const createTeam = async (req, res, next) => {
  const { teamName } = req.body;
  const userId = req.user.userId;
  console.log(userId);
  
  console.log(req.body);
  
  if (!teamName) {
    return res.status(400).json({
      success: false,
      message: "Team name is missing",
    });
  }
  
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Create a 6-digit unique team code
    const teamCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Create the team
    const newTeam = await Team.create({
      teamName,
      leader: userId,
      members: [userId],
      teamCode,
    });

    res.status(201).json({ message: "Team created successfully", team: newTeam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  } 
};

const deleteTeam = async (req, res, next) => {
  const { teamId } = req.body;
  const userId = req.user.userId;
  console.log(teamId);
  console.log(userId);
  
  
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
    const tm = await Team.findOne({ teamName: teamId })

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
    const deletedTeam = await tm.deleteOne();

    res.status(200).json({
      success: true,
      message: "Deleted",
      team: deletedTeam,
    });
  } catch (err) {
    res.status(400).json({
      message:"Error in deleting team",err:err
    })
    next(err);
  }
};
const teammember = async (req, res) => {
  const { teamId } = req.params;

  try {
    const tm = Team.find({ _id: teamId });
    if (!tm) {
      res.status(400).json({
        message:"No such team exist"
      })
    }
    const member = tm.members;
    res.status(200).json({
      message: "Get all team member",
      member,
    })
  } catch (error) {
    res.status(500).json({
      message:"Erro rin getting team members"
    })
  }

}

const jointeam = async (req, res) => {
  const { teamCode } = req.body;
  const userId = req.userId;
  if (!teamCode) {
    return res.status(400).json({ message: "Team code is required" });
  }

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const team = await Team.findOne({ teamCode: teamCode });
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Convert userId to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Check if the user is already a member or the leader
    if (team.members.includes(userObjectId) || team.leader.equals(userObjectId)) {
      return res.status(400).json({ message: "User already in the team or is the leader" });
    }

    // Add user to the team members array
    team.members.push(userObjectId);
    await team.save();

    return res.status(200).json({ message: "User successfully added to the team", team });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const leaveTeam = async (req, res, next) => {
  const {  teamId } = req.body;
  const userId = req.userId;
  // Validate input
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
    // Convert userId and teamId to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const teamObjectId = new mongoose.Types.ObjectId(teamId);

    // Find the user by ID
    const user = await User.findById(userObjectId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find the team by ID
    const team = await Team.findById(teamObjectId);
    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team does not exist",
      });
    }

    // Check if the user is the team leader
    if (team.leader.equals(userObjectId)) {
      return res.status(400).json({
        success: false,
        message: "Leader can't leave the team. You can delete the team instead.",
      });
    }

    // Check if the user is in the team members list
    if (!team.members.includes(userObjectId)) {
      return res.status(400).json({
        success: false,
        message: "User is not a member of this team",
      });
    }

    // Remove the user from the team's members array
    team.members.pull(userObjectId);
    team.size = team.members.length;

    // Save the updated team
    await team.save();

    res.status(200).json({
      success: true,
      message: "Successfully left the team",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};



export {
  createTeam, deleteTeam, jointeam, leaveTeam, teammember
};


