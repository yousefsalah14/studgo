import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/student.png';
import { useAuthStore } from '../../store/authStore.js';

const NavBar = () => {
  const{currentUser, handleLogout} = useAuthStore()
  
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsNavbarVisible(currentScroll <= lastScrollPosition || currentScroll < 50);
      setLastScrollPosition(currentScroll);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollPosition]);


 

  // Common styles
  const navContainer = `bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white px-6 py-3 fixed top-0 left-0 right-0 z-50 shadow-xl transition-transform duration-300 ${isNavbarVisible ? 'translate-y-0' : '-translate-y-full'}`;
  const linkStyles = "relative group text-lg text-white py-2 hover:text-gray-300 transition-all duration-300";
  const buttonStyles = "px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl";


  return (
    <div className={navContainer}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src={Logo} alt="Logo" className="w-10 h-10 rounded-full object-cover border-2 border-white" />
          <Link to="/" className="text-2xl font-bold tracking-wide hover:scale-105">StudGo</Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          {currentUser ? (
            <>
              {['/', '/student-activities', '/events', '/workshops', '/profile'].map((path, index) => (
                <Link key={index} to={path} className={linkStyles}>{path.replace('/', '') || 'Home'}</Link>
              ))}
              <button onClick={handleLogout} className={`${buttonStyles} bg-red-600 hover:bg-red-700 hover:ring-4 hover:ring-red-500`}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className={`${buttonStyles} bg-green-600 hover:bg-green-700 hover:ring-4 hover:ring-green-500`}>Login</Link>
              <Link to="/register" className={`${buttonStyles} bg-blue-600 hover:bg-blue-700 hover:ring-4 hover:ring-blue-500`}>Register</Link>
            </>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button className="text-white focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden flex flex-col items-center bg-gray-900 transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-screen py-4" : "max-h-0 overflow-hidden"}`}>
        {currentUser ? (
          <>
            {['/', '/student-activities', '/events', '/workshops', '/profile'].map((path, index) => (
              <Link key={index} to={path} className={linkStyles} onClick={() => setIsMenuOpen(false)}>{path.replace('/', '') || 'Home'}</Link>
            ))}
            <button onClick={handleLogout} className={`${buttonStyles} bg-red-600 hover:bg-red-700 hover:ring-4 hover:ring-red-500 mt-2`}>Logout</button>
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
