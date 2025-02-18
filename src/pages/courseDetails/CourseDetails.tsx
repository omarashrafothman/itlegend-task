import { Link } from 'react-router-dom'
import Accordion from '../../components/Accordion'
import { VideoProps, VideoItem, Video } from "../../types/types";
import ProgressBar from '../../components/ProgressBar'
import { useLocation, useParams } from 'react-router-dom'
import { Facebook, Twitter, Linkedin, Youtube, Clock3, LibraryBig, User, Globe, MoveRight, ChevronRight } from 'lucide-react'
import VideoPlayer from "../../components/VideoPlayer"
import courses from "../../locals/courses.json";
import { Course } from "../../types/types"
import { useState, useEffect } from 'react'
import CommentItem from '../../components/CommentItem'

function CourseDetails() {
    const [courseItem, setCourseItem] = useState<Course | null>();
    const [currentVideoIndex, setCurrentVideoIndex] = useState({ sectionIndex: 0, videoIndex: 0 });
    const [currentVideo, setCurrentVideo] = useState<VideoItem | null>();
    const location = useLocation()
    const { courseId: id = "" } = useParams()
    const paths = location.pathname.split("/").filter(Boolean);

    useEffect(() => {
        const findById = (arr: Course[], id: number) => {
            return arr.find(item => item.id === id);
        };
        const result = findById(courses, +id);
        setCourseItem(result || null);
    }, [id]);

    const endedHandler = () => {
        const currentSection = courseItem?.sections?.[currentVideoIndex.sectionIndex];
        const currentSectionContent = currentSection?.content;
        const currentVideoID = currentSectionContent?.[currentVideoIndex.videoIndex].id;
        const lastSectionContentVideoID = currentSectionContent?.[currentSectionContent.length - 1].id;
        const isVideoLastInSection = currentVideoID === lastSectionContentVideoID;
        const isSectionLastSection = currentVideoIndex.sectionIndex + 1 === courseItem?.sections.length;
        console.log(isVideoLastInSection);

        if (!(isVideoLastInSection && isSectionLastSection)) setCurrentVideoIndex({
            sectionIndex: isVideoLastInSection ? currentVideoIndex.sectionIndex + 1 : currentVideoIndex.sectionIndex,
            videoIndex: isVideoLastInSection ? 0 : currentVideoIndex.videoIndex + 1
        })
    }

    useEffect(() => {
        setCurrentVideo(courseItem?.sections?.[currentVideoIndex.sectionIndex]?.content?.[currentVideoIndex.videoIndex] || null);
    }, [courseItem?.sections, currentVideoIndex.sectionIndex, currentVideoIndex.videoIndex]);

    return (
        <div>
            <div className='courseDetailsHead bg-slate-50 flex flex-col px-[38px] py-1 '>
                <div className='helmet'>
                    <div className="flex items-center text-sm">
                        <span>Home</span>
                        {paths.length > 0 && <ChevronRight className='text-gray-500 w-3 h-4 mx-1' />}
                        {paths.map((path, index) => {
                            const isLast = index === paths.length - 1;
                            return (
                                <span key={index} className="flex items-center">
                                    {index > 0 && <ChevronRight className='text-gray-500 w-3 h-4 mx-1' />}
                                    {isLast ? (
                                        <strong className='font-semibold'>{path.charAt(0).toUpperCase() + path.slice(1)}</strong>
                                    ) : (
                                        path.charAt(0).toUpperCase() + path.slice(1)
                                    )}
                                </span>
                            );
                        })}
                    </div>

                </div>
                <div className='mt-[10px]'>
                    <h2 className='font-semibold text-3xl'>{courseItem?.title}</h2>
                </div>

            </div>
            <div className='courseDetailsContent '>
                <div className='container w-[95%] mx-auto flex flex-wrap md:flex-nowrap justify-between'>


                    <div className='w-full md:w-[58%] flex flex-col py-3'>
                        <div className='videoFrame w-full h-[527px]  rounded-md'>
                            {currentVideo?.id && (
                                <VideoPlayer video={{ id: currentVideo?.id, url: currentVideo?.url || "", title: currentVideo?.title || "" }} handler={endedHandler} />
                            )}
                        </div>

                        <div className='socialLinks flex gap-5 mt-[40px]'>

                            <Link to="" className='rounded-full w-[45px] h-[45px] border border-gray-300 flex items-center justify-center '>
                                <Facebook className='text-gray-500 w-6 h-6' />
                            </Link>

                            <Link to="" className='rounded-full w-[45px] h-[45px] border border-gray-300 flex items-center justify-center'>
                                <Twitter className='text-gray-500 w-6 h-6' />
                            </Link>
                            <Link to="" className='rounded-full w-[45px] h-[45px] border border-gray-300 flex items-center justify-center'>
                                <Linkedin className='text-gray-500 w-6 h-6' />
                            </Link>
                            <Link to="" className='rounded-full w-[45px] h-[45px] border border-gray-300 flex items-center justify-center'>
                                <Youtube className='text-gray-500 w-6 h-6' />
                            </Link>
                        </div>

                        <div className='courseMaterial mt-[60px]'>
                            <h3 className='mb-[20px] font-semibold text-xl'>Course Materials</h3>
                            <div className='courseMartialsContent bg-white rounded-sm  shadow-[0px_0px_30px_0px_rgba(0,0,13,0.22)] py-[20px] px-[30px] flex justify-between w-full'>
                                <div className='sm:w-[40%] flex flex-col w-full'>
                                    <ul>
                                        <li className='flex justify-between items-center border-b border-b-gray-300 py-1 mb-2' >

                                            <span className=' text-gray-700 flex items-center'><Clock3 className='w-4 h-4 mr-2' />
                                                <p>Duration:</p>
                                            </span>
                                            <span>
                                                <p className='font-semibold text-gray-700'>{courseItem?.duration}</p>
                                            </span>
                                        </li>
                                        <li className='flex justify-between items-center border-b border-b-gray-300 py-1 mb-2' >
                                            <span className=' text-gray-700 flex items-center'><LibraryBig className='w-4 h-4 mr-2' />
                                                <p>Lessons:</p>
                                            </span>
                                            <span>
                                                <p className='font-semibold text-gray-700'>{courseItem?.sections[0].content.length}</p>
                                            </span>
                                        </li>
                                        <li className='flex justify-between items-center border-b border-b-gray-300 py-1 mb-2' >
                                            <span className=' text-gray-700 flex items-center'><User className='w-4 h-4 mr-2' />
                                                <p>Students:</p>
                                            </span>
                                            <span>
                                                <p className='font-semibold text-gray-700'>65 students</p>
                                            </span>
                                        </li>
                                        <li className='flex justify-between items-center border-b border-b-gray-300 py-1 mb-2' >
                                            <span className=' text-gray-700 flex items-center'><Globe className='w-4 h-4 mr-2' />
                                                <p>Language:</p>
                                            </span>
                                            <span>
                                                <p className='font-semibold text-gray-700'>English</p>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className='w-[40%] sm:flex flex-col hidden'>
                                    <ul>
                                        <li className='flex justify-between items-center border-b border-b-gray-300 py-1 mb-2' >
                                            <span className=' text-gray-700 flex items-center'><Clock3 className='w-4 h-4 mr-2' />
                                                <p>Duration:</p>
                                            </span>
                                            <span>
                                                <p className='font-semibold text-gray-700'>{courseItem?.duration}</p>
                                            </span>
                                        </li>
                                        <li className='flex justify-between items-center border-b border-b-gray-300 py-1 mb-2' >
                                            <span className=' text-gray-700 flex items-center'><LibraryBig className='w-4 h-4 mr-2' />
                                                <p>Lessons:</p>
                                            </span>
                                            <span>
                                                <p className='font-semibold text-gray-700'>{courseItem?.sections[0].content.length}</p>
                                            </span>
                                        </li>
                                        <li className='flex justify-between items-center border-b border-b-gray-300 py-1 mb-2' >
                                            <span className=' text-gray-700 flex items-center'><User className='w-4 h-4 mr-2' />
                                                <p>Students:</p>
                                            </span>
                                            <span>
                                                <p className='font-semibold text-gray-700'>65 students</p>
                                            </span>
                                        </li>
                                        <li className='flex justify-between items-center border-b border-b-gray-300 py-1 mb-2' >
                                            <span className=' text-gray-700 flex items-center'><Globe className='w-4 h-4 mr-2' />
                                                <p>Language:</p>
                                            </span>
                                            <span>
                                                <p className='font-semibold text-gray-700'>English</p>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className='comments mt-[60px] mb-10'>
                            <h3 className='mb-[20px] font-semibold text-xl'>Comments</h3>
                            <div className='flex flex-col w-full'>
                                {courseItem?.comments.map((comment) => (
                                    <CommentItem key={comment.comment} name={comment.name} avatar={comment.avatar} comment={comment.comment} date={comment.date} />
                                ))}
                            </div>
                        </div>
                        <div className='writeCommentForm'>
                            <form>
                                <textarea placeholder='Write a comment' className='p-3 rounded-sm shadow-[0px_0px_30px_0px_rgba(0,0,13,0.22)] w-full' cols={5} rows={5}></textarea>
                                <button className='cursor-pointer rounded-md py-3 px-4 bg-[rgba(65,182,157,255)] text-white flex items-center mt-5 mb-10'>Submit Review <MoveRight className='ml-2 text-white w-4 h-4' /></button>
                            </form>
                        </div>

                    </div>
                    <div className='courseCollectionsContainer w-full md:w-[38%]'>

                        <div className='courseCollections flex flex-col'>
                            <div className='courseCollectionItem pt-5'>
                                <h2 className='font-semibold text-xl'>Topics for This Course</h2>
                                <div className='w-[94%] mx-auto my-15'>
                                    <ProgressBar percentage={70} />
                                </div>
                                <Accordion
                                    section={courseItem?.sections?.map((section) => ({
                                        head: section.head,
                                        description: section.description || '',
                                        content: section.content.map((lesson) => ({
                                            title: lesson.title,
                                            available: lesson.available,
                                            id: lesson.id,
                                            url: lesson.url,
                                        }))
                                    })) ?? []}
                                    onVideoSelect={setCurrentVideoIndex}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetails