

// import { Link } from "react-router-dom";
// import HuntCard from "./HuntCard";
// import TeamCard from "./Team/TeamCard";
// import TeamFrontPage from "../Pages/TeamFrontPage";
// import Profile from "../Pages/Profile";



// export default function Dashboard() {
//   // Sample data for preset hunts
//   const presetHunts = [
//     {
//       title: "Campus Treasure Hunt",
//       description: "Explore the campus to find hidden treasures and solve clues.",
//       difficulty: "medium",
//       solved: true,
//       Host:"xyz",
//     },
//     {
//       title: "Math Challenge Hunt",
//       description: "Solve math-related challenges scattered across the campus.",
//       difficulty: "hard",
//       solved: false,
//       Host:"yzx",
//     },
//     {
//       title: "History Hunt",
//       description: "Discover important historical landmarks on campus.",
//       difficulty: "easy",
//       solved: true,
//       Host:"wxy",
//     },
//   ];

//   // Sample data for teams
//   const teams = [
//     {
//       name: "Alpha Squad",
//       description: "A team of enthusiastic coders.",
//       members: ["Alice", "Bob", "Charlie"],
//       createdAt: "2024-10-01",
//     },
//     {
//       name: "Beta Warriors",
//       description: "Math enthusiasts solving complex problems.",
//       members: ["David", "Eve"],
//       createdAt: "2024-10-15",
//     },
//     {
//       name: "Gamma Explorers",
//       description: "Passionate about exploring new technologies.",
//       members: ["Frank", "Grace", "Hannah"],
//       createdAt: "2024-11-01",
//     },
//   ];


 
  

//   // Filter hunts based on solved status
//   const solvedHunts = presetHunts.filter((hunt) => hunt.solved);


//   return (
//     <div className="flex min-h-screen ">
//       {/* Sidebar */}
      
//       <aside className="w-40 bg-blue-600 text-white shadow-lg">
//         <div className="p-6 text-center">
//           <h2 className="text-2xl font-semibold">User Dashboard</h2>
//         </div>
//         <nav className="mt-8">
//           <ul className="space-y-2">
//             <li>
//               <Link
//                 to="/dashboard/settings"
//                 className="flex items-center py-2 px-4 hover:bg-blue-700 transition-all"
//               >
//                 Settings
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/dashboard/solved-hunts"
//                 className="flex items-center py-2 px-4 hover:bg-blue-700 transition-all"
//               >
//                 Solved Hunts
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/dashboard/all-teams"
//                 className="flex items-center py-2 px-4 hover:bg-blue-700 transition-all"
//               >
//                 All Teams
//               </Link>
//             </li>
//           </ul>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8 animate-fade-in">
//         {/* <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1> */}
//         <Profile/>

//         {/* Solved Hunts Section */}
//         <div className="mt-6 bg-white shadow rounded-lg p-6">
//           <h2 className="text-xl font-semibold text-gray-700">Solved Hunts</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
//             {solvedHunts.length > 0 ? (
//               solvedHunts.map((hunt, index) => (
//                 <HuntCard
//                   key={index}
//                   title={hunt.title}
//                   description={hunt.description}
//                   difficulty={hunt.difficulty}
//                   solved={hunt.solved}
//                   host={hunt.Host}
//                 />
//               ))
//             ) : (
//               <p className="text-gray-500">No solved hunts yet.</p>
//             )}
//           </div>
//         </div>
//         {/* All Teams Section */}
//         <div className="mt-6 bg-white shadow rounded-lg p-6">
//           <h2 className="text-xl font-semibold text-gray-700">All Teams</h2>


//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
//             {teams.length > 0 ? (
//               teams.map((team, index) => (
//                 <TeamCard
//                   key={index}
//                   name={team.name}
//                   description={team.description}
//                   members={team.members}
//                   createdAt={team.createdAt}
//                 />
                
//               ))
//             ) : (
//               <p className="text-gray-500">No teams available.</p>
//             )}
//           </div>
//           <TeamFrontPage/>
          

//         </div>
//       </main>
//     </div>
//   );
// }


import { useState } from "react";
import { Link } from "react-router-dom";
import HuntCard from "./HuntCard";
import TeamCard from "./Team/TeamCard";
import TeamFrontPage from "../Pages/TeamFrontPage";
import Profile from "../Pages/Profile";

export default function Dashboard() {
  const [teams, setTeams] = useState([
    {
      name: "Alpha Squad",
      description: "A team of enthusiastic coders.",
      members: ["Alice", "Bob", "Charlie"],
      createdAt: "2024-10-01",
    },
    {
      name: "Beta Warriors",
      description: "Math enthusiasts solving complex problems.",
      members: ["David", "Eve"],
      createdAt: "2024-10-15",
    },
    {
      name: "Gamma Explorers",
      description: "Passionate about exploring new technologies.",
      members: ["Frank", "Grace", "Hannah"],
      createdAt: "2024-11-01",
    },
  ]);

  const presetHunts = [
    {
      title: "Campus Treasure Hunt",
      description: "Explore the campus to find hidden treasures and solve clues.",
      difficulty: "medium",
      solved: true,
      Host: "xyz",
    },
    {
      title: "Math Challenge Hunt",
      description: "Solve math-related challenges scattered across the campus.",
      difficulty: "hard",
      solved: false,
      Host: "yzx",
    },
    {
      title: "History Hunt",
      description: "Discover important historical landmarks on campus.",
      difficulty: "easy",
      solved: true,
      Host: "wxy",
    },
  ];

  const solvedHunts = presetHunts.filter((hunt) => hunt.solved);

  const handleDeleteTeam = (indexToDelete) => {
    const updatedTeams = teams.filter((_, index) => index !== indexToDelete);
    setTeams(updatedTeams);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-40 bg-blue-600 text-white shadow-lg">
        <div className="p-6 text-center">
          <h2 className="text-2xl font-semibold">User Dashboard</h2>
        </div>
        <nav className="mt-8">
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard/settings"
                className="flex items-center py-2 px-4 hover:bg-blue-700 transition-all"
              >
                Settings
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/solved-hunts"
                className="flex items-center py-2 px-4 hover:bg-blue-700 transition-all"
              >
                Solved Hunts
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/all-teams"
                className="flex items-center py-2 px-4 hover:bg-blue-700 transition-all"
              >
                All Teams
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 animate-fade-in">
        <Profile />

        {/* Solved Hunts Section */}
        <div className="mt-6 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700">Solved Hunts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {solvedHunts.length > 0 ? (
              solvedHunts.map((hunt, index) => (
                <HuntCard
                  key={index}
                  title={hunt.title}
                  description={hunt.description}
                  difficulty={hunt.difficulty}
                  solved={hunt.solved}
                  host={hunt.Host}
                />
              ))
            ) : (
              <p className="text-gray-500">No solved hunts yet.</p>
            )}
          </div>
        </div>

        {/* All Teams Section */}
        <div className="mt-6 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700">All Teams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 ">
            {teams.length > 0 ? (
              teams.map((team, index) => (
                <div key={index} className=" team-card bg-gray-100 p-4 rounded-lg shadow flex flex-col items-center">
                  <TeamCard
                    name={team.name}
                    description={team.description}
                    members={team.members}
                    createdAt={team.createdAt}
                  />
                  <button
                    onClick={() => handleDeleteTeam(index)}
                    className=" mt-1 py-1 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                  >
                    Delete Team
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No teams available.</p>
            )}
          </div>
          <TeamFrontPage />
        </div>
      </main>
    </div>
  );
}
