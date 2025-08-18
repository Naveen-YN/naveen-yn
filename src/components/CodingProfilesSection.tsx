import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaCode, FaChartBar, FaEye, FaStar, FaCodeBranch, FaUsers, FaTrophy, FaFire, FaCalendarAlt, FaArrowLeft, FaClock, FaBolt, FaDatabase } from "react-icons/fa";
import { SiLeetcode, SiCodechef, SiGeeksforgeeks, SiHackerrank } from "react-icons/si";
import { Target } from "lucide-react";
import { useData, CodingProfile } from "../contexts/DataContext";

const iconMap: { [key: string]: React.ComponentType<{ size: number; className?: string }> } = {
  FaGithub,
  FaCode,
  SiLeetcode,
  SiCodechef,
  SiGeeksforgeeks,
  SiHackerrank,
  FaDatabase
};

const CodingProfilesSection: React.FC = () => {
  const { codingProfiles, setCodingProfiles } = useData();
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({});
  const [loadingStats, setLoadingStats] = useState<{ [key: string]: boolean }>({});

  // Filter only active profiles
  const activeProfiles = codingProfiles.filter(profile => profile.isActive);

  // Fetch GitHub stats from real API
  const fetchGitHubStats = async (username: string) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (response.ok) {
        const data = await response.json();
        return {
          public_repos: data.public_repos,
          followers: data.followers,
          following: data.following,
          created_at: data.created_at,
          bio: data.bio || '',
          location: data.location || '',
          company: data.company || '',
          totalStars: 0, // Would need additional API calls to calculate
          totalCommits: 0, // Would need additional API calls to calculate
          contributionsThisYear: 0 // Would need additional API calls to calculate
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching GitHub stats:', error);
      return null;
    }
  };

  const handleCardFlip = async (profileId: string, hasLiveStats: boolean) => {
    const isFlipping = !flippedCards[profileId];
    setFlippedCards(prev => ({ ...prev, [profileId]: isFlipping }));

    if (isFlipping && hasLiveStats) {
      setLoadingStats(prev => ({ ...prev, [profileId]: true }));
      
      // Find the profile
      const profile = codingProfiles.find(p => p.id === profileId);
      
      if (profile?.name === "GitHub" && profile.username) {
        // Fetch real GitHub stats
        const githubStats = await fetchGitHubStats(profile.username);
        if (githubStats) {
          // Update the profile with real stats
          const updatedProfiles = codingProfiles.map(p => 
            p.id === profileId 
              ? { ...p, customStats: { ...p.customStats, github: githubStats } }
              : p
          );
          setCodingProfiles(updatedProfiles);
        }
      }
      
      // Simulate loading for other platforms
      setTimeout(() => {
        setLoadingStats(prev => ({ ...prev, [profileId]: false }));
      }, 1000);
    }
  };

  const getIconColor = (iconName: string) => {
    switch (iconName) {
      case 'SiLeetcode': return 'text-yellow-500';
      case 'SiGeeksforgeeks': return 'text-green-500';
      case 'FaGithub': return 'text-white';
      case 'SiCodechef': return 'text-gray-400';
      case 'SiHackerrank': return 'text-green-400';
      case 'FaDatabase': return 'text-blue-400';
      default: return 'text-blue-400';
    }
  };

  const getCardGradient = (iconName: string) => {
    switch (iconName) {
      case 'SiLeetcode': return 'from-yellow-500/20 to-orange-500/20';
      case 'SiGeeksforgeeks': return 'from-green-500/20 to-emerald-500/20';
      case 'FaGithub': return 'from-gray-500/20 to-slate-500/20';
      case 'SiCodechef': return 'from-amber-500/20 to-yellow-500/20';
      case 'SiHackerrank': return 'from-green-400/20 to-teal-500/20';
      case 'FaDatabase': return 'from-blue-500/20 to-cyan-500/20';
      default: return 'from-blue-500/20 to-cyan-500/20';
    }
  };

  const renderStatsBack = (profile: CodingProfile) => {
    const isLoading = loadingStats[profile.id];

    if (profile.name === "GitHub" && profile.customStats?.github) {
      const stats = profile.customStats.github;
      return (
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-600/50 p-3 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between mb-2 flex-shrink-0">
            <div className="flex items-center gap-1">
              <FaGithub size={16} className="text-white" />
              <h3 className="text-xs font-bold text-white">GitHub Stats</h3>
            </div>
            <button
              onClick={() => handleCardFlip(profile.id, profile.hasLiveStats)}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <FaArrowLeft size={12} />
            </button>
          </div>
          
          {/* Stats Grid - Optimized for space */}
          <div className="flex-1 space-y-2 overflow-y-auto">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-black/40 rounded-lg p-2 text-center min-h-0">
                <div className="text-white font-bold text-sm">{stats.public_repos}</div>
                <div className="text-gray-400 text-xs">Repos</div>
              </div>
              <div className="bg-black/40 rounded-lg p-2 text-center min-h-0">
                <div className="text-white font-bold text-sm">{stats.followers}</div>
                <div className="text-gray-400 text-xs">Followers</div>
              </div>
            </div>
            
            <div className="bg-black/40 rounded-lg p-2 text-center">
              <div className="text-white font-bold text-sm">{stats.following}</div>
              <div className="text-gray-400 text-xs">Following</div>
            </div>
            
            {/* Additional Stats */}
            {stats.totalStars && (
              <div className="bg-black/40 rounded-lg p-2 text-center">
                <div className="text-yellow-400 font-bold text-sm">{stats.totalStars}</div>
                <div className="text-gray-400 text-xs">Total Stars</div>
              </div>
            )}
            
            {/* Member Since */}
            <div className="bg-black/40 rounded-lg p-2">
              <div className="text-gray-300 text-xs text-center">
                <div className="font-medium">Member since</div>
                <div>{new Date(stats.created_at).getFullYear()}</div>
              </div>
            </div>
            
            {stats.location && (
              <div className="text-center">
                <div className="text-gray-400 text-xs truncate">📍 {stats.location}</div>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (profile.name === "LeetCode" && profile.customStats?.leetcode) {
      const stats = profile.customStats.leetcode;
      return (
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-yellow-800/95 to-orange-800/95 backdrop-blur-xl rounded-2xl border border-yellow-600/50 p-3 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between mb-2 flex-shrink-0">
            <div className="flex items-center gap-1">
              <SiLeetcode size={16} className="text-yellow-400" />
              <h3 className="text-xs font-bold text-white">LeetCode Stats</h3>
            </div>
            <button
              onClick={() => handleCardFlip(profile.id, profile.hasLiveStats)}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <FaArrowLeft size={12} />
            </button>
          </div>
          
          {/* Stats Content - Optimized for space */}
          <div className="flex-1 space-y-2 overflow-y-auto">
            {/* Currently Attempting */}
            {stats.currentlyAttempting && (
              <div className="bg-black/40 rounded-lg p-2">
                <div className="flex items-center gap-1 mb-1">
                  <Target size={10} className="text-yellow-400" />
                  <span className="text-yellow-400 text-xs font-medium">Now Attempting</span>
                </div>
                <div className="text-white text-xs truncate">{stats.currentlyAttempting}</div>
              </div>
            )}
            
            {/* Total Solved */}
            <div className="bg-black/40 rounded-lg p-2 text-center">
              <div className="text-yellow-400 font-bold text-base">
                {stats.totalSolved}
              </div>
              <div className="text-gray-300 text-xs">Problems Solved</div>
            </div>
            
            {/* Difficulty Breakdown */}
            <div className="grid grid-cols-3 gap-1">
              <div className="bg-green-500/30 rounded-lg p-1.5 text-center">
                <div className="text-green-300 font-bold text-xs">{stats.easySolved}</div>
                <div className="text-gray-300 text-xs">Easy</div>
              </div>
              <div className="bg-yellow-500/30 rounded-lg p-1.5 text-center">
                <div className="text-yellow-300 font-bold text-xs">{stats.mediumSolved}</div>
                <div className="text-gray-300 text-xs">Medium</div>
              </div>
              <div className="bg-red-500/30 rounded-lg p-1.5 text-center">
                <div className="text-red-300 font-bold text-xs">{stats.hardSolved}</div>
                <div className="text-gray-300 text-xs">Hard</div>
              </div>
            </div>
            
            {/* Additional Stats */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-black/40 rounded-lg p-2 text-center">
                <div className="text-white font-bold text-xs">{stats.acceptanceRate}%</div>
                <div className="text-gray-400 text-xs">Acceptance</div>
              </div>
              <div className="bg-black/40 rounded-lg p-2 text-center">
                <div className="text-white font-bold text-xs">{stats.contestRating}</div>
                <div className="text-gray-400 text-xs">Rating</div>
              </div>
            </div>
            
            {/* Streak and Recent Activity */}
            {(stats.streak || stats.recentSubmissions) && (
              <div className="grid grid-cols-2 gap-2">
                {stats.streak && (
                  <div className="bg-orange-500/30 rounded-lg p-2 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <FaFire size={10} className="text-orange-400" />
                      <span className="text-orange-400 font-bold text-xs">{stats.streak}</span>
                    </div>
                    <div className="text-gray-400 text-xs">Day Streak</div>
                  </div>
                )}
                {stats.recentSubmissions && (
                  <div className="bg-blue-500/30 rounded-lg p-2 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <FaBolt size={10} className="text-blue-400" />
                      <span className="text-blue-400 font-bold text-xs">{stats.recentSubmissions}</span>
                    </div>
                    <div className="text-gray-400 text-xs">Recent</div>
                  </div>
                )}
              </div>
            )}
            
            {/* Global Ranking */}
            {stats.globalRanking && (
              <div className="bg-black/40 rounded-lg p-2 text-center">
                <div className="text-white font-bold text-xs">#{stats.globalRanking.toLocaleString()}</div>
                <div className="text-gray-400 text-xs">Global Ranking</div>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-600/50 p-6 flex flex-col justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <div className="text-white text-sm text-center">Loading live stats...</div>
          <div className="text-gray-400 text-xs text-center mt-2">Please wait</div>
        </div>
      );
    }

    return (
      <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-600/50 p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white">Platform Stats</h3>
          <button
            onClick={() => handleCardFlip(profile.id, profile.hasLiveStats)}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <FaArrowLeft size={14} />
          </button>
        </div>
        
        <div className="flex-1 flex flex-col justify-center items-center">
          <FaCode size={32} className="text-gray-500 mb-3" />
          <div className="text-white text-sm text-center mb-2">
            {profile.hasLiveStats ? 'Stats not configured' : 'Live stats not available'}
          </div>
          <div className="text-gray-400 text-xs text-center">
            {profile.hasLiveStats ? 'Configure in admin panel' : 'This platform doesn\'t provide public API access'}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="coding-profiles" className="py-20 bg-black relative overflow-hidden">
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
              Coding <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#09c6f9] to-[#045de9]">Profiles</span>
            </h2>
            <motion.div
              className="h-1 w-32 mx-auto bg-gradient-to-r from-[#09c6f9] to-[#045de9] rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>
          <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
            Explore my coding journey across various competitive programming platforms
          </p>
        </motion.div>

        {/* Profile Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeProfiles.map((profile, index) => {
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
                {/* Card Container */}
                <div 
                  className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* Front Side */}
                  <div className={`absolute inset-0 backface-hidden bg-gradient-to-br ${getCardGradient(profile.icon)} backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl transition-all duration-500 hover:shadow-3xl hover:border-opacity-60 group`}>
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${getCardGradient(profile.icon)} rounded-2xl blur-sm group-hover:blur-none transition-all duration-500`}></div>
                    
                    {/* Content */}
                    <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                      <motion.div
                        className="mb-6 group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <IconComponent size={56} className={getIconColor(profile.icon)} />
                      </motion.div>
                      
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#09c6f9] transition-colors duration-300">
                        {profile.name}
                      </h3>
                      
                      {profile.description && (
                        <p className="text-gray-400 text-sm mb-4 text-center">
                          {profile.description}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-3 mt-6">
                        <motion.a
                          href={profile.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-all duration-300 border border-white/20 hover:border-white/40"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaEye size={14} />
                          <span>Visit Profile</span>
                        </motion.a>
                        
                        {profile.hasLiveStats && (
                          <motion.button
                            onClick={() => handleCardFlip(profile.id, profile.hasLiveStats)}
                            className="flex items-center gap-2 px-4 py-2 bg-[#045de9]/20 hover:bg-[#045de9]/30 text-[#09c6f9] rounded-lg text-sm transition-all duration-300 border border-[#09c6f9]/30 hover:border-[#09c6f9]/50"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FaChartBar size={14} />
                            <span>Live Stats</span>
                          </motion.button>
                        )}
                      </div>
                      
                      {profile.hasLiveStats && (
                        <div className="absolute top-4 right-4">
                          <motion.div
                            className="w-3 h-3 bg-green-500 rounded-full shadow-lg"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            title="Live stats available"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Back Side - Stats */}
                  {profile.hasLiveStats && renderStatsBack(profile)}
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${getCardGradient(profile.icon).replace('/20', '/10')} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`}></div>
              </motion.div>
            );
          })}
        </div>



        {/* Note about APIs */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
        </motion.div>
      </div>
    </section>
  );
};

export default CodingProfilesSection;