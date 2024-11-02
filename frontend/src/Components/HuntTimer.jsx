import React, { useEffect, useState } from 'react';

const HuntTimer = ({ isActive }) => {
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        let timer;
        if (isActive) {
            setStartTime(Date.now());
            timer = setInterval(() => {
                setElapsedTime(Math.floor((Date.now() - startTime) / 1000)); // Time in seconds
            }, 1000);
        } else if (!isActive && startTime) {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [isActive, startTime]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const displaySeconds = seconds % 60;
        return `${minutes}m ${displaySeconds}s`;
    };

    return (
        <div className="mt-4 text-lg font-semibold">
            Time Elapsed: {formatTime(elapsedTime)}
        </div>
    );
};

export default HuntTimer;
