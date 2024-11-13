
// import { Link } from "react-router-dom"; // Import Link and useHistory

// import HuntCard from "./HuntCard";
// // import HuntCard from './Components/HuntCard';


// export default function Dashboard() {
  
//   // data/presetHunts.js
//   const presetHunts = [
//     {
//         title: "Campus Treasure Hunt",
//         description: "Explore the campus to find hidden treasures and solve clues.",
//         questions: [
//             "What is the name of the main library?",
//             "How many floors does the Acadmics building have?",
//             "Find the statue in the quad. What is it made of?"
//         ],
//         answers: [
//             "Central Liberary",  // Replace with actual answers
//             "3",
//             "Material of Statue"
//         ],
//         hints: [
//             "The library is named as cynnosure",
//             "Look for the building with the big clock.",
//             "The statue is made of metal with brown color."
//         ],
//         difficulty: "medium",
//         solved: 0 // Initialize to 0 or appropriate number
//     },
//     {
//         title: "Math Challenge Hunt",
//         description: "Solve math-related challenges scattered across the campus.",
//         questions: [
//             "What is the derivative of x^2?",
//             "Solve for x in the equation 2x + 3 = 11.",
//             "What is the value of pi to three decimal places?"
//         ],
//         answers: [
//             "2x",  // Replace with actual answers
//             "4",
//             "3.142"
//         ],
//         hints: [
//             "Remember the basic rules of differentiation.",
//             "Isolate x on one side of the equation.",
//             "Pi is an irrational number."
//         ],
//         difficulty: "hard",
//         solved: 0
//     },
//     {
//         title: "History Hunt",
//         description: "Discover important historical landmarks on campus.",
//         questions: [
//             "When was the university founded?",
//             "Who was the first president of the university?",
//             "Find the plaque commemorating the founding of the university."
//         ],
//         answers: [
//             "1971",  // Replace with actual answers
//             "First President",
//             "Plaque Location"
//         ],
//         hints: [
//             "The university was founded in the early 1900s.",
//             "The first president was a notable figure in education.",
//             "The plaque is located near the entrance."
//         ],
//         difficulty: "easy",
//         solved: 0
//     }]



//   // const [data, setData] = useState({
//   //   labels: ["January", "February", "March", "April", "May", "June"],
//   //   datasets: [
//   //     {
//   //       label: "Sales",
//   //       data: [65, 59, 80, 81, 56, 55],
//   //       backgroundColor: "rgba(75, 192, 192, 0.6)",
//   //       borderColor: "rgba(75, 192, 192, 1)",
//   //       borderWidth: 1,
//   //     },
//   //   ],
//   // });

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-blue-600 text-white shadow-lg">
//         <div className="p-6 text-center">
//           <h2 className="text-2xl font-semibold">User</h2>
          
//         </div>
//         <nav className="mt-8">
//           <ul className="space-y-2">
            
            
//             <li>
//               <Link to="/dashboard/settings" className="flex items-center py-2 px-4 hover:bg-blue-700 transition-all">
//                 <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405 2.449A1 1 0 0118 21H6a1 1 0 01-.595-1.805L7 17h5m0-5h5l-1.405 2.449A1 1 0 0118 11H6a1 1 0 01-.595-1.805L7 7h5" /></svg>
//                 Settings
//               </Link>
//             </li>
            
//           </ul>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8 animate-fade-in">
//         <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
//         {/* <p className="mt-4 text-gray-600">This is your dashboard where you can manage your account, view settings, and more.</p> */}



//         {/* Data Table Section */}
//         <div className="mt-6 bg-white shadow rounded-lg p-6">
//           <h2 className="text-xl font-semibold text-gray-700">Past Hunts</h2>
//           <table className="min-w-full mt-4 divide-y divide-gray-200">
//             <thead className="bg-gray-50">
              
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200 flex gap-1">
              
//                 {presetHunts.map((data, index) => {
//                   const title = data.title;
//                   const host = data.host ;
//                   const description = data.description;
//                   const difficulty = data.difficulty;
//                   const questionsCount = data.questionsCount;
//                   const solved = data.solved;

//                   return (
//                       <HuntCard
//                           key={index}
//                           title={title}
//                           host={host}
//                           description={description}
//                           difficulty={difficulty}
//                           questionsCount={questionsCount}
//                           solved={solved}
//                       />
//                   );
//             })}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import HuntCard from "./HuntCard";
import TeamCard from "./Team/TeamCard";


export default function Dashboard() {
  // Sample data for preset hunts
  const presetHunts = [
    {
      title: "Campus Treasure Hunt",
      description: "Explore the campus to find hidden treasures and solve clues.",
      difficulty: "medium",
      solved: true,
    },
    {
      title: "Math Challenge Hunt",
      description: "Solve math-related challenges scattered across the campus.",
      difficulty: "hard",
      solved: false,
    },
    {
      title: "History Hunt",
      description: "Discover important historical landmarks on campus.",
      difficulty: "easy",
      solved: true,
    },
  ];

  // Sample data for teams
  const teams = [
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
  ];

  const handleCreateTeam = () => {
    console.log("Create Team clicked");
    // Implement the create team logic here
  };

  const handleDeleteTeam = () => {
    console.log("Delete Team clicked");
    // Implement the delete team logic here
  };

  const handleJoinTeam = () => {
    console.log("Join Team clicked");
    // Implement the join team logic here
  };

  const handleLeaveTeam = () => {
    console.log("Leave Team clicked");
    // Implement the leave team logic here
  };

  

  // Filter hunts based on solved status
  const solvedHunts = presetHunts.filter((hunt) => hunt.solved);
  const unsolvedHunts = presetHunts.filter((hunt) => !hunt.solved);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white shadow-lg">
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
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

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
                />
              ))
            ) : (
              <p className="text-gray-500">No solved hunts yet.</p>
            )}
          </div>
        </div>

        {/* Unsolved Hunts Section */}
        <div className="mt-6 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700">Unsolved Hunts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {unsolvedHunts.length > 0 ? (
              unsolvedHunts.map((hunt, index) => (
                <HuntCard
                  key={index}
                  title={hunt.title}
                  description={hunt.description}
                  difficulty={hunt.difficulty}
                  solved={hunt.solved}
                />
              ))
            ) : (
              <p className="text-gray-500">No unsolved hunts available.</p>
            )}
          </div>
        </div>

        {/* All Teams Section */}
        <div className="mt-6 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700">All Teams</h2>
          <nav className="mt-8">
          <ul className="space-y-2">
            <li>
              <button
                onClick={handleCreateTeam}
                className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all"
              >
                Create Team
              </button>
            </li>
            <li>
              <button
                onClick={handleDeleteTeam}
                className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
              >
                Delete Team
              </button>
            </li>
            <li>
              <button
                onClick={handleJoinTeam}
                className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
              >
                Join Team
              </button>
            </li>
            <li>
              <button
                onClick={handleLeaveTeam}
                className="w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-all"
              >
                Leave Team
              </button>
            </li>
            <li>
              
            </li>
          </ul>
        </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {teams.length > 0 ? (
              teams.map((team, index) => (
                <TeamCard
                  key={index}
                  name={team.name}
                  description={team.description}
                  members={team.members}
                  createdAt={team.createdAt}
                />
              ))
            ) : (
              <p className="text-gray-500">No teams available.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
