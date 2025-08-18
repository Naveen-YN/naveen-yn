import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaUniversity, FaSchool, FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt, FaStar, FaAward, FaBook, FaCertificate, FaUserGraduate, FaMedal, FaTrophy } from "react-icons/fa";

// Icon mapping for dynamic icons
const iconMap = {
  FaUniversity,
  FaSchool,
  FaGraduationCap,
  FaCalendarAlt,
  FaStar,
  FaAward,
  FaBook,
  FaCertificate,
  FaUserGraduate,
  FaMedal,
  FaTrophy
};

const EducationSection = () => {
  const sectionRef = useRef(null);

  // Hardcoded education data from resume
  const education = [
    {
      id: '1',
      degree: 'Bachelor of Technology - B.Tech',
      course: 'Computer Science and Engineering Specialization in Artificial Intelligence and Machine Learning',
      institution: 'Malla Reddy University, Hyderabad, Telangana',
      duration: 'Sep 2021 – Jul 2025',
      cgpa: '8.35',
      level: 'undergraduate',
      status: 'graduated',
      highlights: [],
      skills: [],
      customImage: '',
      orderIndex: 0,
      isActive: true,
    },
    {
      id: '2',
      degree: 'Intermediate',
      course: 'MPC',
      institution: 'Narayana Junior College, Hyderabad, Telangana',
      duration: '2019 – 2021',
      cgpa: '74.4%',
      level: 'intermediate',
      status: 'graduated',
      highlights: [],
      skills: [],
      customImage: '',
      orderIndex: 1,
      isActive: true,
    },
    {
      id: '3',
      degree: 'SSC',
      course: '',
      institution: 'SR Digi School, Hyderabad, Telangana',
      duration: '2019',
      cgpa: '8.33',
      level: 'secondary',
      status: 'graduated',
      highlights: [],
      skills: [],
      customImage: '',
      orderIndex: 2,
      isActive: true,
    }
  ];

  // Hardcoded education highlights (achievements/certifications from resume)
  const educationHighlights = [
    {
      id: '1',
      title: 'Foundational C# with Microsoft',
      subtitle: 'freeCodeCamp',
      description: '',
      icon: 'FaCertificate',
      color: 'text-blue-400 hover:border-blue-400/30',
      value: '',
      orderIndex: 0,
      isActive: true,
    },
    {
      id: '2',
      title: 'Data Analysis with Python',
      subtitle: 'Coursera',
      description: '',
      icon: 'FaCertificate',
      color: 'text-green-400 hover:border-green-400/30',
      value: '',
      orderIndex: 1,
      isActive: true,
    },
    {
      id: '3',
      title: 'Exploratory Data Analysis for ML',
      subtitle: 'Coursera',
      description: '',
      icon: 'FaCertificate',
      color: 'text-purple-400 hover:border-purple-400/30',
      value: '',
      orderIndex: 3,
      isActive: true,
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const getEducationIcon = (level) => {
    switch (level) {
      case 'undergraduate': return FaUniversity;
      case 'postgraduate': return FaUniversity;
      case 'diploma': return FaCertificate;
      case 'intermediate': return FaGraduationCap;
      case 'secondary': return FaSchool;
      default: return FaBook;
    }
  };

  const getEducationColor = (level) => {
    switch (level) {
      case 'undergraduate': return 'from-blue-500/30 to-cyan-500/30 border-blue-500/50 text-blue-400';
      case 'postgraduate': return 'from-indigo-500/30 to-purple-500/30 border-indigo-500/50 text-indigo-400';
      case 'diploma': return 'from-orange-500/30 to-red-500/30 border-orange-500/50 text-orange-400';
      case 'intermediate': return 'from-green-500/30 to-emerald-500/30 border-green-500/50 text-green-400';
      case 'secondary': return 'from-purple-500/30 to-pink-500/30 border-purple-500/50 text-purple-400';
      default: return 'from-gray-500/30 to-slate-500/30 border-gray-500/50 text-gray-400';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'current': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'completed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'graduated': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'current': return 'Currently Pursuing';
      case 'completed': return 'Completed';
      case 'graduated': return 'Graduated';
      default: return status;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Sort education by order index
  const sortedEducation = [...education].sort((a, b) => a.orderIndex - b.orderIndex);
  
  // Sort education highlights by order index
  const sortedHighlights = [...educationHighlights].sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <section id="education" className="py-20 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-purple-900/5"></div>
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 sm:px-12 md:px-20 lg:px-32 relative z-10">
        {/* Enhanced Title */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block group">
            <h2 className="text-4xl md:text-5xl font-bold tracking-wider mb-4">
              My <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#09c6f9] to-[#045de9]">Education</span>
            </h2>
            <motion.div
              className="h-1 w-32 mx-auto bg-gradient-to-r from-[#09c6f9] to-[#045de9] rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>
          <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
            Academic journey and educational milestones that shaped my technical foundation
          </p>
        </motion.div>

        {/* Education Cards - One per Row */}
        <motion.div
          ref={sectionRef}
          className="space-y-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sortedEducation.filter(edu => edu.isActive).map((edu, index) => {
            const EducationIcon = getEducationIcon(edu.level);
            const educationColors = getEducationColor(edu.level);
            
            return (
              <motion.div
                key={edu.id}
                variants={cardVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="group relative w-full max-w-6xl mx-auto"
              >
                {/* Card Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${educationColors.split(' ')[0]} ${educationColors.split(' ')[1]} rounded-2xl blur-sm group-hover:blur-none transition-all duration-500`}></div>
                
                {/* Main Card */}
                <div className={`relative bg-black/90 backdrop-blur-xl p-8 rounded-2xl border ${educationColors.split(' ')[2]} shadow-2xl transition-all duration-500 group-hover:shadow-3xl group-hover:border-opacity-80 overflow-hidden`}>
                  {/* Content - Responsive Layout */}
                  <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                    
                    {/* Left Section - Icon and Status - Centered on mobile, left-aligned on desktop */}
                    <div className="flex flex-col items-center text-center flex-shrink-0">
                      {/* Icon/Image Container */}
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${educationColors.split(' ')[0]} ${educationColors.split(' ')[1]} flex items-center justify-center border-2 ${educationColors.split(' ')[2]} shadow-lg group-hover:scale-110 transition-transform duration-300 mb-4 overflow-hidden`}>
                        {edu.customImage ? (
                          <img 
                            src={edu.customImage} 
                            alt={edu.degree} 
                            className="w-full h-full object-cover rounded-xl"
                            onError={(e) => {
                              // Fallback to default icon if image fails to load
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                const iconDiv = document.createElement('div');
                                iconDiv.className = `${educationColors.split(' ')[3]} text-2xl flex items-center justify-center w-full h-full`;
                                iconDiv.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>`;
                                parent.appendChild(iconDiv);
                              }
                            }}
                          />
                        ) : (
                          <EducationIcon 
                            className={`${educationColors.split(' ')[3]} text-2xl`} 
                            size={28}
                          />
                        )}
                      </div>

                      {/* Status and CGPA */}
                      <div className="flex flex-col items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(edu.status)}`}>
                          {getStatusText(edu.status)}
                        </span>
                        {edu.cgpa && (
                          <div className="flex items-center gap-1 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs border border-yellow-500/30">
                            <FaStar size={10} />
                            <span className="font-medium">{edu.cgpa}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Main Content Section - Centered on mobile, left-aligned on desktop */}
                    <div className="flex-grow text-center lg:text-left">
                      {/* Header */}
                      <div className="mb-6">
                        <h3 className={`text-2xl lg:text-3xl font-bold text-white group-hover:${educationColors.split(' ')[3]} transition-colors duration-300 leading-tight mb-2`}>
                          {edu.degree}
                        </h3>
                        
                        {edu.course && (
                          <p className="text-gray-300 text-lg font-medium leading-relaxed mb-4">{edu.course}</p>
                        )}

                        {/* Duration and Institution - Centered on mobile, horizontal on desktop */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center lg:justify-start">
                          <div className="flex items-center gap-2 text-gray-400 text-sm bg-gray-800/30 px-4 py-2 rounded-lg border border-gray-700/50 justify-center">
                            <FaCalendarAlt size={14} className={educationColors.split(' ')[3]} />
                            <span className="font-medium">{edu.duration}</span>
                          </div>

                          <div className="flex items-center gap-2 text-gray-400 text-sm bg-gray-800/20 px-4 py-2 rounded-lg border border-gray-700/30 justify-center">
                            <FaMapMarkerAlt size={14} className={`${educationColors.split(' ')[3]} flex-shrink-0`} />
                            <span className="font-medium text-center">{edu.institution}</span>
                          </div>
                        </div>
                      </div>

                      {/* Content Grid - Centered on mobile, side by side on desktop */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Highlights */}
                        {edu.highlights && edu.highlights.length > 0 && (
                          <div className="text-center lg:text-left">
                            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 justify-center lg:justify-start">
                              <FaAward size={16} className={educationColors.split(' ')[3]} />
                              Key Highlights
                            </h4>
                            <ul className="space-y-3">
                              {edu.highlights.map((highlight, i) => (
                                <li key={i} className="text-gray-400 text-sm flex items-start gap-3 bg-gray-800/20 p-4 rounded-lg border border-gray-700/20">
                                  <div className={`w-2 h-2 rounded-full ${educationColors.split(' ')[3].replace('text-', 'bg-')} mt-2 flex-shrink-0`}></div>
                                  <span className="leading-relaxed text-left">{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Skills */}
                        {edu.skills && edu.skills.length > 0 && (
                          <div className="text-center lg:text-left">
                            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 justify-center lg:justify-start">
                              <FaBook size={16} className={educationColors.split(' ')[3]} />
                              Related Skills
                            </h4>
                            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                              {edu.skills.map((skill, i) => (
                                <span key={i} className={`text-sm bg-gradient-to-r ${educationColors.split(' ')[0]} ${educationColors.split(' ')[1]} text-white px-4 py-2 rounded-lg border ${educationColors.split(' ')[2]} font-medium hover:scale-105 transition-transform duration-200`}>
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Education Summary - Enhanced with better animations and improved design */}
        <motion.div
          className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl border border-gray-700/60 p-8 lg:p-12 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h3 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#09c6f9] to-[#045de9]">
              Educational Highlights
            </span>
          </h3>
          
          <div className={`grid grid-cols-1 ${sortedHighlights.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' : sortedHighlights.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-1 max-w-md mx-auto'} gap-8`}>
            {sortedHighlights.filter(highlight => highlight.isActive).map((highlight, index) => {
              const IconComponent = iconMap[highlight.icon] || FaAward;
              
              return (
                <motion.div 
                  key={highlight.id} 
                  className={`text-center bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 ${highlight.color} transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-opacity-80 group relative overflow-hidden`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  {/* Background Gradient Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${highlight.color.includes('blue') ? 'from-blue-500/20 to-cyan-500/20 border-blue-500/30' : highlight.color.includes('green') ? 'from-green-500/20 to-emerald-500/20 border-green-500/30' : 'from-purple-500/20 to-pink-500/20 border-purple-500/30'} border flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className={`${highlight.color.split(' ')[0]} group-hover:scale-110 transition-transform duration-300`} size={28} />
                      </div>
                    </div>
                    
                    <div className="text-3xl lg:text-4xl font-bold text-white mb-3 group-hover:text-[#09c6f9] transition-colors duration-300">{highlight.title}</div>
                    <div className="text-gray-400 text-base font-medium mb-2">{highlight.subtitle}</div>
                    <div className="text-gray-500 text-sm">{highlight.description}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;