import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import RootLayout from './layouts/RootLayout';
import CourseDetails from './pages/courseDetails/CourseDetails';
import Courses from './pages/courses/Courses';
import NotFound from './pages/notfound/NotFound';
function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="courses">
          <Route index element={<Courses />} />
          <Route path="coursedetails/:courseId" element={<CourseDetails />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
