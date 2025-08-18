import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCalendarAlt, FaUsers, FaCode, FaFilter, FaSearch, FaGraduationCap, FaUser, FaBriefcase, FaHeart, FaLaptopCode, FaTrophy, FaFlask } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  slug: string;
  longDescription?: string;
  features?: string[];
  technologies?: string[];
  status?: 'completed' | 'in-progress' | 'planned' | 'n/a';
  category?: string;
  priority?: 'high' | 'medium' | 'low' | 'none';
  teamSize?: number;
  role?: string;
  startDate?: string;
  endDate?: string;
  link?: string;
  liveDemo?: string;
}

const projects: Project[] = [
    {
    id: '1',
    title: 'Portfolio',
    description: 'My Personal Portfolio Website!',
    image: 'https://neuropia.s3.ap-south-1.amazonaws.com/project-img/portfolio.gif',
    tags: ['Portfolio', 'React', 'Vue', 'TypeScript', 'MongoDB'],
    slug: 'portfolio',
    longDescription: 'My personal portfolio website showcasing my projects and skills.',
    features: [
      'Real-time hand gesture recognition',
      'Cursor movement and clicking',
      'Scrolling and volume control',
      'App switching and window management'
    ],
    technologies: ['React', 'Vue', 'TypeScript', 'MongoDB'],
    status: 'in-progress',
    category: 'Personal',
    priority: 'high',
    teamSize: 1,
    role: 'Full Stack Developer',
    startDate: '2024-12',
    endDate: '2025-04',
    link: '',
    liveDemo: '',
  },
  {
    id: '2',
    title: 'GestureFlow: An Advanced Hand Gesture Control System',
    description: 'A real-time hand gesture control application for contactless interaction.',
    image: 'https://neuropia.s3.ap-south-1.amazonaws.com/project-img/gesture.png',
    tags: ['Python', 'Computer Vision', 'AI', 'OpenCV', 'MediaPipe'],
    slug: 'gestureflow',
    longDescription: 'Built a real-time hand gesture control application using MediaPipe and OpenCV...',
    features: [
      'Real-time hand gesture recognition',
      'Cursor movement and clicking',
      'Scrolling and volume control',
      'App switching and window management'
    ],
    technologies: ['Python', 'OpenCV', 'MediaPipe', 'pynput', 'pyautogui'],
    status: 'completed',
    category: 'Academic',
    priority: 'medium',
    teamSize: 1,
    role: 'Developer',
    startDate: '2024-12',
    endDate: '2025-04',
    link: 'https://github.com/Naveen-YN/GestureFlow-An-Advanced-Hand-Gesture-Control-System',
    liveDemo: '',
  },
  {
    id: '2',
    title: 'Potato Leaf Disease Identification using DL',
    description: 'A deep learning application for identifying diseases in potato leaves.',
    image: 'https://neuropia.s3.ap-south-1.amazonaws.com/project-img/potato.jpg',
    tags: ['Python', 'Deep Learning', 'Computer Vision', 'TensorFlow', 'Keras'],
    slug: 'potato-leaf-disease',
    longDescription: 'Built a robust disease identification application for potato crops using a ResNet50 model...',
    features: [
      'Disease classification using ResNet50',
      'High-accuracy predictions',
      'User-friendly interface with PyQt5',
      'Real-time predictions and insights'
    ],
    technologies: ['Python', 'TensorFlow', 'Keras', 'ResNet50', 'OpenCV', 'PyQt5'],
    status: 'completed',
    category: 'Academic',
    priority: 'none',
    teamSize: 6,
    role: 'Developer and Team Lead',
    startDate: '2023-08',
    endDate: '2024-01',
    link: 'https://github.com/Naveen-YN/Potato-Leaf-Disease-Identification-using-Deep-Learning',
    liveDemo: '',
  },
  {
    id: '3',
    title: 'Brain Tumor and Lung Disease Detection',
    description: 'AI-based medical image classification for brain tumor and lung disease diagnosis.',
    image: 'https://neuropia.s3.ap-south-1.amazonaws.com/project-img/brain-lung.jpg',
    tags: ['Python', 'Deep Learning', 'TensorFlow', 'CNN', 'Medical AI'],
    slug: 'brain-tumor-lung-disease',
    longDescription: 'Developed deep learning models to detect brain tumors and lung diseases using medical imaging datasets...',
    features: ['CNN-based detection', 'Medical dataset training', 'High diagnostic accuracy'],
    technologies: ['Python', 'TensorFlow', 'Keras', 'OpenCV'],
    status: 'completed',
    category: 'Academic',
    priority: 'none',
    teamSize: 1,
    role: 'ML Engineer',
    startDate: '2023-06',
    endDate: '2023-12',
    link: 'https://github.com/Naveen-YN/Brain-Tumor-and-Lung-Disease-Detection-using-Deep-Learning',
    liveDemo: '',
  },
  {
    id: '4',
    title: 'Virtual Healthcare Companion Chatbot',
    description: 'A full-stack AI-powered chatbot for healthcare queries with NLTK and Gemini API.',
    image: 'https://neuropia.s3.ap-south-1.amazonaws.com/project-img/healthcare.jpg',
    tags: ['Python', 'Django', 'NLTK', 'NLP', 'Gradio', 'Gemini API'],
    slug: 'healthcare-chatbot',
    longDescription: 'Built an interactive chatbot that answers medical queries using NLP with NLTK and full-stack Django backend...',
    features: ['Text + voice interface', 'Healthcare Q&A', 'Gemini API integration', 'User personalization'],
    technologies: ['Python', 'NLTK', 'Django', 'Gradio', 'Gemini API'],
    status: 'completed',
    category: 'Academic',
    priority: 'none',
    teamSize: 1,
    role: 'Full Stack & AI Developer',
    startDate: '2024-03',
    endDate: '2024-08',
    link: 'https://github.com/Naveen-YN/Virtual-Healthcare-Companion-Chatbot-Utilizing-NLTK',
    liveDemo: '',
  },
  {
    id: '5',
    title: 'Image Classification on CIFAR-10',
    description: 'Deep learning image classification project with GUI using PyQt5 and TensorFlow.',
    image: 'https://neuropia.s3.ap-south-1.amazonaws.com/project-img/img-classifi.jpg',
    tags: ['Python', 'Deep Learning', 'PyQt5', 'TensorFlow', 'CIFAR-10'],
    slug: 'cifar10-classification',
    longDescription: 'Implemented CNNs to classify CIFAR-10 dataset images, with PyQt5 GUI for easy inference...',
    features: ['CNN training on CIFAR-10', 'PyQt5 GUI', 'Real-time classification'],
    technologies: ['Python', 'TensorFlow', 'Keras', 'PyQt5'],
    status: 'completed',
    category: 'Academic',
    priority: 'none',
    teamSize: 1,
    role: 'Developer',
    startDate: '2023-04',
    endDate: '2023-08',
    link: 'https://github.com/Naveen-YN/Image-Classification-Using-Deep-Learning-Techniques-on-the-CIFAR-10',
    liveDemo: '',
  },
    {
    id: '5',
    title: 'Image Classification on CIFAR-10',
    description: 'Deep learning image classification project with GUI using PyQt5 and TensorFlow.',
    image: 'https://neuropia.s3.ap-south-1.amazonaws.com/project-img/img-classifi.jpg',
    tags: ['Python', 'Deep Learning', 'PyQt5', 'TensorFlow', 'CIFAR-10'],
    slug: 'cifar10-classification',
    longDescription: 'Implemented CNNs to classify CIFAR-10 dataset images, with PyQt5 GUI for easy inference...',
    features: ['CNN training on CIFAR-10', 'PyQt5 GUI', 'Real-time classification'],
    technologies: ['Python', 'TensorFlow', 'Keras', 'PyQt5'],
    status: 'completed',
    category: 'Academic',
    priority: 'none',
    teamSize: 1,
    role: 'Developer and Contributor',
    startDate: '2023-04',
    endDate: '2023-08',
    link: 'https://github.com/Naveen-YN/Image-Classification-Using-Deep-Learning-Techniques-on-the-CIFAR-10',
    liveDemo: '',
  },
];


