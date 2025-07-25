import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTags = (tagToRemove) => {
    setTags(tags.filter(tags => tags != tagToRemove))
  }

  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center  gap-2 flex-wrap mt-2 ">
          {tags.map((item, idx) => (
            <span key={idx} className="flex items-center justify-center gap-2 text-sm font-medium text-slate-900 bg-slate-100 px-3 py-2 rounded">
              #{item}
              <button className="" onClick={() => {handleRemoveTags(item)}}>
                <MdClose className="" />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-4 mt-4">
        <input
          className="text-sm bg-transparent border px-3 py-2 rounded outline-0"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Add Tags"
        />
        <button
          onClick={() => addNewTag()}
          className="w-8 h-8 flex items-center justify-center border border-blue-700 hover:bg-blue-700 rounded cursor-pointer"
        >
          <MdAdd className="text-2xl text-blue-700 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
