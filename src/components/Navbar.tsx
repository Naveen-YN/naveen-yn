import React, { useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { Github, Linkedin, User, FolderKanban, Menu, X, Home, Mail, Code } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  scrollY?: number;
}

const Navbar: React.FC<NavbarProps> = ({ scrollY = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (section: string, Icon: React.ElementType, label: string) => {
    if (isHomePage) {
      return (
        <div className="relative">
          <ScrollLink
            to={section}
            smooth={true}
            duration={500}
            offset={-80}
            className={`hidden md:flex items-center justify-center transition-all duration-500 cursor-pointer relative group ${
              isScrolled 
                ? 'text-white hover:text-[#09c6f9] gap-2 px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-10' 
                : 'w-10 h-10 text-white hover:text-[#09c6f9] rounded-full hover:bg-white hover:bg-opacity-10'
            }`}
            onMouseEnter={() => setHoveredItem(label)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Icon size={20} />
            {isScrolled && <span className="text-sm font-medium">{label}</span>}
          </ScrollLink>
          <AnimatePresence>
            {hoveredItem === label && !isScrolled && (
              <motion.div
                initial={{ opacity: 0, y: 5, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 bg-opacity-95 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md whitespace-nowrap z-50 border border-gray-700"
                style={{ pointerEvents: 'none' }}
              >
                {label}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 border-l border-t border-gray-700"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    } else {
      return (
        <div className="relative">
          <RouterLink
            to={`/#${section}`}
            className={`hidden md:flex items-center justify-center transition-all duration-500 relative group ${
              isScrolled 
                ? 'text-white hover:text-[#09c6f9] gap-2 px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-10' 
                : 'w-10 h-10 text-white hover:text-[#09c6f9] rounded-full hover:bg-white hover:bg-opacity-10'
            }`}
            onMouseEnter={() => setHoveredItem(label)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Icon size={20} />
            {isScrolled && <span className="text-sm font-medium">{label}</span>}
          </RouterLink>
          <AnimatePresence>
            {hoveredItem === label && !isScrolled && (
              <motion.div
                initial={{ opacity: 0, y: 5, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 bg-opacity-95 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md whitespace-nowrap z-50 border border-gray-700"
                style={{ pointerEvents: 'none' }}
              >
                {label}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 border-l border-t border-gray-700"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }
  };

  return (
    <motion.nav 
      className={`fixed z-50 transition-all duration-500 ${
        isScrolled ? 'w-full left-0 top-0' : 'w-full'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        perspective: "1000px"
      }}
    >
      <div className={`transition-all duration-500 ${
        isScrolled ? 'w-full' : 'flex justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-2'
      }`}>
        <motion.div 
          className={`relative transition-all duration-500 ${
            isScrolled 
              ? 'w-full bg-black bg-opacity-20 backdrop-blur-lg px-6 py-3 flex items-center justify-between m-0' 
              : 'bg-black bg-opacity-20 backdrop-blur-md rounded-2xl px-4 sm:px-6 md:px-8 lg:px-10 py-3 flex items-center border border-white/10 max-w-6xl w-full'
          }`}
          animate={{
            rotateX: isScrolled ? 0 : 5,
            rotateY: isScrolled ? 0 : -2,
            scale: isScrolled ? 1 : 0.95,
            transformStyle: "preserve-3d"
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            transformOrigin: "center center",
            boxShadow: isScrolled 
              ? '0 8px 32px rgba(0,0,0,0.3)' 
              : '0 4px 20px rgba(0,0,0,0.2)'
          }}
        >
          {isScrolled ? (
            // Scrolled state - Full width with name on left, icons with text on right
            <>
              {/* Left side - Brand Name */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <RouterLink to="/" className="text-xl md:text-xl text-base font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-[#09c6f9] to-[#045de9]">
                  <span className="hidden md:inline">Naveen Yanamadala</span>
                  <span className="md:hidden">Naveen Y.</span>
                </RouterLink>
              </motion.div>

              {/* Right side - All navigation items with text */}
              <motion.div 
                className="flex items-center space-x-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {!isHomePage && (
                  <RouterLink 
                    to="/" 
                    className="flex items-center gap-2 px-3 py-2 text-white hover:text-[#09c6f9] transition-colors duration-300 rounded-lg hover:bg-white hover:bg-opacity-10"
                  >
                    <Home size={20} />
                    <span className="text-sm font-medium hidden lg:inline">Home</span>
                  </RouterLink>
                )}
                {handleNavClick("coding-profiles", Code, "Coding Profiles")}
                {handleNavClick("about", User, "About")}
                {handleNavClick("projects", FolderKanban, "Projects")}
                {handleNavClick("contact", Mail, "Contact")}
                
                <motion.a 
                  href="https://github.com/Naveen-YN" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 px-3 py-2 text-white hover:text-[#09c6f9] transition-colors duration-300 rounded-lg hover:bg-white hover:bg-opacity-10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={20} />
                  <span className="text-sm font-medium hidden lg:inline">GitHub</span>
                </motion.a>
                
                <motion.a 
                  href="https://linkedin.com/in/naveen-yn" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 px-3 py-2 text-white hover:text-[#09c6f9] transition-colors duration-300 rounded-lg hover:bg-white hover:bg-opacity-10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin size={20} />
                  <span className="text-sm font-medium hidden lg:inline">LinkedIn</span>
                </motion.a>
                
                <motion.button 
                  className="md:hidden flex items-center justify-center w-10 h-10 text-white rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                  onClick={() => setIsExpanded(!isExpanded)}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {isExpanded ? <X size={20} /> : <Menu size={20} />}
                </motion.button>
              </motion.div>
            </>
          ) : (
            // Default state - Better responsive design
            <>
              {/* Left side - Navigation Icons - Hidden on small screens */}
              <div className="hidden sm:flex items-center space-x-2 lg:space-x-3">
                {!isHomePage && (
                  <div className="relative">
                    <RouterLink 
                      to="/" 
                      className="hidden md:flex items-center justify-center w-10 h-10 text-white hover:text-[#09c6f9] transition-colors duration-300 relative group rounded-full hover:bg-white hover:bg-opacity-10"
                      onMouseEnter={() => setHoveredItem("Home")}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <Home size={20} />
                    </RouterLink>
                    <AnimatePresence>
                      {hoveredItem === "Home" && (
                        <motion.div
                          initial={{ opacity: 0, y: 5, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 bg-opacity-95 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md whitespace-nowrap z-50 border border-gray-700"
                          style={{ pointerEvents: 'none' }}
                        >
                          Home
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 border-l border-t border-gray-700"></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
                {handleNavClick("coding-profiles", Code, "Coding Profiles")}
                {handleNavClick("about", User, "About")}
              </div>

              {/* Centered Brand Name - Responsive text sizing */}
              <motion.div
                className="flex-1 flex justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <RouterLink to="/" className="text-lg sm:text-xl md:text-2xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-[#09c6f9] to-[#045de9] whitespace-nowrap">
                  <span className="hidden sm:inline">Naveen Yanamadala</span>
                  <span className="sm:hidden">Naveen Y.</span>
                </RouterLink>
              </motion.div>

              {/* Right side - Contact, GitHub, LinkedIn - Hidden on small screens */}
              <div className="hidden sm:flex items-center space-x-2 lg:space-x-3">
                {handleNavClick("projects", FolderKanban, "Projects")}
                {handleNavClick("contact", Mail, "Contact")}
                
                <div className="relative">
                  <motion.a 
                    href="https://github.com/Naveen-YN" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center w-10 h-10 text-white hover:text-[#09c6f9] transition-colors duration-300 rounded-full hover:bg-white hover:bg-opacity-10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onMouseEnter={() => setHoveredItem("GitHub")}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Github size={20} />
                  </motion.a>
                  <AnimatePresence>
                    {hoveredItem === "GitHub" && (
                      <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 bg-opacity-95 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md whitespace-nowrap z-50 border border-gray-700"
                        style={{ pointerEvents: 'none' }}
                      >
                        GitHub
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 border-l border-t border-gray-700"></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <div className="relative">
                  <motion.a 
                    href="https://linkedin.com/in/naveen-yn" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center w-10 h-10 text-white hover:text-[#09c6f9] transition-colors duration-300 rounded-full hover:bg-white hover:bg-opacity-10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onMouseEnter={() => setHoveredItem("LinkedIn")}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Linkedin size={20} />
                  </motion.a>
                  <AnimatePresence>
                    {hoveredItem === "LinkedIn" && (
                      <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 bg-opacity-95 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md whitespace-nowrap z-50 border border-gray-700"
                        style={{ pointerEvents: 'none' }}
                      >
                        LinkedIn
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 border-l border-t border-gray-700"></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Mobile Menu Button - Always visible on small screens */}
              <motion.button 
                className="sm:hidden flex items-center justify-center w-10 h-10 text-white rounded-full hover:bg-white hover:bg-opacity-10 transition-all duration-300 ml-2"
                onClick={() => setIsExpanded(!isExpanded)}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
              >
                {isExpanded ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </>
          )}
        </motion.div>

        {/* Mobile Menu - Fixed positioning */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              className={`md:hidden absolute top-full mt-2 py-3 bg-black bg-opacity-70 backdrop-blur-md rounded-lg px-6 ${
                isScrolled ? 'left-4 right-4' : 'left-1/2 transform -translate-x-1/2 w-72 max-w-[calc(100vw-2rem)]'
              }`}
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {!isHomePage && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <RouterLink 
                    to="/" 
                    className="block py-3 text-white hover:text-[#09c6f9] transition-colors duration-300 flex items-center gap-3 text-lg"
                    onClick={() => setIsExpanded(false)}
                  >
                    <Home size={18} /> <span>Home</span>
                  </RouterLink>
                </motion.div>
              )}
              
              {[
                { item: "coding-profiles", icon: Code, label: "Coding Profiles" },
                { item: "about", icon: User, label: "About" },
                { item: "projects", icon: FolderKanban, label: "Projects" },
                { item: "contact", icon: Mail, label: "Contact" }
              ].map(({ item, icon: Icon, label }, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * (index + 1) }}
                >
                  <RouterLink 
                    to={isHomePage ? `#${item}` : `/#${item}`} 
                    className="block py-3 text-white hover:text-[#09c6f9] transition-colors duration-300 flex items-center gap-3 text-lg"
                    onClick={() => setIsExpanded(false)}
                  >
                    <Icon size={18} />
                    <span>{label}</span>
                  </RouterLink>
                </motion.div>
              ))}

              {/* Mobile Social Links */}
              <motion.div
                className="border-t border-gray-700 mt-4 pt-4 flex justify-center gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <a 
                  href="https://github.com/Naveen-YN" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#09c6f9] transition-colors duration-300"
                >
                  <Github size={24} />
                </a>
                <a 
                  href="https://linkedin.com/in/naveen-yn" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#09c6f9] transition-colors duration-300"
                >
                  <Linkedin size={24} />
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;