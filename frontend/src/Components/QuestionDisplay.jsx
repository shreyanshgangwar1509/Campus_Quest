import React, { useState } from 'react';

function QuestionDisplay({ questionData,answerdata,Hint,curr, onSubmit, wrongAttempts }) {
    const [userAnswer, setUserAnswer] = useState('');
    const [showHint, setShowHint] = useState(false);

    const handleAnswerSubmit = () => {
        onSubmit(userAnswer.trim());
    };

    return (
        <div>
            <p className="font-semibold mb-2">Question:</p>
            <p className="text-gray-800 mb-4">{questionData}</p>

            <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer"
                className="w-full p-2 mb-4 border rounded"
            />
            
            <button
                onClick={handleAnswerSubmit}
                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 mb-2"
            >
                Submit Answer
            </button>

            <button
                onClick={() => setShowHint(!showHint)}
                className="ml-2 px-3 py-1 text-sm bg-gray-300 rounded hover:bg-gray-400"
            >
                {showHint ? "Hide Hint" : "Show Hint"}
            </button>

            {showHint && (
                <p className="text-sm text-gray-600 mt-2">Hint: {Hint}</p>
            )}

            {wrongAttempts > 0 && (
                <p className="text-red-500 mt-2">Wrong Attempts: {wrongAttempts}</p>
            )}
        </div>
    );
}

export default QuestionDisplay;
