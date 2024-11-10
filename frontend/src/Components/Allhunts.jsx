import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HuntCard from './HuntCard';

import axios from 'axios';
import PhotoChallengeCard from './PhotoChallengeCard';

const api = axios.create({
  baseURL:'http://localhost:3000'
})

const Allhunts = () => {
  const [hunts, sethunts] = useState([]);
  const [challenge, setchallges] = useState([]);
  // Sample data for hunts
  const loadhunt = async () => {
    try {
      const response = await api.get(`/api/hunts/getallhunt`);
      console.log(response.data);
      
      sethunts(response.data);
    } catch (error) {
      console.log("Error in loading hunts");
    }
  }
  const loadphotohunt = async () => {
    try {
      const response = await api.get(`/api/photohunt/getallphotohunt`);
      console.log(response.data);
      
      setchallges(response.data);
    } catch (error) {
      console.log('Error in loading photo challenge');
    }
  }
  useEffect(() => {
    loadphotohunt();
    loadhunt();
  }, []);
    // const hunts = [
    // {
    //     title: "Treasure Hunt",
    //     host: "John Doe",
    //     description: "Join us for an exciting treasure hunt around the campus!",
    //     difficulty: "medium",
    //     questionsCount: 4,
    //     solved: 0,
    //     questions: [
    //         {
    //             question: "What building on campus has the tallest clock tower?",
    //             answer: "Clock Tower Building",
    //             hint: "It's visible from most parts of campus and helps everyone keep track of time."
    //         },
    //         {
    //             question: "Find the oldest tree on campus. What type of tree is it?",
    //             answer: "Oak",
    //             hint: "It's a type of tree known for its strength and longevity."
    //         },
    //         {
    //             question: "Which room number holds the hidden map?",
    //             answer: "101",
    //             hint: "It’s in the building where freshmen often have their orientation."
    //         },
    //         {
    //             question: "Locate the sculpture of the founder of the campus. What is the founder holding?",
    //             answer: "A book",
    //             hint: "It symbolizes knowledge and education."
    //         }
    //     ]
    // },
    // {
    //     title: "Mystery Challenge",
    //     host: "Jane Smith",
    //     description: "Solve the mysteries before time runs out!",
    //     difficulty: "hard",
    //     questionsCount: 6,
    //     solved: 0,
    //     questions: [
    //         {
    //             question: "What item is hidden in the library's restricted section?",
    //             answer: "Ancient manuscript",
    //             hint: "It's an old document with historical significance."
    //         },
    //         {
    //             question: "Find the professor known for their unusual pet. What type of pet is it?",
    //             answer: "Owl",
    //             hint: "This pet is usually nocturnal and symbolizes wisdom."
    //         },
    //         {
    //             question: "Where can you find the hidden key to the mystery box?",
    //             answer: "Under the staircase",
    //             hint: "It’s hidden in a place you often pass by but rarely look under."
    //         },
    //         {
    //             question: "Identify the name of the painting that hides a secret message.",
    //             answer: "The Silent Forest",
    //             hint: "It's a landscape painting that looks calm but holds secrets."
    //         },
    //         {
    //             question: "Who left a hidden note in the chemistry lab?",
    //             answer: "Professor White",
    //             hint: "This professor often works with elements and compounds."
    //         },
    //         {
    //             question: "Which object in the main hall is rumored to be haunted?",
    //             answer: "The grand piano",
    //             hint: "People claim they hear music from it at night, even when no one is around."
    //         }
    //     ]
    // },
    // {
    //     title: "Quiz Show",
    //     host: "Mr. Quizmaster",
    //     description: "Test your knowledge in our quiz show competition.",
    //     difficulty: "easy",
    //     questionsCount: 5,
    //     solved: 0,
    //     questions: [
    //         {
    //             question: "What is the capital of France?",
    //             answer: "Paris",
    //             hint: "It's known as the City of Lights."
    //         },
    //         {
    //             question: "What is the largest planet in our solar system?",
    //             answer: "Jupiter",
    //             hint: "It's a gas giant and has a famous red spot."
    //         },
    //         {
    //             question: "Who wrote 'Romeo and Juliet'?",
    //             answer: "William Shakespeare",
    //             hint: "He’s often called England’s national poet."
    //         },
    //         {
    //             question: "What element does 'O' represent on the periodic table?",
    //             answer: "Oxygen",
    //             hint: "It's essential for breathing."
    //         },
    //         {
    //             question: "What is the boiling point of water in Celsius?",
    //             answer: "100",
    //             hint: "It's the same as the number for 'century.'"
    //         }
    //     ]
    // }
    // ];

  //   const challenges = [
  //   {
  //     _id: '1',
  //     title: 'Sunset Photography',
  //     description: 'Capture the best sunset moment in your city.',
  //     startDate: '2024-11-10T00:00:00Z',
  //     endDate: '2024-11-20T23:59:59Z',
  //   },
  //   {
  //     _id: '2',
  //     title: 'Wildlife Wonders',
  //     description: 'Photograph any wildlife species in its natural habitat.',
  //     startDate: '2024-12-01T00:00:00Z',
  //     endDate: '2024-12-10T23:59:59Z',
  //   },
  //   {
  //     _id: '3',
  //     title: 'Urban Exploration',
  //     description: 'Explore your city’s streets and capture interesting urban shots.',
  //     startDate: '2024-12-15T00:00:00Z',
  //     endDate: '2024-12-25T23:59:59Z',
  //   },
  // ];


    const Navigate = useNavigate();

    

  const [showPhotoChallenge, setShowPhotoChallenge] = useState(true); // Toggle between Photo Challenge and Hunt

  return (
    <div className=" bg-[#181818] ">
      <nav className="bg-blue-600 p-1">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Left buttons */}
          <div className="flex space-x-4">
            <button
              onClick={() => setShowPhotoChallenge(true)}
              className="text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-500"
            >
              Photo Challenge
            </button>
            <button
              onClick={() => setShowPhotoChallenge(false)}
              className="text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-500"
            >
              Hunt Challenge
            </button>
          </div>
          {/* Right buttons */}
          <div className="flex space-x-4">
            <Link to="/photochallengeform" className="text-white font-semibold py-1 px-4 rounded-md bg-yellow-500">
              Create Photo Challenge
            </Link>
            <Link to="/createhunt" className="text-white font-semibold py-1 px-4 rounded-md bg-yellow-500 ">
              Create Hunt
            </Link>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto p-6">
        {showPhotoChallenge ? (
                <div className="flex flex-wrap justify-center">
                    {challenge.map((challenge) => (
                        <PhotoChallengeCard key={challenge._id} challenge={challenge} />
                    ))}
                </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {/* showing the hunts */}
            {hunts.map((hunt, index) => (
                <div className="  h-full gap-6">
                    <HuntCard key={index} {...hunt} />
                    
                    <div className='flex justify-center gap-3'>
                        
                            <button className="px-5 py-2.5 font-medium text-center bg-zinc-300 mt-1 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm" onClick={() => {
                                
                                Navigate(`/currenthunt` , { state: { huntId: hunt._id } });
                            }}>Join Hunt </button>
                        
                            <button className="px-5 py-2.5 font-medium text-center bg-zinc-300 mt-1 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm" onClick={() => {
                                
                                Navigate(`/leaderboard` , { state: { huntId: hunt._id } });
                            }}>Leaderboard </button>

                    </div> 
                </div>  
            ))}
          </div>
        )}
      </div>
    </div>
  );
}



    

  

export default Allhunts;


