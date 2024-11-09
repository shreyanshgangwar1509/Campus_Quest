import React, { useState } from 'react';

function EventForm() {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: 'Workshop',
    sponsors: [],
  });

  const [showSponsorFields, setShowSponsorFields] = useState(false);
  const [sponsorData, setSponsorData] = useState({
    name: '',
    address: '',
    contact: '',
    category: '',
    description: '',
    images: [],
  });

  // Handle event form data changes
  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  // Handle sponsor form data changes
  const handleSponsorChange = (e) => {
    const { name, value } = e.target;
    setSponsorData({ ...sponsorData, [name]: value });
  };

  // Handle image uploads for sponsor
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file)); // Preview images

    setSponsorData({ ...sponsorData, images: imageUrls });
  };

  // Submit the form
  const handleSubmit = (e) => {// i have made the fields empty once you hit submit again 
    e.preventDefault();
    console.log('Event Data:', eventData);
    if (showSponsorFields) {
      console.log('Sponsor Data:', sponsorData);
      }

    // to empty the filds 
    setEventData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      category: 'Workshop',
      sponsors: [],
    });
    
    setSponsorData({
      name: '',
      address: '',
      contact: '',
      category: '',
      description: '',
      images: [],
    });

    setShowSponsorFields(false); 
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Create an Event</h2>

      <label className="block text-sm font-medium text-gray-700">Title</label>
      <input
        type="text"
        name="title"
        value={eventData.title}
        onChange={handleEventChange}
        required
        className="w-full p-2 border rounded-md border-gray-300"
      />

      <label className="block text-sm font-medium text-gray-700">Description</label>
      <textarea
        name="description"
        value={eventData.description}
        onChange={handleEventChange}
        required
        className="w-full p-2 border rounded-md border-gray-300"
      />

      <label className="block text-sm font-medium text-gray-700">Date</label>
      <input
        type="date"
        name="date"
        value={eventData.date}
        onChange={handleEventChange}
        required
        className="w-full p-2 border rounded-md border-gray-300"
      />

      <label className="block text-sm font-medium text-gray-700">Time</label>
      <input
        type="time"
        name="time"
        value={eventData.time}
        onChange={handleEventChange}
        required
        className="w-full p-2 border rounded-md border-gray-300"
      />

      <label className="block text-sm font-medium text-gray-700">Location</label>
      <input
        type="text"
        name="location"
        value={eventData.location}
        onChange={handleEventChange}
        required
        className="w-full p-2 border rounded-md border-gray-300"
      />

      <label className="block text-sm font-medium text-gray-700">Category</label>
      <select
        name="category"
        value={eventData.category}
        onChange={handleEventChange}
        required
        className="w-full p-2 border rounded-md border-gray-300"
      >
        <option value="Workshop">Workshop</option>
        <option value="Seminar">Seminar</option>
        <option value="Sports">Sports</option>
        <option value="Cultural">Cultural</option>
        <option value="Other">Other</option>
      </select>

      <button
        type="button"
        onClick={() => setShowSponsorFields(!showSponsorFields)}
        className="w-full bg-blue-500 text-white p-2 rounded-md mt-4"
      >
        {showSponsorFields ? 'Remove Sponsor' : 'Add Sponsor'}
      </button>

      {showSponsorFields && (
        <div className="mt-6 space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Sponsor Details</h3>

          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={sponsorData.name}
            onChange={handleSponsorChange}
            required
            className="w-full p-2 border rounded-md border-gray-300"
          />

          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={sponsorData.address}
            onChange={handleSponsorChange}
            required
            className="w-full p-2 border rounded-md border-gray-300"
          />

          <label className="block text-sm font-medium text-gray-700">Contact</label>
          <input
            type="text"
            name="contact"
            value={sponsorData.contact}
            onChange={handleSponsorChange}
            className="w-full p-2 border rounded-md border-gray-300"
          />

          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={sponsorData.category}
            onChange={handleSponsorChange}
            className="w-full p-2 border rounded-md border-gray-300"
          />

          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={sponsorData.description}
            onChange={handleSponsorChange}
            className="w-full p-2 border rounded-md border-gray-300"
          />

          <label className="block text-sm font-medium text-gray-700">Images</label>
          <input
            type="file"
            name="images"
            onChange={handleImageUpload}
            multiple
            className="w-full p-2 border rounded-md border-gray-300"
          />
          {/* Display image previews */}
          <div className="flex flex-wrap gap-2 mt-2">
            {sponsorData.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`preview ${index}`}
                className="h-20 w-20 object-cover border rounded-md"
              />
            ))}
          </div>
        </div>
      )}

      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-md mt-4">
        Submit Event
      </button>
    </form>
  );
}

export default EventForm;
