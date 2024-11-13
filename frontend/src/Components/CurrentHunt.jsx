import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import HuntTimer from './HuntTimer';
import Map from './Map';
import QuestionDisplay from './QuestionDisplay';

function CurrentHunt() {
    const location = useLocation();
    const hunt = location.state || {};
    console.log(hunt);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [wrongAttempts, setWrongAttempts] = useState(0);
    const [isHuntComplete, setIsHuntComplete] = useState(false);
    const [isMapVisible, setIsMapVisible] = useState(false); // Manage map visibility

    const handleAnswerSubmit = (userAnswer) => {
        if (userAnswer.toLowerCase() === hunt.Answers[currentQuestionIndex].toLowerCase()) {
            alert("Correct answer!");
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // Move to next question
            setWrongAttempts(0); // Reset wrong attempts

            // Check if hunt is complete
            if (currentQuestionIndex + 1 === hunt.Questions.length) {
                setIsHuntComplete(true);
            }
        } else {
            alert("Try again!");
            setWrongAttempts((prevAttempts) => prevAttempts + 1); // Increment wrong attempts
        }
    };

    // Toggle Map visibility
    const toggleMapVisibility = () => {
        setIsMapVisible(!isMapVisible);
    };

    return (
        <div className={`p-6 w-md mx-auto   bg-white rounded-lg shadow-md relative w-full h-full`
} >
            <button
                        onClick={toggleMapVisibility}
                        className="bg-blue-500 text-white px-4 py-2 rounded-full mb-4"
                    >
                        {isMapVisible ? 'Close Map' : 'Open Map'}
                    </button>
            {isMapVisible && (
                        <div className="absolute w-[70%]  h-full top-0 right-0 p-4">
                            <Map />
                        </div>
                    )}
            {hunt ? (
                <>
                    <h1 className="text-2xl font-bold mb-4">{hunt.title}!</h1>
                    <p className="text-gray-700 mb-4">Difficulty: {hunt.difficulty}</p>

                    {/* Display the HuntTimer component */}
                    <HuntTimer isActive={!isHuntComplete} />

                    {currentQuestionIndex < hunt.Questions.length ? (
                        <QuestionDisplay 
                            questionData={hunt.Questions[currentQuestionIndex]} 
                            Hint={hunt.Hint1[currentQuestionIndex]}
                            onSubmit={handleAnswerSubmit} 
                            wrongAttempts={wrongAttempts}
                        />
                    ) : (
                        <div>
                            <p className="text-green-500">Congratulations! You've completed the hunt!</p>
                        </div>
                    )}
                </>
            ) : (
                <p className="text-red-500">Hunt not found.</p>
            )}
        </div>
    );
}

export default CurrentHunt;
