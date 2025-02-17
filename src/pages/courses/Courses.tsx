import courses from "../../locals/courses.json";
import CourseCard from "../../components/CourseCard";
import { Course } from "../../types/types";

const Courses = () => {
    const formattedCourses: Course[] = courses.map(course => ({
        id: course.id,
        title: course.title,
        author: course.author,
        image: course.image,
        description: course.description,
        publishedDate: course.publishedDate,
        duration: course.duration,
        comments: course.comments,
        sections: course.sections,
        modules: course.sections.map((section, index) => ({
            id: index + 1,
            title: section.head,
            lessons: section.content.map((video, lessonIndex) => ({
                id: lessonIndex + 1,
                title: video.title,
                url: video.url,
            }))
        }))
    }));

    return (
        <div>
            <h1 className="text-2xl font-bold text-center my-6">Available Courses</h1>
            <div className="w-[90%] mx-auto">
                <div className="flex justify-between items-center flex-wrap gap-4 my-7">
                    {formattedCourses.length > 0 ? (
                        formattedCourses.map((course) => (
                            <div key={course.id} className="courseCardContainer sm:w-[30%] w-full  mb-5 flex-wrap">
                                <CourseCard {...course} />
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center w-full">No courses available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Courses;
