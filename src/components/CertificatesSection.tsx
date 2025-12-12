import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Trophy,
  Medal,
  Shield,
  Star,
  Zap,
  X,
  CheckCircle,
} from "lucide-react";

interface Certificate {
  id: string;
  title: string;
  issuer?: string;
  description: string;
  issueDate?: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  image: string;
  category?: string;
  skills?: string[];
  verified?: boolean;
}

const CertificatesSection: React.FC = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (selectedCertificate) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedCertificate]);

  const certificates: Certificate[] = [
    {
      id: "1",
      title: "Foundational C# with Microsoft",
      issuer: "freeCodeCamp - Microsoft",
      description:
        "Completed certification in Foundational C# with Microsoft - Developer Certification",
      issueDate: "July 29, 2024",
      expiryDate: "No Expiry",
      credentialId: "naveen_y-fcswm",
      credentialUrl:
        "https://www.freecodecamp.org/certification/naveen_y/foundational-c-sharp-with-microsoft",
      image:
        "https://neuropia.s3.ap-south-1.amazonaws.com/certificates/freecodecamp.jpg",
      category: "Technical",
      skills: ["C#", "Programming", ".NET"],
      verified: true,
    },
    {
      id: "2",
      title: "Data Analysis with Python",
      issuer: "Coursera - IBM",
      description:
        "",
      issueDate: "May 25, 2023",
      expiryDate: "",
      credentialUrl: "https://www.coursera.org/account/accomplishments/verify/33HMWDUZ5GM7",
      image:
        "https://neuropia.s3.ap-south-1.amazonaws.com/certificates/1.jpg",
      category: "Technical",
      skills: ["Data Analysis", "Data Pipelines", "Exploratory Data Analysis"],
      verified: true,
    },
  ];

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case "Technical": return Zap;
      case "Professional": return Trophy;
      case "Academic": return Medal;
      case "Security": return Shield;
      case "Achievement": return Star;
      default: return Award;
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "Technical": return { border: "border-blue-500/50", text: "text-blue-400", bg: "bg-blue-500/10" };
      case "Professional": return { border: "border-purple-500/50", text: "text-purple-400", bg: "bg-purple-500/10" };
      case "Academic": return { border: "border-green-500/50", text: "text-green-400", bg: "bg-green-500/10" };
      case "Security": return { border: "border-red-500/50", text: "text-red-400", bg: "bg-red-500/10" };
      case "Achievement": return { border: "border-yellow-500/50", text: "text-yellow-400", bg: "bg-yellow-500/10" };
      default: return { border: "border-gray-500/50", text: "text-gray-400", bg: "bg-gray-500/10" };
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
    hover: { y: -10, scale: 1.02, transition: { duration: 0.3 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.85, y: 50, transition: { duration: 0.3 } },
  };

  return (
    <section id="certificates" className="py-24 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-black to-purple-950/20"></div>
      <div className="absolute top-1/4 left-1/5 w-80 h-80 bg-blue-600/10 rounded-full blur-4xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/5 w-80 h-80 bg-purple-600/10 rounded-full blur-4xl animate-pulse"></div>

      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 font-sans">
            Certifications{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
              & Achievements
            </span>
          </h2>
          <motion.div
            className="h-1 w-40 mx-auto bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <p className="text-gray-300 text-lg md:text-xl mt-6 max-w-3xl mx-auto leading-relaxed font-sans">
            A showcase of professional certifications and achievements reflecting my dedication to excellence and lifelong learning.
          </p>
        </motion.div>

        {/* Certificates Grid */}
        {isClient && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {certificates.map((cert) => {
              const CategoryIcon = getCategoryIcon(cert.category);
              const { border, text } = getCategoryColor(cert.category);

              return (
                <motion.button
                  key={cert.id}
                  variants={cardVariants}
                  whileHover="hover"
                  className={`group relative text-left w-full bg-black/90 backdrop-blur-2xl rounded-2xl border ${border} shadow-xl overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-shadow duration-300`}
                  onClick={() => setSelectedCertificate(cert)}
                  aria-label={`View details for ${cert.title}`}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <CategoryIcon size={20} className={`${text} group-hover:animate-pulse`} />
                      <h3 className="font-semibold text-white text-base md:text-lg leading-tight font-sans line-clamp-2">
                        {cert.title}
                      </h3>
                    </div>
                    <p className="text-gray-300 text-sm font-medium font-sans">{cert.issuer}</p>
                    <p className="text-gray-400 text-xs font-sans">
                      {cert.issueDate}
                      {cert.expiryDate && cert.expiryDate !== "No Expiry" && ` • Expires: ${cert.expiryDate}`}
                    </p>
                    {cert.verified && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-900/30 text-green-400 text-xs font-semibold font-sans">
                        <CheckCircle size={14} /> Verified
                      </span>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}

        {/* Modal Preview */}
        <AnimatePresence>
          {selectedCertificate && isClient && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black/85 backdrop-blur-md z-[10000] p-4 sm:p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCertificate(null)}
              role="dialog"
              aria-modal="true"
              aria-labelledby="certificate-title"
            >
              <motion.div
                className="relative bg-gradient-to-br from-gray-950 to-black rounded-2xl border border-gray-800 shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900"
                variants={modalVariants}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="absolute top-4 right-4 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-full p-1.5 transition-colors bg-gray-800/50 hover:bg-gray-700/50"
                  aria-label="Close certificate details"
                >
                  <X size={28} />
                </button>

                <div className="p-6 sm:p-8 space-y-6">
                  {/* Title & Category */}
                  <div className="flex items-center gap-3 flex-wrap">
                    {(() => {
                      const Icon = getCategoryIcon(selectedCertificate.category);
                      const { text } = getCategoryColor(selectedCertificate.category);
                      return <Icon size={26} className={`${text} animate-pulse`} />;
                    })()}
                    <h3 id="certificate-title" className="font-bold text-white text-xl sm:text-2xl md:text-3xl font-sans leading-tight break-words">
                      {selectedCertificate.title}
                    </h3>
                  </div>

                  {/* Timeline */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-gray-300">
                    {selectedCertificate.issueDate && (
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                        <span>Issued: {selectedCertificate.issueDate}</span>
                      </div>
                    )}
                    {selectedCertificate.expiryDate && selectedCertificate.expiryDate !== "No Expiry" && (
                      <>
                        <div className="hidden sm:block w-10 h-px bg-gray-600"></div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-red-400"></span>
                          <span>Expires: {selectedCertificate.expiryDate}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {selectedCertificate.issuer && (
                      <span className="px-3 py-1 rounded-full bg-gray-800/70 text-gray-100 text-sm font-sans">
                        Issuer: {selectedCertificate.issuer}
                      </span>
                    )}
                    {selectedCertificate.credentialId && (
                      <span className="px-3 py-1 rounded-full bg-purple-900/40 text-purple-300 text-sm font-sans">
                        ID: {selectedCertificate.credentialId}
                      </span>
                    )}
                    {selectedCertificate.verified && (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-green-900/40 text-green-300 text-sm font-semibold font-sans">
                        <CheckCircle size={16} /> Verified
                      </span>
                    )}
                  </div>

                  {/* Image */}
                  <div className="w-full flex justify-center">
                    <img
                      src={selectedCertificate.image}
                      alt={selectedCertificate.title}
                      className="w-full max-w-md sm:max-w-lg rounded-xl shadow-lg border border-gray-700/50 transition-transform duration-300 hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>

                  {/* Description */}
                  <p className="text-gray-100 leading-relaxed text-base font-sans">
                    {selectedCertificate.description}
                  </p>

                  {/* Skills & Credential button row */}
                  {(selectedCertificate.skills && selectedCertificate.skills.length > 0) || selectedCertificate.credentialUrl ? (
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      {selectedCertificate.skills && selectedCertificate.skills.length > 0 && (
                        <div>
                          <h4 className="text-gray-50 font-semibold mb-3 text-lg font-sans">Skills Gained:</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedCertificate.skills.map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-4 py-1.5 bg-gray-800/60 text-gray-100 text-sm rounded-full hover:bg-gray-700/70 hover:text-white transition-all font-sans"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedCertificate.credentialUrl && (
                        <a
                          href={selectedCertificate.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="self-end sm:self-auto px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-sans"
                        >
                          View Credential
                        </a>
                      )}
                    </div>
                  ) : null}
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
