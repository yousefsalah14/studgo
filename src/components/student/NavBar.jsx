import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/student.png';
import { useAuthStore } from '../../store/authStore.js';
import { 
  Calendar, 
  User, 
  ChevronDown, 
  Home, 
  Users, 
  Calendar as CalendarIcon, 
  BookOpen, 
  LogOut,
  Menu,
  X,
  Briefcase
} from 'lucide-react';

const NavBar = () => {
  const { currentUser, handleLogout } = useAuthStore();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsNavbarVisible(currentScroll <= lastScrollPosition || currentScroll < 50);
      setLastScrollPosition(currentScroll);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollPosition]);

  const isActive = (path) => location.pathname === path;

  // Common styles
  const navContainer = `bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white px-6 py-3 fixed top-0 left-0 right-0 z-50 shadow-xl transition-transform duration-300 ${isNavbarVisible ? 'translate-y-0' : '-translate-y-full'}`;
  const linkStyles = "relative group flex items-center gap-2 text-white py-2 px-3 rounded-lg transition-all duration-300 hover:bg-gray-800/50";
  const activeLinkStyles = "bg-blue-500/20 text-blue-400";
  const buttonStyles = "px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl";

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/student-activities', label: 'Organizations', icon: Users },
    { path: '/events', label: 'Events', icon: CalendarIcon },
    { path: '/workshops', label: 'Workshops', icon: BookOpen },
    { path: '/interns', label: 'Internships', icon: Briefcase },
    { path: '/sa-profile', label: 'SA Profile', icon: User }
  ];

  return (
    <div className={navContainer}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src={Logo} alt="Logo" className="w-10 h-10 rounded-full object-cover border-2 border-white" />
          <Link to="/" className="text-2xl font-bold tracking-wide hover:scale-105 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            StudGo
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-2">
          {currentUser ? (
            <>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`${linkStyles} ${isActive(item.path) ? activeLinkStyles : ''}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`${linkStyles} ${isProfileOpen ? activeLinkStyles : ''}`}
                >
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-800 shadow-lg py-1 z-50">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User className="w-4 h-4 mr-3" />
                      My Profile
                    </Link>
                    <Link
                      to="/calendar"
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Calendar className="w-4 h-4 mr-3" />
                      Calendar
                    </Link>
                  </div>
                )}
              </div>
              <button 
                onClick={handleLogout} 
                className={`${buttonStyles} bg-red-600 hover:bg-red-700 hover:ring-4 hover:ring-red-500 flex items-center gap-2`}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={`${buttonStyles} bg-green-600 hover:bg-green-700 hover:ring-4 hover:ring-green-500`}>Login</Link>
              <Link to="/register" className={`${buttonStyles} bg-blue-600 hover:bg-blue-700 hover:ring-4 hover:ring-blue-500`}>Register</Link>
            </>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button 
            className="text-white focus:outline-none p-2 hover:bg-gray-800 rounded-lg transition-colors" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden flex flex-col items-center bg-gray-900 transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-screen py-4" : "max-h-0 overflow-hidden"}`}>
        {currentUser ? (
          <>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${linkStyles} w-full justify-center ${isActive(item.path) ? activeLinkStyles : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <Link
              to="/profile"
              className={`${linkStyles} w-full justify-center ${isActive('/profile') ? activeLinkStyles : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="w-5 h-5" />
              <span>My Profile</span>
            </Link>
            <Link
              to="/calendar"
              className={`${linkStyles} w-full justify-center ${isActive('/calendar') ? activeLinkStyles : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Calendar className="w-5 h-5" />
              <span>Calendar</span>
            </Link>
            <button 
              onClick={handleLogout} 
              className={`${buttonStyles} bg-red-600 hover:bg-red-700 hover:ring-4 hover:ring-red-500 mt-2 flex items-center gap-2`}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={`${buttonStyles} bg-green-600 hover:bg-green-700 hover:ring-4 hover:ring-green-500 mt-2`} onClick={() => setIsMenuOpen(false)}>Login</Link>
            <Link to="/register" className={`${buttonStyles} bg-blue-600 hover:bg-blue-700 hover:ring-4 hover:ring-blue-500 mt-2`} onClick={() => setIsMenuOpen(false)}>Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;