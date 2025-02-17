import React from "react";
import { ProgressBarProps } from "../types/types"
import { CircleArrowOutDownRight } from "lucide-react"
const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
    return (
        <div className="w-full bg-gray-200 rounded-full h-2 relative ">
            <CircleArrowOutDownRight className="absolute top-[-35px] text-gray-400 " style={{ left: `calc(${percentage}% - 28px)` }} />
            <div
                className="bg-[#6ABD8A] h-full text-white text-xs font-bold flex items-center justify-center rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
            >

            </div>
            <p className="text-[#485293] absolute mt-2" style={{ left: `calc(${percentage}% - 11px)` }}>{percentage}%</p>
        </div>
    );
};

export default ProgressBar;
