
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-gray-800 via-gray-900 to-black p-6 shadow-lg">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-white tracking-tight">CareerAI</h1>
        <p className="text-blue-300">Your Personalized Career Companion</p>
      </div>
    </header>
  );
};

export default Header;
