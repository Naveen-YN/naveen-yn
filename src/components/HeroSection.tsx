import React, { useEffect, useRef, useState } from "react";
import { FileText, Download } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const phrases = [
    "Forging a New Era with Technological Excellence...",
    "Creating Innovative Web Experiences...",
    "Transforming Ideas into Reality with Code...",
  ];

  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Typing animation with loop
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && typedText.length < currentPhrase.length) {
      timeout = setTimeout(() => {
        setTypedText(currentPhrase.slice(0, typedText.length + 1));
      }, 50);
    } else if (deleting && typedText.length > 0) {
      timeout = setTimeout(() => {
        setTypedText(currentPhrase.slice(0, typedText.length - 1));
      }, 30);
    } else if (!deleting && typedText.length === currentPhrase.length) {
      timeout = setTimeout(() => setDeleting(true), 1500);
    } else if (deleting && typedText.length === 0) {
      setDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [typedText, deleting, phraseIndex, phrases]);

  const resumeUrl =
    "https://neuropia.s3.ap-south-1.amazonaws.com/Naveen-Yanamadala-Resume.pdf";

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden flex items-center justify-center px-6 sm:px-12 md:px-16 lg:px-24"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.7)" }}
      >
        <source
          src="https://novark.s3.ap-south-1.amazonaws.com/ntech.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Floating Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute w-40 h-40 bg-gradient-to-tr from-[#09c6f9]/40 via-[#045de9]/30 to-transparent rounded-full blur-3xl top-10 left-1/4"
        />
        <motion.div
          animate={{ y: [0, 25, 0], x: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className="absolute w-32 h-32 bg-gradient-to-br from-[#045de9]/40 via-[#09c6f9]/20 to-transparent rounded-full blur-2xl bottom-20 right-1/3"
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-center w-full max-w-[85%] sm:max-w-[700px] md:max-w-[900px] lg:max-w-[1000px]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="relative bg-black/20 backdrop-blur-md p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            {/* Glow Highlights */}
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#09c6f9]/30 via-[#045de9]/20 to-transparent rounded-tr-full blur-sm"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-[#09c6f9]/50 via-[#045de9]/30 to-transparent rounded-tr-full blur-xs"></div>

            {/* Reflection */}
            <div className="absolute top-0 left-1/4 w-1/2 h-full bg-gradient-to-b from-white/5 via-transparent to-transparent transform -skew-x-12 opacity-40"></div>

            {/* Text */}
            <div className="relative z-10">
              <motion.h1
                className="text-white font-bold mb-4 md:mb-6 leading-tight drop-shadow-xl break-words"
                style={{ fontSize: "clamp(1.75rem, 6vw, 3rem)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Hello, I'm{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#09c6f9] to-[#045de9]">
                  Naveen Yanamadala
                </span>
              </motion.h1>

              {/* Typing Description */}
              <motion.p
                className="text-gray-200 mb-6 md:mb-8 leading-relaxed drop-shadow-md px-2 sm:px-0 min-h-[1.5em]"
                style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.25rem)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {typedText}
                <span className="animate-blink">|</span>
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
                  aria-label="View My Resume"
                  className="group relative inline-flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-[#045de9] to-[#09c6f9] text-white font-semibold rounded-xl text-sm sm:text-base hover:shadow-lg hover:shadow-[#045de9]/25 transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative z-10 flex items-center gap-2 sm:gap-3">
                    <FileText size={18} className="group-hover:scale-110 transition-transform duration-300 drop-shadow-sm" />
                    <span>View My Resume</span>
                    <Download size={16} className="group-hover:translate-x-1 transition-transform duration-300 drop-shadow-sm" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#09c6f9] to-[#045de9] opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"></div>
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Blink cursor animation */}
      <style>
        {`
          @keyframes blink {
            0%, 50%, 100% { opacity: 1; }
            25%, 75% { opacity: 0; }
          }
          .animate-blink {
            display: inline-block;
            animation: blink 1s infinite;
          }
        `}
      </style>
    </section>
  );
};

export default HeroSection;
