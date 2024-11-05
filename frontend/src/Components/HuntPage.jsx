import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import HuntForm from './HuntForm';
import HuntTimer from './HuntTimer';



const HuntPage = ({ hunt }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/createhunt');  // Navigate to the HuntForm route
    };
    const [isHuntActive, setHuntActive] = useState(false);
    const [score, setScore] = useState(0);
    const [remainingTime, setRemainingTime] = useState(60 * 60); // Example: 1 hour in seconds
    const [usedHints, setUsedHints] = useState(0);
    //const [hints, setHints] = useState(hunt.hints); // Assuming hunt object has hints
    const [visibleHints, setVisibleHints] = useState([]); // To track which hints have been shown

    useEffect(() => {
        let timer;
        if (isHuntActive) {
            timer = setInterval(() => {
                setRemainingTime((prevTime) => prevTime - 1); // Decrement time every second
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isHuntActive]);

    const handleStartHunt = () => {
        setHuntActive(true);
        setScore(0);
        setRemainingTime(60 * 60); // Reset time for a new hunt
        setUsedHints(0);
        setVisibleHints([]); // Reset visible hints
    };

    const handleEndHunt = () => {
        setHuntActive(false);
        // Logic to save score and time to the backend if needed
    };

    const handleUseHint = () => {
        // if (usedHints < hints.length) {
        //     setVisibleHints((prev) => [...prev, hints[usedHints]]); // Show the next hint
        //     setScore((prev) => prev - 10); // Deduct points for using a hint
        //     setRemainingTime((prev) => prev + 600); // Add 10 minutes in seconds
        //     setUsedHints((prev) => prev + 1); // Increment used hints
        // }
    };

    return (
        <div className="p-6">
            {/* <h1 className="text-2xl font-bold">{hunt.title}</h1> */}
            <button
                onClick={isHuntActive ? handleEndHunt : handleStartHunt}
                className={`mt-4 px-4 py-2 rounded ${isHuntActive ? 'bg-red-500' : 'bg-green-500'} text-white`}
            >
                {isHuntActive ? 'End Hunt' : 'Start Hunt'}
            </button>

            <HuntTimer remainingTime={remainingTime} />
            <div className="mt-4">
                <h2 className="text-lg font-bold">Score: {score}</h2>
                <button onClick={handleUseHint} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                    Use Hint
                </button>
            </div>

            {visibleHints.length > 0 && (
                <div className="mt-4">
                    <h3 className="font-semibold">Hints:</h3>
                    {visibleHints.map((hint, index) => (
                        <p key={index} className="bg-gray-200 p-2 rounded mt-2">
                            {hint}
                        </p>
                    ))}
                </div>
            )}

            {/* <Leaderboard huntId={hunt._id} /> */}
            <button className="bg-blue-500 mt-6 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClick}>
                Add New Hunt 
            </button>

            <Routes>
                    <Route path="/HuntForm" element={<HuntForm />} />
                    {/* Other routes can go here */}
            </Routes>

        </div>
    );
};

export default HuntPage;
