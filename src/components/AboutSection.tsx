import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Code, Target, Lightbulb, Briefcase } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { aboutMeData, keyHighlights, additionalHighlights } = useData();

  const iconMap = {
    Code: Code,
    Target: Target,
    Lightbulb: Lightbulb,
    Briefcase: Briefcase,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="about" className="bg-black relative overflow-hidden py-20">
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
              About <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#09c6f9] to-[#045de9]">Me</span>
            </h2>
            <motion.div
              className="h-1 w-32 mx-auto bg-gradient-to-r from-[#09c6f9] to-[#045de9] rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 items-start">
          {/* Main About Content */}
          <motion.div
            className="xl:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative group">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-cyan-500/10 rounded-3xl blur-sm group-hover:blur-none transition-all duration-500"></div>

              {/* Main Content Card */}
              <div className="relative bg-black/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-gray-700/50 shadow-2xl transition-all duration-500 group-hover:shadow-3xl group-hover:border-[#09c6f9]/30">
                {/* Profile Section */}
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#09c6f9] to-[#045de9] rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                    {aboutMeData.profilePicture ? (
                      <img
                        src={aboutMeData.profilePicture}
                        alt="Naveen Yanamadala"
                        className="w-full h-full object-cover rounded-2xl"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            const icon = document.createElement('div');
                            icon.innerHTML = '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
                            parent.appendChild(icon);
                          }
                        }}
                      />
                    ) : (
                      <User size={32} className="text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Naveen Yanamadala</h3>
                    <p className="text-gray-400">{aboutMeData.tagline}</p>
                    {aboutMeData.location && (
                      <p className="text-gray-500 text-sm">{aboutMeData.location}</p>
                    )}
                  </div>
                </div>

                {/* About Text */}
                <div className="prose prose-lg prose-invert max-w-none">
                  <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line text-justify">
  I’m a recent Computer Science and Engineering graduate (2025) with a specialization in AI and Machine Learning. I have a solid understanding of core programming concepts, particularly in C++ and Python, and strong problem-solving skills grounded in data structures and algorithms. I'm comfortable working with both frontend and backend technologies, cloud tools, and Linux-based systems. I enjoy building scalable, efficient solutions and learning new technologies along the way. I’m looking for an opportunity where I can contribute meaningfully, keep learning, and grow as a software engineer in a collaborative environment.


                  </p>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
            </div>
          </motion.div>

          {/* Key Highlights Sidebar */}
          <motion.div
            className="xl:col-span-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-8 text-center xl:text-left">
                Key <span className="text-[#09c6f9]">Highlights</span>
              </h3>

              {keyHighlights.filter(highlight => highlight.isActive).map((highlight) => {
                const Icon = iconMap[highlight.icon as keyof typeof iconMap] || Code;
                return (
                  <motion.div
                    key={highlight.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    className="group relative"
                  >
                    {/* Card Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl blur-sm group-hover:blur-none transition-all duration-300"></div>

                    {/* Card Content */}
                    <div className="relative bg-black/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50 transition-all duration-300 group-hover:border-[#09c6f9]/30 group-hover:shadow-lg">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#09c6f9]/20 to-[#045de9]/20 rounded-xl flex items-center justify-center border border-[#09c6f9]/20 group-hover:scale-110 transition-transform duration-300">
                            <Icon size={24} className="text-[#09c6f9]" />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-[#09c6f9] transition-colors duration-300">
                            {highlight.title}
                          </h4>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {highlight.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Additional Highlights Below */}
        <motion.div
          className="mt-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {additionalHighlights.filter(highlight => highlight.isActive).map((highlight) => {
              const Icon = iconMap[highlight.icon as keyof typeof iconMap] || Code;
              return (
                <motion.div
                  key={highlight.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  className="group relative"
                >
                  {/* Card Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl blur-sm group-hover:blur-none transition-all duration-300"></div>

                  {/* Card Content */}
                  <div className="relative bg-black/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50 transition-all duration-300 group-hover:border-[#09c6f9]/30 group-hover:shadow-lg">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#09c6f9]/20 to-[#045de9]/20 rounded-xl flex items-center justify-center border border-[#09c6f9]/20 group-hover:scale-110 transition-transform duration-300">
                          <Icon size={24} className="text-[#09c6f9]" />
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-[#09c6f9] transition-colors duration-300">
                          {highlight.title}
                        </h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
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

export default AboutSection;