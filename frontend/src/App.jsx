import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';

import Footer from "./components/footer/footer";
import NavbarSection from './components/Home/NavbarSection'; 

// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PublicHome from './pages/PublicHome';
import PublicCourseDetails from './pages/PublicCourseDetails';
import StudentDashboard from './pages/student/Dashboard';
import StudentCourses from './pages/student/Courses';
import StudentCourseDetails from './pages/student/CourseDetails';
import StudentLesson from './pages/student/Lesson';
import StudentQuiz from './pages/student/Quiz';
import StudentChat from './pages/student/Chat';
import AdminDashboard from './pages/admin/Dashboard';
import AdminCourses from './pages/admin/Courses';
import AdminCreateCourse from './pages/admin/CreateCourse';
import AdminEditCourse from './pages/admin/EditCourse';
import AdminEditQuiz from './pages/admin/EditQuiz';
import AdminChat from './pages/admin/Chat';
import About from './pages/student/About';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import ContactUs from './pages/student/ContactUs';

function App() {
     useEffect(() => {
    AOS.init({ duration: 1000 }); 
  }, []);
  const location = useLocation();

  // Routes where footer should be hidden
  const hideFooterRoutes = ["/login", "/register", "/student/dashboard", "/student/courses", "/student/course", "/student/lesson", "/student/quiz", "/student/chat", "/admin/dashboard", "/admin/courses", "/admin/create-course", "/admin/course", "/admin/lesson", "/admin/chat"];
  const shouldHideFooter = hideFooterRoutes.some(route => location.pathname.includes(route));

  // Routes where navbar should be shown (only public pages)
  const showNavbarRoutes = ["/"]; 
  const shouldShowNavbar = showNavbarRoutes.includes(location.pathname);

  return (
    <div className="app min-h-screen w-full flex flex-col">
      {/* Show Navbar only on home page */}
     
      {/* Main content with flex-grow to push footer down */}
      <main className="grow bg-black h-full">
        <Routes>
          <Route path="/" element={<PublicHome />} />
          <Route path="/courseDetails/:id" element={<PublicCourseDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/about' element={<About/>} />
           <Route path='/contact_us' element={<ContactUs/>} />
          {/* Student Routes */}
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute requiredRole="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/courses"
            element={
              <ProtectedRoute requiredRole="student">
                <StudentCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/course/:id"
            element={
              <ProtectedRoute requiredRole="student">
                <StudentCourseDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/lesson/:id"
            element={
              <ProtectedRoute requiredRole="student">
                <StudentLesson />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/quiz/:id"
            element={
              <ProtectedRoute requiredRole="student">
                <StudentQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/chat"
            element={
              <ProtectedRoute requiredRole="student">
                <StudentChat />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/courses"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/create-course"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminCreateCourse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/course/:id/edit"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminEditCourse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/lesson/:lessonId/quiz"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminEditQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/chat"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminChat />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {/* Show Footer only on allowed pages */}
      {!shouldHideFooter && <Footer/>}

      <Toaster position="top-right" />
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </AuthProvider>
    </Router>
  );
}