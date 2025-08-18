import React, { useEffect, useRef } from 'react'
import { FileText, Download } from "lucide-react"
import { motion } from "framer-motion"

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // ✅ Static Resume URL (no DataContext)
  const resumeUrl =
    "https://novark.s3.ap-south-1.amazonaws.com/Naveen-Yanamadala-Resume-1.pdf"

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.7)' }}
      >
        <source
          src="https://novark.s3.ap-south-1.amazonaws.com/ntech.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center px-6 sm:px-8 md:px-12">
        <motion.div
          className="text-center max-w-2xl w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative bg-black/20 backdrop-blur-md p-6 md:p-8 lg:p-10 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            
            {/* Glow */}
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#09c6f9]/30 via-[#045de9]/20 to-transparent rounded-tr-full blur-sm"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-[#09c6f9]/50 via-[#045de9]/30 to-transparent rounded-tr-full blur-xs"></div>

            {/* Reflection */}
            <div className="absolute top-0 left-1/4 w-1/2 h-full bg-gradient-to-b from-white/3 via-transparent to-transparent transform -skew-x-12 opacity-40"></div>

            {/* Text */}
            <div className="relative z-10">
              <motion.h1
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-white leading-tight drop-shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Hello, I'm{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#09c6f9] to-[#045de9]">
                  Naveen Yanamadala
                </span>
              </motion.h1>

              <motion.p
                className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-6 md:mb-8 leading-relaxed px-2 sm:px-0 drop-shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {"Forging a New Era with Technological Excellence..."}
              </motion.p>

              {/* Resume Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#045de9] to-[#09c6f9] text-white font-semibold rounded-xl text-sm sm:text-base hover:shadow-lg hover:shadow-[#045de9]/25 transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#09c6f9] to-[#045de9] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 flex items-center gap-2 sm:gap-3">
                    <FileText size={18} className="group-hover:scale-110 transition-transform duration-300 drop-shadow-sm" />
                    <span>View My Resume</span>
                    <Download size={16} className="group-hover:translate-x-1 transition-transform duration-300 drop-shadow-sm" />
                  </div>
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
