import React from 'react';

function Clock({ startDate, endDate }) {
    const calculateDifference = (start, end) => {
        const startTime = new Date(start).getTime();
        const endTime = new Date(end).getTime();
        const difference = endTime - startTime;

        if (difference < 0) return null; // Handle if endDate is before startDate

        const seconds = Math.floor((difference / 1000) % 60);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));

        return { days, hours, minutes, seconds };
    };

    const diff = calculateDifference(startDate, endDate);

    return (
        <div className="p-4 bg-gray-100 rounded-md shadow-md">
            {diff ? (
                <p className="text-lg">
                    Difference: {diff.days} days, {diff.hours} hours, {diff.minutes} minutes, and {diff.seconds} seconds.
                </p>
            ) : (
                <p className="text-red-500">End date must be after start date.</p>
            )}
        </div>
    );
}

export default Clock;
