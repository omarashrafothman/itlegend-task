import { useState, useEffect } from "react";
import { AccordionProps } from "../types/types"
import { Newspaper, LockKeyhole } from "lucide-react";

const Accordion = ({ section, onVideoSelect }: AccordionProps) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [isLargeScreen, setIsLargeScreen] = useState<boolean>(window.innerWidth >= 1024);


    useEffect(() => {
        const handleResize = () => {
            const isLarge = window.innerWidth >= 1024;
            setIsLargeScreen(isLarge);
            if (isLarge) {
                setActiveIndex(null);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleAccordion = (index: number) => {
        if (!isLargeScreen) {
            setActiveIndex(prevIndex => (prevIndex === index ? null : index));
        }
    };

    return (
        <div className="max-w-lg mx-auto   ">
            {section.map((item, index) => (
                <div key={index} className="mb-5 sm:mb-16 border border-gray-300 rounded-sm" >

                    <button
                        onClick={() => toggleAccordion(index)}
                        className="w-full flex justify-between items-center py-5 px-4 text-gray-800  "
                    >
                        <span>{item.head}</span>
                        {!isLargeScreen && (
                            <span className="text-gray-800 transition-transform duration-300">
                                {activeIndex === index ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="w-4 h-4"
                                    >
                                        <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="w-4 h-4"
                                    >
                                        <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                                    </svg>
                                )}
                            </span>
                        )}
                    </button>

                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isLargeScreen || activeIndex === index
                            ? "max-h-96 py-2"
                            : "max-h-0"
                            }`}
                    >
                        <div className="px-4  text-sm mb-6">
                            <ul className="list-disc list-inside">
                                {item.content.map((contentItem, i) => (
                                    <button key={i} className="justify-between items-center py-3 flex border-b border-b-gray-300 w-full cursor-pointer" onClick={() => onVideoSelect({ sectionIndex: index, videoIndex: i })}>
                                        <span className="flex gap-2 items-center">
                                            <Newspaper className="w-4 h-4" />
                                            <p className="text-sm">{contentItem.title}</p>
                                        </span>
                                        <span>
                                            {!contentItem.available ?
                                                <LockKeyhole className="w-4 h-4" />
                                                : ""}
                                        </span>
                                    </button>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Accordion;
