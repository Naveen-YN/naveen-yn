import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { User, Code, Target, Lightbulb, Briefcase } from "lucide-react";

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // 🔹 Hardcoded About Me Data
  const aboutMeData = {
    profilePicture: "", // You can add an image URL here
    tagline: "Aspiring Software Engineer | AI & ML Enthusiast",
    location: "India",
  };

  // 🔹 Hardcoded Key Highlights
  const keyHighlights = [
    {
      id: 1,
      title: "Strong Problem Solving",
      description:
        "Skilled in Data Structures and Algorithms with C++ and Python.",
      icon: "Code",
      isActive: true,
    },
    {
      id: 2,
      title: "Full-Stack Development",
      description:
        "Hands-on experience with React, Node.js, Express, and MongoDB.",
      icon: "Briefcase",
      isActive: true,
    },
    {
      id: 3,
      title: "Machine Learning",
      description:
        "Practical exposure to AI/ML projects including predictive models.",
      icon: "Lightbulb",
      isActive: true,
    },
    {
      id: 4,
      title: "Career Goal",
      description:
        "Eager to contribute in a collaborative environment and grow as a software engineer.",
      icon: "Target",
      isActive: true,
    },
  ];

  // 🔹 Hardcoded Additional Highlights
  const additionalHighlights = [
    {
      id: 1,
      title: "Cloud & DevOps",
      description:
        "Knowledge of AWS, Docker, and Linux system administration.",
      icon: "Briefcase",
      isActive: true,
    },
    {
      id: 2,
      title: "Continuous Learner",
      description:
        "Always exploring new technologies and building side projects.",
      icon: "Lightbulb",
      isActive: true,
    },
  ];

  const iconMap = {
    Code: Code,
    Target: Target,
    Lightbulb: Lightbulb,
    Briefcase: Briefcase,
  };

  // Intersection observer for fade-in
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
      className="bg-black relative overflow-hidden py-20"
      ref={sectionRef}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-purple-900/5"></div>
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 sm:px-12 md:px-20 lg:px-32 relative z-10">
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-wider mb-4">
            About{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#09c6f9] to-[#045de9]">
              Me
            </span>
          </h2>
          <motion.div
            className="h-1 w-32 mx-auto bg-gradient-to-r from-[#09c6f9] to-[#045de9] rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 items-start">
          {/* About Me Card */}
          <motion.div
            className="xl:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative group">
              <div className="relative bg-black/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-gray-700/50 shadow-2xl transition-all duration-500">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#09c6f9] to-[#045de9] rounded-2xl flex items-center justify-center mr-4 overflow-hidden">
                    {aboutMeData.profilePicture ? (
                      <img
                        src={aboutMeData.profilePicture}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    ) : (
                      <User size={32} className="text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Naveen Yanamadala
                    </h3>
                    <p className="text-gray-400">{aboutMeData.tagline}</p>
                    {aboutMeData.location && (
                      <p className="text-gray-500 text-sm">
                        {aboutMeData.location}
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-gray-300 text-lg leading-relaxed text-justify">
                  I’m a recent Computer Science and Engineering graduate (2025)
                  with a specialization in AI and Machine Learning. I have a
                  solid understanding of core programming concepts, particularly
                  in C++ and Python, and strong problem-solving skills grounded
                  in data structures and algorithms. I'm comfortable working
                  with both frontend and backend technologies, cloud tools, and
                  Linux-based systems. I enjoy building scalable, efficient
                  solutions and learning new technologies along the way. I’m
                  looking for an opportunity where I can contribute meaningfully,
                  keep learning, and grow as a software engineer in a
                  collaborative environment.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Key Highlights */}
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
              {keyHighlights
                .filter((h) => h.isActive)
                .map((highlight) => {
                  const Icon =
                    iconMap[highlight.icon as keyof typeof iconMap] || Code;
                  return (
                    <motion.div
                      key={highlight.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      className="relative bg-black/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#09c6f9]/20 to-[#045de9]/20 rounded-xl flex items-center justify-center">
                            <Icon size={24} className="text-[#09c6f9]" />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">
                            {highlight.title}
                          </h4>
                          <p className="text-gray-400 text-sm">
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

        {/* Additional Highlights */}
        <motion.div
          className="mt-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {additionalHighlights
              .filter((h) => h.isActive)
              .map((highlight) => {
                const Icon =
                  iconMap[highlight.icon as keyof typeof iconMap] || Code;
                return (
                  <motion.div
                    key={highlight.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="relative bg-black/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#09c6f9]/20 to-[#045de9]/20 rounded-xl flex items-center justify-center">
                          <Icon size={24} className="text-[#09c6f9]" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">
                          {highlight.title}
                        </h4>
                        <p className="text-gray-400 text-sm">
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
    </section>
  );
};

export default AboutSection;
