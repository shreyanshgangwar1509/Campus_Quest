import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-cover bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 animate-gradient-x overflow-hidden">
      <style>
        {`
          @keyframes gradient-x {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          @keyframes pulse-bg {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-8px);
            }
          }
        `}
      </style>
      
      <header className="text-center bg-gradient-to-r from-pink-400 to-pink-300 text-white p-6 rounded-lg shadow-lg w-11/12 max-w-2xl mt-8 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-pulse-bg">
        <div className="flex justify-center mb-4 animate-float">
          <img
            src="https://res.cloudinary.com/djikufwbv/image/upload/v1731092337/rqiw7hvrvtmbvojefum4.webp"
            alt="Scavenger Hunt Logo"
            className="w-24 transition-transform duration-500 ease-in-out hover:rotate-6 hover:scale-125"
          />
        </div>
        <h1 className="text-3xl font-bold mb-2 tracking-wide animate-pulse">
          Discover Your Campus Adventure!
        </h1>
        <p className="text-lg transition-opacity duration-500 ease-in-out hover:opacity-80">
          Join in, explore, and unlock campus secrets.
        </p>
      </header>

      <main className="flex flex-col items-center gap-8 w-11/12 max-w-2xl mt-6">
        <section className="bg-gradient-to-br from-pink-200 to-blue-200 p-6 rounded-lg shadow-lg text-center w-full transform transition duration-500 hover:scale-105 hover:shadow-2xl">
          <Link to="/allhunts" className="text-2xl font-semibold text-gray-800 mb-2 animate-float">
            Start Your Adventure
          </Link>
        </section>

        <section className="w-full">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center animate-bounce">
            Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-100 to-pink-100 p-4 rounded-lg shadow-lg text-center font-bold text-gray-800 transition-transform duration-500 hover:scale-110 hover:shadow-xl animate-float">
              🕵️ Discover hidden spots and campus landmarks
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-pink-100 p-4 rounded-lg shadow-lg text-center font-bold text-gray-800 transition-transform duration-500 hover:scale-110 hover:shadow-xl animate-float">
              📜 Solve riddles based on campus history
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-pink-100 p-4 rounded-lg shadow-lg text-center font-bold text-gray-800 transition-transform duration-500 hover:scale-110 hover:shadow-xl animate-float">
              📸 Complete challenges and earn rewards
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-pink-100 p-4 rounded-lg shadow-lg text-center font-bold text-gray-800 transition-transform duration-500 hover:scale-110 hover:shadow-xl animate-float">
              🎉 Compete with friends and faculty members
            </div>
          </div>
        </section>
      </main>
      <Link to="/eventform"
      
      className="px-6 py-3 bg-gradient-to-r from-green-400 mt-4 to-green-500 text-white font-semibold rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
    >
      Sponsor an Event
    </Link>
      <footer className="text-center bg-gradient-to-r from-blue-300 to-blue-500 text-white p-4 rounded-lg shadow-lg w-11/12 max-w-2xl mt-8 mb-4 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
        <p className="animate-pulse">
          Happy hunting! Explore and experience your college like never before.
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
