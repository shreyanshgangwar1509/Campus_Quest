import React from 'react';
import HuntCard from './HuntCard';


const DashboardPage = () => {
    // Sample data for hunts
    const hunts = [
        {
            title: "Treasure Hunt",
            host: "John Doe",
            description: "Join us for an exciting treasure hunt around the campus!",
            difficulty: "medium",
            questionsCount: 10,
            solved: 5,
        },
        {
            title: "Mystery Challenge",
            host: "Jane Smith",
            description: "Solve the mysteries before time runs out!",
            difficulty: "hard",
            questionsCount: 15,
            solved: 3,
        },
        {
            title: "Quiz Show",
            host: "Mr. Quizmaster",
            description: "Test your knowledge in our quiz show competition.",
            difficulty: "easy",
            questionsCount: 5,
            solved: 2,
        },
        // Add more hunts as needed
    ];

    return (
        <div className="flex flex-wrap justify-center p-6 bg-gray-100">
            {hunts.map((hunt, index) => (
                <HuntCard key={index} {...hunt} />
            ))}
        </div>
    );
};

export default DashboardPage;
