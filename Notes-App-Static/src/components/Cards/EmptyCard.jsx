import React from "react";
import { Link } from "react-router-dom";
import { MdNoteAdd } from "react-icons/md";

export default function EmptyCard() {
  return (
    <div className="w-full flex items-center justify-center h-full  rounded-xl p-10 shadow-inner">
      <div className="text-center text-black">
        <MdNoteAdd className="mx-auto text-6xl text-black mb-4 animate-pulse" />
        <h2 className="text-3xl md:text-4xl font-bold">No Notes Yet</h2>
        <p className="text-lg mt-2 mb-6 max-w-sm mx-auto text-slate-700">
          Looks like you haven’t created any notes yet. Start capturing your thoughts now.
        </p>
        <Link
          to="/dashboard"
          className="inline-block px-6 py-3 bg-white text-black font-semibold rounded-full shadow-md hover:bg-slate-100 transition-all duration-300"
        >
          Click on the + icon to create
        </Link>
      </div>
    </div>
  );
}
