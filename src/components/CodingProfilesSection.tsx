import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { FaGithub, FaLinkedin, FaGlobe, FaEye, FaArrowLeft, FaChartBar } from "react-icons/fa";

// Icon map
const iconMap: { [key: string]: React.ComponentType<{ size: number; className?: string }> } = {
  FaGithub,
  FaLinkedin,
  FaGlobe,
};

// Hardcoded profiles from resume
const codingProfiles = [
  {
    id: "1",
    name: "GitHub",
    icon: "FaGithub",
    description: "My open-source projects & contributions",
    link: "https://github.com/naveen-yn",
    isActive: true,
    hasLiveStats: false,
  },
  {
    id: "2",
    name: "LinkedIn",
    icon: "FaLinkedin",
    description: "My professional network & achievements",
    link: "https://www.linkedin.com/in/Naveen-YN",
    isActive: true,
    hasLiveStats: false,
  },
  {
    id: "3",
    name: "Portfolio",
    icon: "FaGlobe",
    description: "Showcase of my projects and skills",
    link: "https://naveenyn-portfolio.com", // Placeholder; replace with actual portfolio URL
    isActive: true,
    hasLiveStats: false,
  },
];

const getIconColor = (iconName: string) => {
  switch (iconName) {
    case "FaGithub": return "text-gray-200";
    case "FaLinkedin": return "text-blue-400";
    case "FaGlobe": return "text-teal-400";
    default: return "text-blue-400";
  }
};

const getCardGradient = (iconName: string) => {
  switch (iconName) {
    case "FaGithub": return "from-gray-600/20 to-slate-800/20";
    case "FaLinkedin": return "from-blue-500/20 to-cyan-500/20";
    case "FaGlobe": return "from-teal-500/20 to-emerald-500/20";
    default: return "from-blue-500/20 to-cyan-500/20";
  }
};

const CodingProfilesSection: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({});

  const handleCardFlip = (profileId: string) => {
    setFlippedCards((prev) => ({ ...prev, [profileId]: !prev[profileId] }));
  };

  return (
    <section id="coding-profiles" className="py-24 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10"></div>
      <div className="absolute top-1/4 left-1/5 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/5 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 sm:px-12 md:px-16 lg:px-24 relative z-10">
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            Coding <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#09c6f9] to-[#045de9]">Profiles</span>
          </h2>
          <motion.div
            className="h-1 w-40 mx-auto bg-gradient-to-r from-[#09c6f9] to-[#045de9] rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-gray-300 text-lg mt-6 max-w-3xl mx-auto">
            Discover my professional presence and contributions across key platforms
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {codingProfiles.filter(p => p.isActive).map((profile, index) => {
            const IconComponent = iconMap[profile.icon] || FaGlobe;
            const isFlipped = flippedCards[profile.id];

            return (
              <Tilt
                key={profile.id}
                options={{ max: 15, scale: 1.05, speed: 400 }}
                className="relative h-80"
              >
                <motion.div
                  className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
                >
                  {/* Front */}
                  <div
                    className={`absolute inset-0 backface-hidden bg-gradient-to-br ${getCardGradient(profile.icon)} rounded-3xl border border-gray-600/30 shadow-xl p-8 flex flex-col items-center justify-center backdrop-blur-xl ${isFlipped ? "hidden" : "block"}`}
                  >
                    <IconComponent size={64} className={`${getIconColor(profile.icon)} drop-shadow-md`} />
                    <h3 className="text-2xl font-bold text-white mt-6">{profile.name}</h3>
                    <p className="text-gray-300 text-sm mt-3 text-center">{profile.description}</p>
                    <div className="mt-8 flex gap-4">
                      <a
                        href={profile.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#09c6f9]/20 to-[#045de9]/20 hover:from-[#09c6f9]/30 hover:to-[#045de9]/30 text-white rounded-lg text-sm font-medium transition-all shadow-md"
                      >
                        <FaEye size={16} /> Visit
                      </a>
                      {profile.hasLiveStats && (
                        <button
                          onClick={() => handleCardFlip(profile.id)}
                          className="flex items-center gap-2 px-5 py-2 bg-[#045de9]/30 text-[#09c6f9] rounded-lg text-sm font-medium transition-all shadow-md"
                        >
                          <FaChartBar size={16} /> Stats
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Back (Stats Placeholder) */}
                  {profile.hasLiveStats && (
                    <div
                      className={`absolute inset-0 backface-hidden rotate-y-180 bg-gray-900/80 rounded-3xl p-8 flex flex-col justify-between backdrop-blur-xl ${isFlipped ? "block" : "hidden"}`}
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-white text-xl font-semibold">{profile.name} Stats</h3>
                        <button onClick={() => handleCardFlip(profile.id)}>
                          <FaArrowLeft className="text-gray-300 hover:text-white" size={20} />
                        </button>
                      </div>
                      <p className="text-gray-300 text-sm">Stats placeholder (expandable for live data)</p>
                    </div>
                  )}
                </motion.div>
              </Tilt>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CodingProfilesSection;