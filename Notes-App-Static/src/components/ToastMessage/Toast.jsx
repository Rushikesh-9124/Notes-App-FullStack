import { LucideCheck, LucideDelete, Trash } from "lucide-react";
import React, { useEffect } from "react";

const Toast = ({ isShow, message, type, onClose }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 2000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [onClose]);
  return (
    <div
      className={`absolute top-20 right-6 transition-opacity duration-500  ${
        isShow
          ? "opacity-100 pointer-events-auto"
          : "hidden"
      }`}
    >
      <div
        className={`min-w-52 bg-white border shadow-2xl rounded-md relative overflow-hidden 
    after:h-full after:w-[5px] 
    ${type === "delete" ? "after:bg-red-500" : "after:bg-green-500"} 
    after:absolute after:left-0 after:top-0 after:rounded-l-lg`}
      >
        <div className="flex items-center py-2 gap-3 px-4">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              type === "delete" ? "bg-red-500" : "bg-green-50"
            }`}
          >
            {type === "delete" ? (
              <Trash className="text-xl text-white" />
            ) : (
              <LucideCheck className="text-xl text-green-500" />
            )}
          </div>
          <p className="text-sm text-slate-800">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Toast;
