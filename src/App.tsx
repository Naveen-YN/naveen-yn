import { useEffect, useState, useRef } from "react"
import { ChevronDown, ArrowUp } from "lucide-react"
import { Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import ScrollToHashElement from "./components/ScrollToHashElement"
import HeroSection from "./components/HeroSection"
import AboutSection from "./components/AboutSection"
import SkillsSection from "./components/SkillsSection"
import EducationSection from "./components/EducationSection"
import ProjectsSection from "./components/ProjectsSection"
import CertificatesSection from "./components/CertificatesSection"
import CodingProfilesSection from "./components/CodingProfilesSection"
import ContactSection from "./components/ContactSection"
import ProjectPage from "./pages/ProjectPage"
import ResumeRedirect from "./components/ResumeRedirect"
// --- IMPORT THE NEW NOTIFICATION COMPONENT ---
import MaintenanceNotification from "./components/MaintenanceNotification"

import "./App.css"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// ---------------- HomePage ----------------
function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setShowScrollToTop(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Optional background music autoplay
  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          console.log("Autoplay blocked. User interaction required.")
        })
      }
    }
    document.addEventListener("click", playAudio, { once: true })
    return () => document.removeEventListener("click", playAudio)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Background music (optional) */}
      <audio ref={audioRef} autoPlay loop>
        <source src="https://novark.s3.ap-south-1.amazonaws.com/intersteller.mp3" type="audio/mp3" />
      </audio>

      <Navbar scrollY={scrollY} />
      <HeroSection />

      <div className="scroll-indicator absolute left-1/2 transform -translate-x-1/2 bottom-10">
        <ChevronDown className="animate-bounce text-gray-400" size={32} />
      </div>

      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <CodingProfilesSection />
      <CertificatesSection />
      <EducationSection />
      <ContactSection />

      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-16 right-6 p-3 rounded-full shadow-lg z-50"
          style={{
            background: "linear-gradient(315deg, #045de9 0%, #09c6f9 74%)",
          }}
        >
          <ArrowUp size={24} className="text-white" />
        </button>
      )}

      <footer className="relative bg-black border-t border-gray-800/50 py-8">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>

        <div className="container mx-auto px-6 sm:px-12 md:px-20 lg:px-32 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left Section */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="text-center md:text-left">
                <div className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#09c6f9] to-[#045de9] mb-1">
                  Naveen Yanamadala
                </div>
              </div>
            </div>

            {/* Center Links */}
            <div className="flex items-center gap-6 text-sm">
              <a href="#about" className="text-gray-400 hover:text-[#09c6f9] transition-colors duration-300">
                About
              </a>
              <a href="#projects" className="text-gray-400 hover:text-[#09c6f9] transition-colors duration-300">
                Projects
              </a>
              <a href="#contact" className="text-gray-400 hover:text-[#09c6f9] transition-colors duration-300">
                Contact
              </a>
            </div>

            {/* Right Section */}
            <div className="text-center md:text-right">
              <div className="text-gray-400 text-sm">
                © {new Date().getFullYear()} All rights reserved
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ---------------- App ----------------
function App() {
  return (
    <>
      <ScrollToHashElement />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/resume" element={<ResumeRedirect />} />
        <Route path="/project/:slug" element={<ProjectPage />} />
      </Routes>
            <MaintenanceNotification />
    </>
  )
}

export default App
