import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import QuestionDisplay from './QuestionDisplay';
import Clock from './Clock';


function CurrentHunt() {
    const location = useLocation();
    const { hunt } = location.state || {};
    
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [wrongAttempts, setWrongAttempts] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isHuntComplete, setIsHuntComplete] = useState(false); // To track if the hunt is complete

    useEffect(() => {
        // Start time when component mounts
        const start = new Date();
        setStartTime(start);

        // Set an interval to update elapsed time every second
        const timer = setInterval(() => {
            if (startTime) {
                const currentTime = Math.floor((new Date() - startTime) / 1000);
                setElapsedTime(currentTime);
            }
        }, 1000);

        // Clear the timer when the component unmounts
        return () => clearInterval(timer);
    }, [startTime]);

    const handleAnswerSubmit = (userAnswer) => {
        if (userAnswer.toLowerCase() === hunt.questions[currentQuestionIndex].answer.toLowerCase()) {
            alert("Correct answer!");
            setCurrentQuestionIndex(prevIndex => prevIndex + 1); // Move to next question
            setWrongAttempts(0); // Reset wrong attempts
            
            // Check if hunt is complete
            if (currentQuestionIndex + 1 === hunt.questions.length) {
                setIsHuntComplete(true);
            }
        } else {
            alert("Try again!");
            setWrongAttempts(prevAttempts => prevAttempts + 1); // Increment wrong attempts
        }
    };

    // Function to format elapsed time in mm:ss
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };
    
    

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
            {hunt ? (
                <>
                    <h1 className="text-2xl font-bold mb-4">{hunt.title}!</h1>
                    <p className="text-gray-700 mb-4">Difficulty: {hunt.difficulty}</p>

                    {/* Display the stopwatch */}
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">Elapsed Time:</h2>
                        <p className="text-gray-800">{formatTime(elapsedTime)}</p>
                    </div>

                    {currentQuestionIndex < hunt.questions.length ? (
                        <QuestionDisplay 
                            questionData={hunt.questions[currentQuestionIndex]} 
                            onSubmit={handleAnswerSubmit} 
                            wrongAttempts={wrongAttempts}
                        />
                    ) : (
                        <div>
                            <p className="text-green-500">Congratulations! You've completed the hunt!</p>
                            <p>Total Time: {formatTime(elapsedTime)}</p>
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