const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const [filter, setFilter] = useState<'all' | 'completed' | 'in-progress' | 'planned' | 'n/a'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    projectRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      projectRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category).filter(Boolean)))];

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesStatus = filter === 'all' || project.status === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    
    return matchesStatus && matchesSearch && matchesCategory;
  });

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in-progress': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'planned': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'n/a': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      case 'none': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'Academic': return FaGraduationCap;
      case 'Personal': return FaUser;
      case 'Professional': return FaBriefcase;
      case 'Open Source': return FaHeart;
      case 'Freelance': return FaLaptopCode;
      case 'Hackathon': return FaTrophy;
      case 'Research': return FaFlask;
      default: return FaCode;
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'Academic': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'Personal': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'Professional': return 'text-purple-400 bg-purple-500/20 border-purple-500/30';
      case 'Open Source': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'Freelance': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'Hackathon': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'Research': return 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="projects" className="py-20 bg-black relative overflow-hidden">
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
              My <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#09c6f9] to-[#045de9]">Projects</span>
            </h2>
            <motion.div
              className="h-1 w-32 mx-auto bg-gradient-to-r from-[#09c6f9] to-[#045de9] rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>
          <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
            Showcasing innovative solutions and technical expertise through real-world applications
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#09c6f9] focus:ring-2 focus:ring-[#09c6f9]/20 transition-all duration-300"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as any)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#09c6f9] focus:ring-2 focus:ring-[#09c6f9]/20 transition-all duration-300 appearance-none"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="planned">Planned</option>
                  <option value="n/a">N/A</option>
                </select>
              </div>

              {/* Category Filter */}
              <div className="relative">
                <FaCode className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#09c6f9] focus:ring-2 focus:ring-[#09c6f9]/20 transition-all duration-300 appearance-none"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Results Count */}
              <div className="flex items-center justify-center bg-gray-800/30 rounded-lg px-4 py-3 border border-gray-700/50">
                <span className="text-gray-400 text-sm">
                  {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => {
              const CategoryIcon = getCategoryIcon(project.category);
              
              return (
                <motion.div 
                  key={project.id}
                  ref={el => projectRefs.current[index] = el}
                  variants={cardVariants}
                  layout
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative"
                >
                  {/* Card Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl blur-sm group-hover:blur-none transition-all duration-500"></div>
                  
                  {/* Main Card */}
                  <div className="relative bg-black/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl transition-all duration-500 group-hover:shadow-3xl group-hover:border-[#09c6f9]/30 overflow-hidden h-full flex flex-col">
                    {/* Project Image */}
                    <div className="relative overflow-hidden h-48 bg-gradient-to-br from-gray-800 to-gray-900">
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FaCode size={48} className="text-gray-600" />
                        </div>
                      )}
                      
                      {/* Overlay with Status and Priority */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                        <div className="absolute top-4 left-4 flex items-center gap-2">
                          {project.status && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                              {project.status === 'n/a' ? 'N/A' : project.status.replace('-', ' ')}
                            </span>
                          )}
                          {project.priority && project.priority !== 'none' && (
                            <div className={`w-3 h-3 rounded-full ${getPriorityColor(project.priority)}`} title={`${project.priority} priority`}></div>
                          )}
                        </div>
                        
                        {/* Category Badge */}
                        {project.category && (
                          <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                            <CategoryIcon size={12} className={getCategoryColor(project.category).split(' ')[0]} />
                            <span className="text-white text-xs">{project.category}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6 flex-grow flex flex-col">
                      {/* Header */}
                      <div className="mb-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold text-white group-hover:text-[#09c6f9] transition-colors duration-300 flex-1">
                            {project.title}
                          </h3>
                          {project.category && (
                            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(project.category)} flex items-center gap-1 flex-shrink-0`}>
                              <CategoryIcon size={10} />
                              {project.category}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      {/* Project Meta */}
                      {(project.startDate || project.teamSize || project.role) && (
                        <div className="mb-4 space-y-2">
                          {project.startDate && (
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <FaCalendarAlt size={12} />
                              <span>{project.startDate} {project.endDate && `- ${project.endDate}`}</span>
                            </div>
                          )}
                          {project.teamSize && (
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <FaUsers size={12} />
                              <span>Team of {project.teamSize}</span>
                            </div>
                          )}
                          {project.role && (
                            <div className="text-xs text-gray-500">
                              <span className="font-medium">Role:</span> {project.role}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Tags */}
                      <div className="mb-6 flex-grow">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 4).map((tag, i) => (
                            <span key={i} className="text-xs bg-gray-800/50 text-gray-300 px-3 py-1 rounded-full border border-gray-700/50 hover:border-[#09c6f9]/30 transition-colors duration-300">
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 4 && (
                            <span className="text-xs text-gray-500 px-2 py-1">
                              +{project.tags.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-auto">
                        {project.link && (
                          <motion.a 
                            href={project.link} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-white rounded-lg text-sm transition-all duration-300 border border-gray-700/50 hover:border-[#09c6f9]/30 flex-1 justify-center"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <FaGithub size={16} />
                            <span>Code</span>
                          </motion.a>
                        )}
                        
                        {project.liveDemo && (
                          <motion.a 
                            href={project.liveDemo} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-[#045de9]/20 hover:bg-[#045de9]/30 text-[#09c6f9] rounded-lg text-sm transition-all duration-300 border border-[#09c6f9]/30 hover:border-[#09c6f9]/50 flex-1 justify-center"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <FaExternalLinkAlt size={14} />
                            <span>Demo</span>
                          </motion.a>
                        )}
                        
                        <motion.div className="flex-1">
                          <Link 
                            to={`/project/${project.slug}`}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#045de9] to-[#09c6f9] text-white rounded-lg text-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#045de9]/25 w-full justify-center"
                          >
                            <span>Details</span>
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaCode size={64} className="mx-auto mb-6 text-gray-600" />
            <h3 className="text-2xl font-bold text-gray-400 mb-4">No Projects Found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search criteria or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilter('all');
                setSelectedCategory('all');
              }}
              className="px-6 py-3 bg-[#045de9] hover:bg-[#09c6f9] text-white rounded-lg transition-colors duration-300"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;