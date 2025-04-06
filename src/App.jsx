import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './App.css'

import Login from './components/Auth/Login.jsx';
import NotFound from './components/Auth/NotFound.jsx';
import UnAuthorize from './components/Auth/UnAuthorize.jsx';
import Register from './components/Auth/Register.jsx';
import Home from './components/student/pages/Home.jsx';
import Layout from './components/student/Layout.jsx';
import ProtectedRoute from './components/Auth/ProtectedRoute.jsx';
import StudentActivityHome from './components/student/pages/StudentActivityHome .jsx';
import { useAuthStore } from './store/authStore.js';
import StudentActivityDetails from './components/student/pages/StudentActivityDetails.jsx';
import SaMain from './components/SA/pages/SaMain.jsx';
import SaEvents from './components/SA/pages/SaEvents.jsx';
import SAHome from './components/SA/pages/SAHome.jsx';
import SaWorkshops from './components/SA/pages/SaWorkshops.jsx';
import SaTalks from './components/SA/pages/SaTalks.jsx';
import SaStudentActivities from './components/SA/pages/SaStudentActivities.jsx';
import SaCalendar from './components/SA/pages/SaCalendar.jsx';
import SaProfile from './components/SA/pages/SaProfile.jsx'; // Add this import
import { QueryClient, QueryClientProvider } from 'react-query';
import {Toaster} from 'react-hot-toast'
import ForgotPassword from './components/Auth/ForgetPassword.jsx';
import ResetCode from './components/Auth/RestCode.jsx';
import Profile from './components/student/pages/profile.jsx';
import Events from './components/student/pages/Events.jsx';
import Workshops from './components/student/pages/Workshops.jsx';
import Calendar from './components/student/pages/Calendar.jsx';
import Internships from './components/student/pages/Internships.jsx';

// 🔥 New AuthRoute Component
function AuthRoute({ children }) {
  const { currentUser } = useAuthStore();

  if (currentUser) {
    // Redirect based on user role
    return <Navigate to={currentUser.role === "StudentActivity" ? "/student-activity" : "/"} replace />;
  }

  return children;
}

function App() {
  const mainRoutes = {
    path: '',
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute requiredRole="Student"><Home /></ProtectedRoute> },
      { path: 'student-activities', element: <ProtectedRoute requiredRole="Student"><StudentActivityHome /></ProtectedRoute> },
      { path: 'profile', element: <ProtectedRoute requiredRole="Student"><Profile /></ProtectedRoute> },
      { path: 'calendar', element: <ProtectedRoute requiredRole="Student"><Calendar /></ProtectedRoute> },
      { path: 'events', element: <ProtectedRoute requiredRole="Student"><Events /></ProtectedRoute> },
      { path: 'workshops', element: <ProtectedRoute requiredRole="Student"><Workshops /></ProtectedRoute> },
      { path: 'interns', element: <ProtectedRoute requiredRole="Student"><Internships /></ProtectedRoute> },
      { path: 'studentactivity/:id', element: <ProtectedRoute requiredRole="Student"><StudentActivityDetails /></ProtectedRoute> },
    ],
  };

  const authRoutes = [
    { path: '*', element: <NotFound /> },  
    { path: '/unauthorized', element: <UnAuthorize /> }, 
    { path: 'register', element: <AuthRoute><Register /></AuthRoute> },
    { path: 'login', element: <AuthRoute><Login /></AuthRoute> },
    { path: '', element: <AuthRoute><Login /></AuthRoute> },
    { path: 'forget-password', element: <AuthRoute><ForgotPassword /></AuthRoute> },
    { path: 'reset-code', element: <AuthRoute><ResetCode /></AuthRoute> }
  ];

  const studentActivityRoutes = {
    path: 'student-activity',
    element: <ProtectedRoute requiredRole="StudentActivity"><SAHome /></ProtectedRoute>,
    children: [
      { index: true, element: <ProtectedRoute requiredRole="StudentActivity"><SaMain /></ProtectedRoute> },
      { path: 'events', element: <ProtectedRoute requiredRole="StudentActivity"><SaEvents /></ProtectedRoute> },
      { path: 'workshops', element: <ProtectedRoute requiredRole="StudentActivity"><SaWorkshops /></ProtectedRoute> },
      { path: 'talks', element: <ProtectedRoute requiredRole="StudentActivity"><SaTalks /></ProtectedRoute> },
      { path: 'calendar', element: <ProtectedRoute requiredRole="StudentActivity"><SaCalendar /></ProtectedRoute> },
      { path: 'student-activities', element: <ProtectedRoute requiredRole="StudentActivity"><SaStudentActivities /></ProtectedRoute> },
      { path: 'profile', element: <ProtectedRoute requiredRole="StudentActivity"><SaProfile /></ProtectedRoute> },
    ],
  };

  const routes = createBrowserRouter([mainRoutes, studentActivityRoutes, ...authRoutes]);
  const reactQueryConfig = new QueryClient({});
  
  return (
    <QueryClientProvider client={reactQueryConfig}>
      <RouterProvider router={routes} />
      <Toaster toastOptions={{ duration: 8000 }} />
    </QueryClientProvider>
  );
}

export default App;
