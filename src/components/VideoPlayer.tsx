import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { Progress, VideoPlayerProps } from "../types/types";



const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
    const [watched, setWatched] = useState<boolean>(() => {
        const storedData = JSON.parse(localStorage.getItem("watchedVideos") || "{}");
        return video.id ? storedData[video.id] || false : false;
    });

    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
    const playerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (isMobile && playerRef.current) {
            playerRef.current.classList.add("sticky", "top-0", "z-50", "bg-white", "shadow-md");
        } else if (playerRef.current) {
            playerRef.current.classList.remove("sticky", "top-0", "z-50", "bg-white", "shadow-md");
        }
    }, [isMobile]);


    const handleProgress = (progress: Progress) => {
        if (progress.played >= 0.8 && !watched && video.id) {
            setWatched(true);
            const storedData = JSON.parse(localStorage.getItem("watchedVideos") || "{}");
            const updatedWatched = { ...storedData, [video.id]: true };
            localStorage.setItem("watchedVideos", JSON.stringify(updatedWatched));
        }
    };

    return (
        <div className=" w-full h-full  " ref={playerRef} >
            <h2 className="text-lg font-semibold flex items-center">

                {watched && <span className="ml-2 text-green-600 text-sm font-bold">(Watched ✅)</span>}
            </h2>
            <ReactPlayer
                url={video.url}
                controls
                width="100%"
                height="100%"
                onProgress={handleProgress}
            />
        </div>
    );
};

export default VideoPlayer;
