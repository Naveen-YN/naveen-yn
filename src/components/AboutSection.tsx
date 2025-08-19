import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { User, Code, Target, Lightbulb, Briefcase, Github, Linkedin, Twitter, Download, Mail, MapPin } from "lucide-react";

interface Highlight {
  id: number;
  title: string;
  description: string;
  icon: keyof typeof iconMap;
  isActive: boolean;
}

interface AboutMeData {
  profilePicture?: string;
  tagline: string;
  location: string;
  bio: string;
  socialLinks: { platform: string; url: string; icon: keyof typeof iconMap }[];
  resumeUrl: string;
  email: string;
}

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1, once: false });

  // Parallax effect for background
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const blurY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Typing animation for tagline
  const [displayedTagline, setDisplayedTagline] = useState("");
  const aboutMeData: AboutMeData = {
    profilePicture: "", // Add image URL here
    tagline: "Aspiring Software Engineer | AI & ML Enthusiast",
    location: "Hyderabad, Telangana, India",
    bio: "I’m a recent Computer Science and Engineering graduate (2025) with a specialization in AI and Machine Learning. I have a solid understanding of core programming concepts, particularly in C++ and Python, and strong problem-solving skills grounded in data structures and algorithms. I'm comfortable working with both frontend and backend technologies, cloud tools, and Linux-based systems. I enjoy building scalable, efficient solutions and learning new technologies along the way. I’m looking for an opportunity where I can contribute meaningfully, keep learning, and grow as a software engineer in a collaborative environment.",
    socialLinks: [
      { platform: "GitHub", url: "https://github.com/naveenyanamadala", icon: "Github" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/naveenyanamadala", icon: "Linkedin" },
      { platform: "Twitter", url: "https://twitter.com/naveenyan", icon: "Twitter" },
    ],
    resumeUrl: "https://example.com/naveen_resume.pdf", // Add actual resume URL
    email: "mailto:naveen@example.com", // Add actual email
  };

  // 🔹 Key Highlights
  const keyHighlights: Highlight[] = [
    {
      id: 1,
      title: "Strong Problem Solving",
      description: "Skilled in Data Structures and Algorithms with C++ and Python.",
      icon: "Code",
      isActive: true,
    },
    {
      id: 2,
      title: "Full-Stack Development",
      description: "Hands-on experience with React, Node.js, Express, and MongoDB.",
      icon: "Briefcase",
      isActive: true,
    },
  ];

  // 🔹 Additional Highlights
  const additionalHighlights: Highlight[] = [
    {
      id: 1,
      title: "Career Goal",
      description: "Eager to contribute in a collaborative environment and grow as a software engineer.",
      icon: "Target",
      isActive: true,
    },
    {
      id: 2,
      title: "Continuous Learner",
      description: "Always exploring new technologies and building side projects.",
      icon: "Lightbulb",
      isActive: true,
    },
  ];

  const iconMap = {
    Code,
    Target,
    Lightbulb,
    Briefcase,
    Github,
    Linkedin,
    Twitter,
    Download,
    Mail,
    MapPin,
  };

  // Typing animation effect
  useEffect(() => {
    if (isInView) {
      let i = 0;
      const text = aboutMeData.tagline;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayedTagline(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isInView, aboutMeData.tagline]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-900 dark:bg-black transition-colors duration-500"
      ref={sectionRef}
      aria-labelledby="about-title"
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-900/15 via-transparent to-purple-900/15 dark:from-blue-900/5 dark:via-transparent dark:to-purple-900/5 transition-all duration-500"
        style={{ y: bgY }}
      />
      <motion.div
        className="absolute top-1/5 left-1/6 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-blue-500/10 rounded-full blur-3xl"
        style={{ y: blurY }}
      />
      <motion.div
        className="absolute bottom-1/5 right-1/6 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-purple-500/10 rounded-full blur-3xl"
        style={{ y: blurY }}
      />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 relative z-10">
        {/* Title */}
        <motion.div
          className="text-center mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
        >
          <h2
            id="about-title"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide mb-4 text-white dark:text-gray-100"
          >
            About{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#09c6f9] to-[#045de9]">
              Me
            </span>
          </h2>
          <motion.div
            className="h-1 w-20 sm:w-24 md:w-32 lg:w-40 mx-auto bg-gradient-to-r from-[#09c6f9] to-[#045de9] rounded-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-start">
          {/* About Me Card */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative group bg-gray-800/80 dark:bg-black/80 backdrop-blur-xl p-6 sm:p-8 md:p-10 rounded-3xl border border-gray-700/50 dark:border-gray-600/50 shadow-lg transition-all duration-500 hover:shadow-2xl hover:border-[#09c6f9]/50">
              <div className="flex flex-col sm:flex-row items-center mb-6 sm:mb-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#09c6f9] to-[#045de9] rounded-2xl flex items-center justify-center mb-4 sm:mb-0 sm:mr-4 overflow-hidden">
                  {aboutMeData.profilePicture ? (
                    <img
                      src={aboutMeData.profilePicture}
                      alt="Profile picture of Naveen Yanamadala"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <User size={32} className="text-white" aria-hidden="true" />
                  )}
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white dark:text-gray-100">
                    Naveen Yanamadala
                  </h3>
                  <p className="text-gray-400 dark:text-gray-300 text-sm sm:text-base min-h-[1.5rem] sm:min-h-[1.75rem]">
                    {displayedTagline}
                    <span className="animate-pulse">|</span>
                  </p>
                  {aboutMeData.location && (
                    <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center justify-center sm:justify-start gap-1">
                      <MapPin size={16} className="text-[#09c6f9]" aria-hidden="true" />
                      {aboutMeData.location}
                    </p>
                  )}
                </div>
              </div>

              <p className="text-gray-300 dark:text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed text-justify">
                {aboutMeData.bio}
              </p>

              {/* Social Links & Actions */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                  {aboutMeData.socialLinks.map((link) => {
                    const Icon = iconMap[link.icon] || Github;
                    return (
                      <motion.a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 dark:text-gray-300 hover:text-[#09c6f9] transition-colors duration-300"
                        aria-label={`Visit ${link.platform} profile of Naveen Yanamadala`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Icon size={24} />
                      </motion.a>
                    );
                  })}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.a
                    href={aboutMeData.resumeUrl}
                    download
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#09c6f9] to-[#045de9] text-white rounded-lg hover:opacity-90 transition-opacity duration-300"
                    aria-label="Download Naveen's resume"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download size={20} className="mr-2" />
                    Resume
                  </motion.a>
                  <motion.a
                    href={aboutMeData.email}
                    className="inline-flex items-center px-4 py-2 bg-transparent border border-[#09c6f9] text-[#09c6f9] rounded-lg hover:bg-[#09c6f9]/10 transition-all duration-300"
                    aria-label="Contact Naveen via email"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail size={20} className="mr-2" />
                    Contact Me
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Key Highlights */}
          <motion.div
            className="lg:col-span-1"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="space-y-6">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white dark:text-gray-100 mb-6 sm:mb-8 text-center lg:text-left">
                Key <span className="text-[#09c6f9]">Highlights</span>
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8">
                {keyHighlights
                  .filter((h) => h.isActive)
                  .map((highlight) => {
                    const Icon = iconMap[highlight.icon] || Code;
                    return (
                      <motion.div
                        key={highlight.id}
                        variants={itemVariants}
                        whileHover={{ 
                          scale: 1.03, 
                          transition: { duration: 0.3 } 
                        }}
                        className="relative bg-gradient-to-b from-gray-800/70 to-gray-900/70 dark:from-black/70 dark:to-gray-900/70 backdrop-blur-xl p-6 sm:p-8 rounded-xl border border-gray-700/50 dark:border-gray-600/50 hover:border-[#09c6f9]/50 transition-all duration-300 shadow-md hover:shadow-lg"
                        aria-labelledby={`highlight-${highlight.id}`}
                      >
                        <div className="flex items-center space-x-4 sm:space-x-6">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#09c6f9]/30 to-[#045de9]/30 rounded-lg flex items-center justify-center">
                              <Icon size={28} sm={32} className="text-[#09c6f9]" aria-hidden="true" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 
                              id={`highlight-${highlight.id}`}
                              className="text-base sm:text-lg md:text-xl font-semibold text-white dark:text-gray-100 mb-2 sm:mb-3"
                            >
                              {highlight.title}
                            </h4>
                            <p className="text-gray-400 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                              {highlight.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Highlights */}
        <motion.div
          className="mt-10 sm:mt-12 md:mt-16 lg:mt-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {additionalHighlights
              .filter((h) => h.isActive)
              .map((highlight) => {
                const Icon = iconMap[highlight.icon] || Code;
                return (
                  <motion.div
                    key={highlight.id}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.03, 
                      transition: { duration: 0.3 } 
                    }}
                    className="relative bg-gradient-to-b from-gray-800/70 to-gray-900/70 dark:from-black/70 dark:to-gray-900/70 backdrop-blur-xl p-6 sm:p-8 rounded-xl border border-gray-700/50 dark:border-gray-600/50 hover:border-[#09c6f9]/50 transition-all duration-300 shadow-md hover:shadow-lg"
                    aria-labelledby={`additional-highlight-${highlight.id}`}
                  >
                    <div className="flex items-center space-x-4 sm:space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#09c6f9]/30 to-[#045de9]/30 rounded-lg flex items-center justify-center">
                          <Icon size={28} sm={32} className="text-[#09c6f9]" aria-hidden="true" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 
                          id={`additional-highlight-${highlight.id}`}
                          className="text-base sm:text-lg md:text-xl font-semibold text-white dark:text-gray-100 mb-2 sm:mb-3"
                        >
                          {highlight.title}
                        </h4>
                        <p className="text-gray-400 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </motion.div>
      </div>

      {/* Reduced Motion Support */}
      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse {
            animation: none;
          }
          [data-animate] {
            transition: none !important;
          }
          [data-motion] {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;