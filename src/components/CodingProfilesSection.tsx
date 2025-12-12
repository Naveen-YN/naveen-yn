import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { FaGithub, FaLinkedin, FaGlobe, FaCode } from "react-icons/fa";
import { CheckCircle } from "lucide-react";

// Icon map
const iconMap: { [key: string]: React.ComponentType<{ size: number; className?: string }> } = {
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaCode,
};

interface CodingProfile {
  id: string;
  name: string;
  icon: string;
  link: string;
  isActive: boolean;
}

const codingProfiles: CodingProfile[] = [
  {
    id: "1",
    name: "GitHub",
    icon: "FaGithub",
    link: "https://github.com/naveen-yn",
    isActive: true,
  },
  {
    id: "2",
    name: "LeetCode",
    icon: "FaCode",
    link: "https://leetcode.com/u/naveen_yn", // Placeholder; replace with actual LeetCode URL
    isActive: true,
  },
];

const getIconColor = (iconName: string) => {
  switch (iconName) {
    case "FaGithub": return { text: "text-gray-200", bg: "bg-gray-500/20" };
    case "FaLinkedin": return { text: "text-blue-400", bg: "bg-blue-500/20" };
    case "FaGlobe": return { text: "text-teal-400", bg: "bg-teal-500/20" };
    case "FaCode": return { text: "text-orange-400", bg: "bg-orange-500/20" };
    default: return { text: "text-blue-400", bg: "bg-blue-500/20" };
  }
};

const getCardGradient = (iconName: string) => {
  switch (iconName) {
    case "FaGithub": return "from-gray-600/30 to-slate-800/30";
    case "FaLinkedin": return "from-blue-500/30 to-cyan-500/30";
    case "FaGlobe": return "from-teal-500/30 to-emerald-500/30";
    case "FaCode": return "from-orange-500/30 to-amber-500/30";
    default: return "from-blue-500/30 to-cyan-500/30";
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

const CodingProfilesSection: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section id="coding-profiles" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-black to-purple-950/20"></div>
      <div className="absolute top-1/4 left-1/5 w-80 h-80 bg-blue-600/10 rounded-full blur-4xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/5 w-80 h-80 bg-purple-600/10 rounded-full blur-4xl animate-pulse"></div>

      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 font-sans">
            Coding{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
              Profiles
            </span>
          </h2>
          <motion.div
            className="h-1 w-40 mx-auto bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <p className="text-gray-300 text-lg md:text-xl mt-6 max-w-3xl mx-auto leading-relaxed font-sans">
            Explore my coding journey through active contributions and professional presence on leading platforms.
          </p>
        </motion.div>

        {isClient && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {codingProfiles.filter((p) => p.isActive).map((profile, index) => {
              const IconComponent = iconMap[profile.icon] || FaGlobe;
              const { text, bg } = getIconColor(profile.icon);

              return (
                <Tilt
                  key={profile.id}
                  options={{ max: 15, scale: 1.05, speed: 400 }}
                  className="relative h-80"
                >
                  <motion.a
                    href={profile.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative block w-full h-full bg-black/90 backdrop-blur-2xl rounded-2xl ${bg} shadow-xl overflow-hidden group`}
                    variants={cardVariants}
                    aria-label={`Visit ${profile.name} profile`}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${getCardGradient(profile.icon)}`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="flex items-center justify-center h-full">
                        <IconComponent size={80} className={`${text} drop-shadow-lg group-hover:animate-pulse`} />
                      </div>
                    </div>
                    <div className="p-6 flex justify-center items-center">
                      <div className="flex items-center gap-2">
                        <IconComponent size={20} className={`${text} group-hover:animate-pulse`} />
                        <h3 className="font-semibold text-white text-base md:text-lg leading-tight font-sans line-clamp-2 text-center">
                          {profile.name}
                        </h3>
                        <CheckCircle size={16} className="text-blue-500" aria-label={`${profile.name} verified`} />
                      </div>
                    </div>
                  </motion.a>
                </Tilt>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CodingProfilesSection;