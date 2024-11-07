import React from 'react';
import { useNavigate } from 'react-router-dom';
import HuntCard from './HuntCard';


const Allhunts = () => {
   
    // Sample data for hunts
    const hunts = [
    {
        title: "Treasure Hunt",
        host: "John Doe",
        description: "Join us for an exciting treasure hunt around the campus!",
        difficulty: "medium",
        questionsCount: 4,
        solved: 0,
        questions: [
            {
                question: "What building on campus has the tallest clock tower?",
                answer: "Clock Tower Building",
                hint: "It's visible from most parts of campus and helps everyone keep track of time."
            },
            {
                question: "Find the oldest tree on campus. What type of tree is it?",
                answer: "Oak",
                hint: "It's a type of tree known for its strength and longevity."
            },
            {
                question: "Which room number holds the hidden map?",
                answer: "101",
                hint: "It’s in the building where freshmen often have their orientation."
            },
            {
                question: "Locate the sculpture of the founder of the campus. What is the founder holding?",
                answer: "A book",
                hint: "It symbolizes knowledge and education."
            }
        ]
    },
    {
        title: "Mystery Challenge",
        host: "Jane Smith",
        description: "Solve the mysteries before time runs out!",
        difficulty: "hard",
        questionsCount: 6,
        solved: 0,
        questions: [
            {
                question: "What item is hidden in the library's restricted section?",
                answer: "Ancient manuscript",
                hint: "It's an old document with historical significance."
            },
            {
                question: "Find the professor known for their unusual pet. What type of pet is it?",
                answer: "Owl",
                hint: "This pet is usually nocturnal and symbolizes wisdom."
            },
            {
                question: "Where can you find the hidden key to the mystery box?",
                answer: "Under the staircase",
                hint: "It’s hidden in a place you often pass by but rarely look under."
            },
            {
                question: "Identify the name of the painting that hides a secret message.",
                answer: "The Silent Forest",
                hint: "It's a landscape painting that looks calm but holds secrets."
            },
            {
                question: "Who left a hidden note in the chemistry lab?",
                answer: "Professor White",
                hint: "This professor often works with elements and compounds."
            },
            {
                question: "Which object in the main hall is rumored to be haunted?",
                answer: "The grand piano",
                hint: "People claim they hear music from it at night, even when no one is around."
            }
        ]
    },
    {
        title: "Quiz Show",
        host: "Mr. Quizmaster",
        description: "Test your knowledge in our quiz show competition.",
        difficulty: "easy",
        questionsCount: 5,
        solved: 0,
        questions: [
            {
                question: "What is the capital of France?",
                answer: "Paris",
                hint: "It's known as the City of Lights."
            },
            {
                question: "What is the largest planet in our solar system?",
                answer: "Jupiter",
                hint: "It's a gas giant and has a famous red spot."
            },
            {
                question: "Who wrote 'Romeo and Juliet'?",
                answer: "William Shakespeare",
                hint: "He’s often called England’s national poet."
            },
            {
                question: "What element does 'O' represent on the periodic table?",
                answer: "Oxygen",
                hint: "It's essential for breathing."
            },
            {
                question: "What is the boiling point of water in Celsius?",
                answer: "100",
                hint: "It's the same as the number for 'century.'"
            }
        ]
    }
    ];

    const Navigate = useNavigate();

    
    

    return (
        <div className="flex flex-wrap justify-center p-6 gap-3">
            {hunts.map((hunt, index) => (
                <div class="flex flex-col h-full">
                    <HuntCard key={index} {...hunt} />
                    <a  class="px-5 py-2.5 font-medium text-center bg-zinc-300 mt-1 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm">
                        <button onClick={() => {
                            
                            Navigate(`/currenthunt` , {state:{hunt}});
                        }}>Join Hunt </button>
                    </a>
                </div>

                
                
            ))}

            
            
        </div>
    );
};

export default Allhunts;
