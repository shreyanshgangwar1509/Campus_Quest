import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
    // unique: true,
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
  size: {
    type: Number,
    default: 1,
  },
  teamCode: {
    type: String,
    unique: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  registeredEvents: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Event", // This will contain the eventId of each registered event by this team.
  },
  solved: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hunt",
    },
  ],
  Chat: [String],
});

// Helper function to generate a 6-digit unique code
const generateUniqueCode = async () => {
  let code;
  let isUnique = false;

  while (!isUnique) {
    code = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit code
    const existingTeam = await Team.findOne({ teamCode: code });
    if (!existingTeam) isUnique = true;
  }

  return code;
};

// Function to create a new team with a unique teamCode
teamSchema.statics.createTeam = async function (teamName, leaderId) {
  const teamCode = await generateUniqueCode();
  const newTeam = await this.create({
    teamName,
    leader: leaderId,
    teamCode,
    members: [leaderId],
  });
  return newTeam;
};

// Function to add a member to the team
teamSchema.methods.addMember = async function (memberId) {
  if (!this.members.includes(memberId)) {
    this.members.push(memberId);
    this.size = this.members.length;
    await this.save();
  }
  return this;
};

const Team = mongoose.model("Team", teamSchema);
export default Team;
