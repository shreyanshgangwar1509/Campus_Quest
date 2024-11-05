import React from 'react';

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white py-4">
        <nav className="container mx-auto flex justify-between">
          <h1 className="text-2xl font-bold">My Application</h1>
          <ul className="flex space-x-4">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow container mx-auto p-4">
        <h2 className="text-3xl font-semibold text-center mb-6">Welcome to Our Home Page!</h2>
        <p className="text-lg text-center mb-4">
          This is a simple home page built with React and Tailwind CSS.
        </p>
        <p className="text-lg text-center">
          Here, you can find various resources and information about our services.
        </p>
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} My Application. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Home;
