import React from "react";
import { Link } from "react-router-dom";
import { Course } from "../types/types";

const CourseCard: React.FC<Course> = ({ id, title, description, sections }) => {
    return (
        <Link
            to={`/courses/coursedetails/${id}`}
            className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 h-[16rem]"
        >
            <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

            <div className="sm:flex sm:justify-between sm:gap-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 sm:text-xl">{title}</h3>
                </div>
            </div>

            <div className="mt-4">
                <p className="text-sm text-pretty text-gray-500">{description}</p>
            </div>

            <div className="mt-6">
                <h4 className="text-md font-semibold text-gray-800">Sections:</h4>
                <ul className="list-disc list-inside mt-2 text-sm text-gray-600">
                    {sections.map((section, index) => (
                        <li key={index}>{section.head} ({section.content.length} videos)</li>
                    ))}
                </ul>
            </div>
        </Link>
    );
};


export default CourseCard;
