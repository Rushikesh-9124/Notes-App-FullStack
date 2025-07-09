import React from "react";
import {FaMagnifyingGlass} from 'react-icons/fa6'
import {IoMdClose} from 'react-icons/io'

const Searchbar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-40 sm:w-50 md:w-60 lg:w-80 border px-4 bg-slate-100 rounded-lg flex items-center gap-2">
      <input 
        type="text" 
        placeholder="Search Notes"
        value={value}
        
        onChange={onChange}
        className="w-full bg-transparent text-xs sm:text-sm py-[6px] outline-0"
      />
      {value && <IoMdClose className="text-xl cursor-pointer text-slate-500 hover:text-black mr-1" size={22} onClick={onClearSearch}/>}
      <FaMagnifyingGlass className="text-slate-400 cursor-pointer hover:text-black" size={22} onClick={handleSearch}/>
    </div>
  );
};

export default Searchbar;
