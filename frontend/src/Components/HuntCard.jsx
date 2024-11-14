import React from 'react';

const HuntCard = ({ title, host, description, difficulty, questionsCount, solved }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white mt-1 transition-transform transform hover:scale-105 duration-300">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">
                    Host: {host}
                </p>
                <p className="text-gray-600 text-sm mb-4">{description}</p>
                {/* <p className="text-gray-600 text-sm">Difficulty: <span className={`font-semibold ${difficulty === "easy" ? "text-green-500" : difficulty === "medium" ? "text-yellow-500" : "text-red-500"}`}>{difficulty}</span></p>
                <p className="text-gray-600 text-sm">Questions: {questionsCount} | Solved: {solved}</p> */}
            </div>
            
        </div>
    );
};

export default HuntCard;
