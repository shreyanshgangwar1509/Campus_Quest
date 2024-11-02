// data/presetHunts.js
const presetHunts = [
    {
        title: "Campus Treasure Hunt",
        description: "Explore the campus to find hidden treasures and solve clues.",
        questions: [
            "What is the name of the main library?",
            "How many floors does the Acadmics building have?",
            "Find the statue in the quad. What is it made of?"
        ],
        answers: [
            "Central Liberary",  // Replace with actual answers
            "3",
            "Material of Statue"
        ],
        hints: [
            "The library is named as cynnosure",
            "Look for the building with the big clock.",
            "The statue is made of metal with brown color."
        ],
        difficulty: "medium",
        solved: 0 // Initialize to 0 or appropriate number
    },
    {
        title: "Math Challenge Hunt",
        description: "Solve math-related challenges scattered across the campus.",
        questions: [
            "What is the derivative of x^2?",
            "Solve for x in the equation 2x + 3 = 11.",
            "What is the value of pi to three decimal places?"
        ],
        answers: [
            "2x",  // Replace with actual answers
            "4",
            "3.142"
        ],
        hints: [
            "Remember the basic rules of differentiation.",
            "Isolate x on one side of the equation.",
            "Pi is an irrational number."
        ],
        difficulty: "hard",
        solved: 0
    },
    {
        title: "History Hunt",
        description: "Discover important historical landmarks on campus.",
        questions: [
            "When was the university founded?",
            "Who was the first president of the university?",
            "Find the plaque commemorating the founding of the university."
        ],
        answers: [
            "1971",  // Replace with actual answers
            "First President",
            "Plaque Location"
        ],
        hints: [
            "The university was founded in the early 1900s.",
            "The first president was a notable figure in education.",
            "The plaque is located near the entrance."
        ],
        difficulty: "easy",
        solved: 0
    }
];

export default presetHunts;
