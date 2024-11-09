import React, { useState } from 'react';

function PhotoChallengeForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    questions: [{ questionText: '', answerImage: null }],
  });

  // Update form field values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle dynamic question fields
  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index].questionText = value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  // Handle image uploads for each question
  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index].answerImage = file ? URL.createObjectURL(file) : null;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  // Add a new question field
  const addQuestion = () => {
    setFormData({ 
      ...formData, 
      questions: [...formData.questions, { questionText: '', answerImage: null }]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      questions: [{ questionText: '', answerImage: null }],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Create Photo Challenge</h2>

      <label className="block text-sm font-medium text-gray-700">Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded-md border-gray-300"
      />

      <label className="block text-sm font-medium text-gray-700">Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded-md border-gray-300"
      />

      <label className="block text-sm font-medium text-gray-700">Start Date</label>
      <input
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded-md border-gray-300"
      />

      <label className="block text-sm font-medium text-gray-700">End Date</label>
      <input
        type="date"
        name="endDate"
        value={formData.endDate}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded-md border-gray-300"
      />

      <label className="block text-sm font-medium text-gray-700">Questions</label>
      {formData.questions.map((question, index) => (
        <div key={index} className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={question.questionText}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
              required
              className="flex-grow p-2 border rounded-md border-gray-300"
            />
            {formData.questions.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  const updatedQuestions = [...formData.questions];
                  updatedQuestions.splice(index, 1);
                  setFormData({ ...formData, questions: updatedQuestions });
                }}
                className="px-2 py-1 text-white bg-red-500 rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            )}
          </div>

          <label className="block text-sm font-medium text-gray-700">Upload Image for Answer</label>
          <input
            type="file"
            onChange={(e) => handleImageUpload(index, e)}
            className="w-full p-2 border rounded-md border-gray-300"
            required
          />

          {question.answerImage && (
            <div className="flex flex-wrap gap-2 mt-2">
              <img
                src={question.answerImage}
                alt={`Answer ${index}`}
                className="h-20 w-20 object-cover border rounded-md"
              />
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addQuestion}
        className="px-2 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Add Question
      </button>

      <button
        type="submit"
        className="w-full py-2 mt-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
      >
        Submit Photo Challenge
      </button>
    </form>
  );
}

export default PhotoChallengeForm;
