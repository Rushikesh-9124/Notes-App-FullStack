import React from "react";
import { Link } from "react-router-dom";
import { MdNoteAdd } from "react-icons/md";
import Navbar from "./Navbar/Navbar"; 

const MainPage = () => {
  return (
    <div className="bg-white min-h-screen w-full">
      <Navbar />

      <div className="flex flex-col h-[90vh] items-center justify-center w-full px-5">
        <div className="text-center max-w-3xl w-[100%]">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#2b85ff] mb-4">
            Your Ideas, Organized.
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl mb-8">
            Take notes. Save thoughts. Boost productivity. Welcome to your
            ultimate note-taking companion.
          </p>
          <Link to="/login">
            <button className="bg-[#2b85ff] hover:bg-blue-600 text-white px-6 py-3 rounded-xl text-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-lg mx-auto">
              <MdNoteAdd className="text-2xl" />
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
