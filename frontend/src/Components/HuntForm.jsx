import React, { useState } from 'react';

function HuntForm() {
    const [title, setTitle] = useState('');
    const [host, setHost] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [questionsCount, setQuestionsCount] = useState(1);
    const [questions, setQuestions] = useState([{ question: '', answer: '' , Hint:'' }]);

    const handleQuestionsCountChange = (e) => {
        const count = parseInt(e.target.value, 10);
        setQuestionsCount(count);
        setQuestions(Array.from({ length: count }, () => ({ question: '', answer: '' , Hint :''})));
    };

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const huntData = { title, host, description, difficulty, questionsCount, questions };
        console.log(huntData); // For now, just log the data
        
        alert("Hunt created successfully!");
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Create Hunt</h2>
            <form onSubmit={handleSubmit}>

                <label className="block mb-2 font-semibold">Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mb-4 p-2 border w-full rounded"
                    required
                />

                <label className="block mb-2 font-semibold">Host:</label>
                <input
                    type="text"
                    value={host}
                    onChange={(e) => setHost(e.target.value)}
                    className="mb-4 p-2 border w-full rounded"
                    required
                />

                <label className="block mb-2 font-semibold">Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mb-4 p-2 border w-full rounded"
                    required
                />

                <label className="block mb-2 font-semibold">Difficulty:</label>
                <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="mb-4 p-2 border w-full rounded"
                    required
                >
                    <option value="">Select Difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>

                <label className="block mb-2 font-semibold">Number of Questions:</label>
                <input
                    type="number"
                    min="1"
                    value={questionsCount}
                    onChange={handleQuestionsCountChange}
                    className="mb-4 p-2 border w-full rounded"
                    required
                />

                {questions.map((q, index) => (
                    <div key={index} className="mb-6">
                        <label className="block font-semibold">Question {index + 1}:</label>
                        <input
                            type="text"
                            value={q.question}
                            onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                            className="mb-2 p-2 border w-full rounded"
                            required
                        />

                        <label className="block font-semibold">Answer {index + 1}:</label>
                        <input
                            type="text"
                            value={q.answer}
                            onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                            className="p-2 border w-full rounded"
                            required
                        />

                        <label className="block font-semibold">Hint {index + 1}:</label>
                        <input
                            type="text"
                            value={q.Hint}
                            onChange={(e) => handleQuestionChange(index, 'Hint', e.target.value)}
                            className="p-2 border w-full rounded"
                            required
                        />
                    </div>
                ))}

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                >
                    Create Hunt
                </button>
            </form>
        </div>
    );
}

export default HuntForm;
