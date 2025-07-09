import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";
const Notecard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  
  console.log(isPinned)

  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm text-black font-medium">{title}</h6>
          <span className="text-xs text-slate-500">{date}</span>
        </div>
        <MdOutlinePushPin
          className={`icon-btn hover:[#2b85ff] ${
            isPinned ? "text-[#2b85ff]" : "text-slate-300"
          }`}
          
          onClick={onPinNote}
        />
      </div>

      <p className="text-sm text-slate-800 mt-2">{content}</p>

      <div className="flex justify-between items-center mt-3">
        <div className="flex gap-2 flex-wrap">
          {tags.length > 0 &&
            tags.map((item, idx) => (
              <p
                key={idx}
                className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full"
              >
                #{item}
              </p>
            ))}
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <MdCreate
            className="icon-btn hover:text-green-600"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn hover:text-red-500"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Notecard;
