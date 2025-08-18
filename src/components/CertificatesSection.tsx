import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Calendar,
  ExternalLink,
  X,
  Eye,
  Download,
  Star,
  Trophy,
  Medal,
  Shield,
  CheckCircle,
  Zap,
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
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // 🔹 Hardcoded certificates (replace with your own)
  const certificates: Certificate[] = [
    {
      id: "1",
      title: "Full-Stack Web Development",
      issuer: "Coursera",
      description:
        "Completed certification in MERN stack including React, Node.js, Express, and MongoDB.",
      issueDate: "Jan 2024",
      expiryDate: "No Expiry",
      credentialId: "ABC123",
      credentialUrl: "https://example.com/cert/fullstack",
      image: "https://via.placeholder.com/400x250.png?text=FullStack+Certificate",
      category: "Technical",
      skills: ["React", "Node.js", "MongoDB", "Express"],
      verified: true,
    },
    {
      id: "2",
      title: "Cloud Practitioner",
      issuer: "AWS",
      description:
        "AWS Certified Cloud Practitioner demonstrating knowledge of AWS cloud services.",
      issueDate: "Dec 2023",
      expiryDate: "Dec 2026",
      credentialUrl: "https://example.com/cert/aws",
      image: "https://via.placeholder.com/400x250.png?text=AWS+Certificate",
      category: "Professional",
      skills: ["AWS", "Cloud", "Security"],
      verified: false,
    },
  ];

  // Animate section on scroll
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
      case "Technical":
        return Zap;
      case "Professional":
        return Trophy;
      case "Academic":
        return Medal;
      case "Security":
        return Shield;
      case "Achievement":
        return Star;
      default:
        return Award;
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "Technical":
        return "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400";
      case "Professional":
        return "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400";
      case "Academic":
        return "from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400";
      case "Security":
        return "from-red-500/20 to-orange-500/20 border-red-500/30 text-red-400";
      case "Achievement":
        return "from-yellow-500/20 to-amber-500/20 border-yellow-500/30 text-yellow-400";
      default:
        return "from-gray-500/20 to-slate-500/20 border-gray-500/30 text-gray-400";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="certificates" className="py-20 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-purple-900/5"></div>
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 sm:px-12 md:px-20 lg:px-32 relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-wider mb-4">
            Certifications{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#09c6f9] to-[#045de9]">
              & Achievements
            </span>
          </h2>
          <motion.div
            className="h-1 w-32 mx-auto bg-gradient-to-r from-[#09c6f9] to-[#045de9] rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
            Professional certifications and achievements that validate my
            expertise and commitment to continuous learning
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <motion.div
          ref={sectionRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {certificates.map((cert) => {
            const CategoryIcon = getCategoryIcon(cert.category);
            const categoryColors = getCategoryColor(cert.category);

            return (
              <motion.div
                key={cert.id}
                variants={cardVariants}
                className="group relative"
                whileHover={{ y: -8 }}
              >
                {/* Card */}
                <div
                  className={`relative bg-black/80 backdrop-blur-xl rounded-2xl border ${
                    categoryColors.split(" ")[2]
                  } shadow-2xl overflow-hidden cursor-pointer`}
                  onClick={() => setSelectedCertificate(cert)}
                >
                  {/* Image */}
                  <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2">
                      {cert.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{cert.issuer}</p>
                    <p className="text-gray-500 text-xs mt-2">
                      {cert.issueDate} {cert.expiryDate && ` - Expires: ${cert.expiryDate}`}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Empty State */}
        {certificates.length === 0 && (
          <div className="text-center py-16">
            <Award size={64} className="mx-auto mb-6 text-gray-600" />
            <h3 className="text-2xl font-bold text-gray-400 mb-4">
              No Certificates Found
            </h3>
            <p className="text-gray-500 mb-6">
              Add your first certificate to get started
            </p>
          </div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {selectedCertificate && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-[9999] p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCertificate(null)}
            >
              <motion.div
                className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-700 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">
                    {selectedCertificate.title}
                  </h3>
                  <p className="text-gray-400">{selectedCertificate.issuer}</p>
                  <img
                    src={selectedCertificate.image}
                    alt={selectedCertificate.title}
                    className="w-full mt-4 rounded-xl"
                  />
                  <p className="text-gray-300 mt-4">
                    {selectedCertificate.description}
                  </p>
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
