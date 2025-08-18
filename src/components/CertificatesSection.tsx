import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Calendar, ExternalLink, X, Eye, Download, Star, Trophy, Medal, Shield, CheckCircle, Zap } from "lucide-react";
import { useData } from "../contexts/DataContext";

const CertificatesSection: React.FC = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { certificates } = useData();

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

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'Technical': return Zap;
      case 'Professional': return Trophy;
      case 'Academic': return Medal;
      case 'Security': return Shield;
      case 'Achievement': return Star;
      default: return Award;
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'Technical': return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400';
      case 'Professional': return 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400';
      case 'Academic': return 'from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400';
      case 'Security': return 'from-red-500/20 to-orange-500/20 border-red-500/30 text-red-400';
      case 'Achievement': return 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30 text-yellow-400';
      default: return 'from-gray-500/20 to-slate-500/20 border-gray-500/30 text-gray-400';
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
    <section id="certificates" className="py-20 bg-black relative overflow-hidden">
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
              Certifications <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#09c6f9] to-[#045de9]">& Achievements</span>
            </h2>
            <motion.div
              className="h-1 w-32 mx-auto bg-gradient-to-r from-[#09c6f9] to-[#045de9] rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>
          <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
            Professional certifications and achievements that validate my expertise and commitment to continuous learning
          </p>
        </motion.div>

        {/* Certification Cards */}
        <motion.div 
          ref={sectionRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {certificates.map((cert, index) => {
            const CategoryIcon = getCategoryIcon(cert.category);
            const categoryColors = getCategoryColor(cert.category);
            
            return (
              <motion.div
                key={cert.id}
                variants={cardVariants}
                layout
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                {/* Card Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors.split(' ')[0]} ${categoryColors.split(' ')[1]} rounded-2xl blur-sm group-hover:blur-none transition-all duration-500`}></div>
                
                {/* Main Card */}
                <div className={`relative bg-black/80 backdrop-blur-xl rounded-2xl border ${categoryColors.split(' ')[2]} shadow-2xl transition-all duration-500 group-hover:shadow-3xl group-hover:border-opacity-60 overflow-hidden h-full flex flex-col cursor-pointer`}
                     onClick={() => setSelectedCertificate(cert)}>
                  
                  {/* Certificate Image */}
                  <div className="relative overflow-hidden h-48 bg-gradient-to-br from-gray-800 to-gray-900">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          const placeholder = document.createElement('div');
                          placeholder.className = 'w-full h-full flex items-center justify-center bg-gray-800';
                          placeholder.innerHTML = `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-600"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>`;
                          parent.appendChild(placeholder);
                        }
                      }}
                    />
                    
                    {/* Overlay with Category */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                      {cert.category && (
                        <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                          <CategoryIcon size={12} className={categoryColors.split(' ')[3]} />
                          <span className="text-white text-xs">{cert.category}</span>
                        </div>
                      )}
                      
                      {/* Verification Badge */}
                      {cert.verified && (
                        <div className="absolute top-4 left-4 bg-green-500/20 backdrop-blur-sm rounded-full p-2 border border-green-500/30">
                          <CheckCircle size={16} className="text-green-400" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Certificate Content */}
                  <div className="p-6 flex-grow flex flex-col">
                    {/* Header */}
                    <div className="mb-4">
                      <h3 className={`text-lg font-bold text-white group-hover:${categoryColors.split(' ')[3]} transition-colors duration-300 line-clamp-2 mb-2`}>
                        {cert.title}
                      </h3>
                      
                      {cert.issuer && (
                        <p className="text-gray-400 text-sm font-medium">
                          Issued by {cert.issuer}
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">
                      {cert.description}
                    </p>

                    {/* Certificate Meta */}
                    <div className="space-y-3 mt-auto">
                      {/* Date and Expiry */}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        {cert.issueDate && (
                          <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            <span>{cert.issueDate}</span>
                          </div>
                        )}
                        {cert.expiryDate && (
                          <div className="flex items-center gap-1">
                            <span>Expires: {cert.expiryDate}</span>
                          </div>
                        )}
                      </div>

                      {/* Skills/Tags */}
                      {cert.skills && cert.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {cert.skills.slice(0, 3).map((skill, i) => (
                            <span key={i} className="text-xs bg-gray-800/50 text-gray-300 px-2 py-1 rounded-full border border-gray-700/50">
                              {skill}
                            </span>
                          ))}
                          {cert.skills.length > 3 && (
                            <span className="text-xs text-gray-500 px-2 py-1">
                              +{cert.skills.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCertificate(cert);
                          }}
                          className="flex items-center gap-1 px-3 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-white rounded-lg text-xs transition-all duration-300 border border-gray-700/50 hover:border-[#09c6f9]/30 flex-1 justify-center"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Eye size={14} />
                          <span>View</span>
                        </motion.button>
                        
                        {cert.credentialUrl && (
                          <motion.a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1 px-3 py-2 bg-[#045de9]/20 hover:bg-[#045de9]/30 text-[#09c6f9] rounded-lg text-xs transition-all duration-300 border border-[#09c6f9]/30 hover:border-[#09c6f9]/50 flex-1 justify-center"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <ExternalLink size={14} />
                            <span>Verify</span>
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${categoryColors.split(' ')[0].replace('/20', '/10')} ${categoryColors.split(' ')[1].replace('/20', '/10')} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`}></div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Empty State */}
        {certificates.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Award size={64} className="mx-auto mb-6 text-gray-600" />
            <h3 className="text-2xl font-bold text-gray-400 mb-4">No Certificates Found</h3>
            <p className="text-gray-500 mb-6">Add your first certificate to get started</p>
          </motion.div>
        )}

        {/* Modal for Enlarged Certificate - Fixed z-index */}
        <AnimatePresence>
          {selectedCertificate && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-[9999] p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCertificate(null)}
              style={{ zIndex: 9999 }}
            >
              <motion.div
                className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-700 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                  <div className="flex items-center gap-3">
                    {selectedCertificate.category && (
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${getCategoryColor(selectedCertificate.category).split(' ')[0]} ${getCategoryColor(selectedCertificate.category).split(' ')[1]}`}>
                        {React.createElement(getCategoryIcon(selectedCertificate.category), { 
                          size: 20, 
                          className: getCategoryColor(selectedCertificate.category).split(' ')[3] 
                        })}
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-white">{selectedCertificate.title}</h3>
                      {selectedCertificate.issuer && (
                        <p className="text-gray-400 text-sm">Issued by {selectedCertificate.issuer}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCertificate(null)}
                    className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Certificate Image */}
                    <div className="space-y-4">
                      <img
                        src={selectedCertificate.image}
                        alt={selectedCertificate.title}
                        referrerPolicy="no-referrer"
                        className="w-full rounded-xl shadow-lg"
                      />
                      
                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        {selectedCertificate.credentialUrl && (
                          <a
                            href={selectedCertificate.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-[#045de9] hover:bg-[#09c6f9] text-white rounded-lg transition-colors duration-300 flex-1 justify-center"
                          >
                            <ExternalLink size={18} />
                            Verify Credential
                          </a>
                        )}
                        <button
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = selectedCertificate.image;
                            link.download = `${selectedCertificate.title}.jpg`;
                            link.click();
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300"
                        >
                          <Download size={18} />
                          Download
                        </button>
                      </div>
                    </div>

                    {/* Certificate Details */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Description</h4>
                        <p className="text-gray-300 leading-relaxed">{selectedCertificate.description}</p>
                      </div>

                      {/* Certificate Info */}
                      <div className="grid grid-cols-2 gap-4">
                        {selectedCertificate.issueDate && (
                          <div className="bg-gray-800/50 rounded-lg p-4">
                            <div className="text-gray-400 text-sm mb-1">Issue Date</div>
                            <div className="text-white font-medium">{selectedCertificate.issueDate}</div>
                          </div>
                        )}
                        {selectedCertificate.expiryDate && (
                          <div className="bg-gray-800/50 rounded-lg p-4">
                            <div className="text-gray-400 text-sm mb-1">Expiry Date</div>
                            <div className="text-white font-medium">{selectedCertificate.expiryDate}</div>
                          </div>
                        )}
                        {selectedCertificate.credentialId && (
                          <div className="bg-gray-800/50 rounded-lg p-4 col-span-2">
                            <div className="text-gray-400 text-sm mb-1">Credential ID</div>
                            <div className="text-white font-mono text-sm">{selectedCertificate.credentialId}</div>
                          </div>
                        )}
                      </div>

                      {/* Skills */}
                      {selectedCertificate.skills && selectedCertificate.skills.length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-3">Skills Covered</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedCertificate.skills.map((skill: string, i: number) => (
                              <span key={i} className="bg-gray-800/50 text-gray-300 px-3 py-1 rounded-full text-sm border border-gray-700/50">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Verification Status */}
                      {selectedCertificate.verified && (
                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                          <div className="flex items-center gap-2 text-green-400">
                            <CheckCircle size={20} />
                            <span className="font-medium">Verified Certificate</span>
                          </div>
                          <p className="text-green-300 text-sm mt-1">This certificate has been verified and is authentic.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CertificatesSection;