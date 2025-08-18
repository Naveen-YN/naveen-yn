import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  FaGithub, FaCode, FaChartBar, FaEye, FaArrowLeft 
} from "react-icons/fa";
import { 
  SiLeetcode, SiCodechef, SiGeeksforgeeks, SiHackerrank 
} from "react-icons/si";

// Icon map
const iconMap: { [key: string]: React.ComponentType<{ size: number; className?: string }> } = {
  FaGithub,
  FaCode,
  SiLeetcode,
  SiCodechef,
  SiGeeksforgeeks,
  SiHackerrank,
};

// Hardcoded profiles (instead of database/context)
const codingProfiles = [
  {
    id: "1",
    name: "GitHub",
    icon: "FaGithub",
    description: "My open-source projects & contributions",
    link: "https://github.com/your-username",
    isActive: true,
    hasLiveStats: false, // set true if you want stats
  },
  {
    id: "2",
    name: "LeetCode",
    icon: "SiLeetcode",
    description: "DSA practice & coding challenges",
    link: "https://leetcode.com/your-username",
    isActive: true,
    hasLiveStats: false,
  },
  {
    id: "3",
    name: "CodeChef",
    icon: "SiCodechef",
    description: "Competitive programming contests",
    link: "https://www.codechef.com/users/your-username",
    isActive: true,
    hasLiveStats: false,
  },
  {
    id: "4",
    name: "GeeksforGeeks",
    icon: "SiGeeksforgeeks",
    description: "Problem solving & learning",
    link: "https://auth.geeksforgeeks.org/user/your-username/practice",
    isActive: true,
    hasLiveStats: false,
  },
  {
    id: "5",
    name: "HackerRank",
    icon: "SiHackerrank",
    description: "Programming certifications & skills",
    link: "https://www.hackerrank.com/your-username",
    isActive: true,
    hasLiveStats: false,
  },
];

const getIconColor = (iconName: string) => {
  switch (iconName) {
    case "SiLeetcode": return "text-yellow-500";
    case "SiGeeksforgeeks": return "text-green-500";
    case "FaGithub": return "text-white";
    case "SiCodechef": return "text-gray-400";
    case "SiHackerrank": return "text-green-400";
    default: return "text-blue-400";
  }
};

const getCardGradient = (iconName: string) => {
  switch (iconName) {
    case "SiLeetcode": return "from-yellow-500/20 to-orange-500/20";
    case "SiGeeksforgeeks": return "from-green-500/20 to-emerald-500/20";
    case "FaGithub": return "from-gray-500/20 to-slate-500/20";
    case "SiCodechef": return "from-amber-500/20 to-yellow-500/20";
    case "SiHackerrank": return "from-green-400/20 to-teal-500/20";
    default: return "from-blue-500/20 to-cyan-500/20";
  }
};

const CodingProfilesSection: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({});

  const handleCardFlip = (profileId: string) => {
    setFlippedCards((prev) => ({ ...prev, [profileId]: !prev[profileId] }));
  };

  return (
    <section id="coding-profiles" className="py-20 bg-black relative overflow-hidden">
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
            Coding <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#09c6f9] to-[#045de9]">Profiles</span>
          </h2>
          <motion.div
            className="h-1 w-32 mx-auto bg-gradient-to-r from-[#09c6f9] to-[#045de9] rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
            Explore my coding journey across competitive programming platforms
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {codingProfiles.filter(p => p.isActive).map((profile, index) => {
            const IconComponent = iconMap[profile.icon] || FaCode;
            const isFlipped = flippedCards[profile.id];

            return (
              <motion.div
                key={profile.id}
                className="relative h-72 perspective-1000"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div 
                  className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                    isFlipped ? "rotate-y-180" : ""
                  }`}
                >
                  {/* Front */}
                  <div className={`absolute inset-0 backface-hidden bg-gradient-to-br ${getCardGradient(profile.icon)} rounded-2xl border border-gray-700/50 shadow-2xl p-6 flex flex-col items-center justify-center`}>
                    <IconComponent size={56} className={getIconColor(profile.icon)} />
                    <h3 className="text-2xl font-bold text-white mt-4">{profile.name}</h3>
                    <p className="text-gray-400 text-sm mt-2">{profile.description}</p>
                    <div className="mt-6 flex gap-3">
                      <a 
                        href={profile.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-all"
                      >
                        <FaEye size={14} /> Visit
                      </a>
                      {profile.hasLiveStats && (
                        <button
                          onClick={() => handleCardFlip(profile.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-[#045de9]/20 text-[#09c6f9] rounded-lg text-sm"
                        >
                          <FaChartBar size={14} /> Stats
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Back (optional stats placeholder) */}
                  {profile.hasLiveStats && (
                    <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gray-800 rounded-2xl p-6 flex flex-col justify-between">
                      <div className="flex justify-between items-center">
                        <h3 className="text-white text-lg">{profile.name} Stats</h3>
                        <button onClick={() => handleCardFlip(profile.id)}>
                          <FaArrowLeft className="text-gray-300" />
                        </button>
                      </div>
                      <p className="text-gray-400 text-sm">Stats placeholder (can be expanded later)</p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CodingProfilesSection;
