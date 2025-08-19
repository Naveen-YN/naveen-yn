import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  id: number;
  size: number;
  opacity: number;
  life: number;
  dx: number;
  dy: number;
  colorIndex: number;
  angle: number;
  dAngle: number;
  pulse: number;
  pulseDir: number;
}

const MAX_PARTICLES = 60;
const LINE_DISTANCE = 100;
const MAGNETIC_RADIUS = 80;
const MAGNETIC_FORCE = 0.04;
const COLORS = [
  "hsl(180,100%,60%)",
  "hsl(280,100%,60%)",
  "hsl(320,100%,60%)",
  "hsl(200,100%,60%)",
];
const HOVER_SELECTOR = "button,a,.interactive";

const AnimatedCursor: React.FC = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const cursorX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const cursorY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const [particles, setParticles] = useState<Particle[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const isMobile = useRef(false);
  const hoverActive = useRef(false);
  const hoveredElement = useRef<HTMLElement | null>(null);

  const addParticle = (x: number, y: number, count = 1) => {
    const newParticles = Array.from({ length: count }, () => ({
      x,
      y,
      id: Date.now() + Math.random(),
      size: hoverActive.current ? Math.random() * 6 + 4 : Math.random() * 5 + 2,
      opacity: Math.random() * 0.8 + 0.5,
      life: 1,
      dx: (Math.random() - 0.5) * (hoverActive.current ? 2 : 1),
      dy: (Math.random() - 0.5) * (hoverActive.current ? 2 : 1),
      colorIndex: Math.floor(Math.random() * COLORS.length),
      angle: Math.random() * 360,
      dAngle: (Math.random() - 0.5) * 1.5,
      pulse: Math.random() * 0.3 + 0.7,
      pulseDir: Math.random() < 0.5 ? -1 : 1,
    }));
    particlesRef.current = [...particlesRef.current, ...newParticles].slice(-MAX_PARTICLES);
    setParticles([...particlesRef.current]);
  };

  useEffect(() => {
    const updateHoverState = (x: number, y: number) => {
      const element = document.elementFromPoint(x, y) as HTMLElement | null;
      hoverActive.current = element ? element.matches(HOVER_SELECTOR) : false;
      hoveredElement.current = hoverActive.current ? element : null;
    };

    const handleMove = (e: MouseEvent | Touch) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      updateHoverState(e.clientX, e.clientY);
      addParticle(e.clientX, e.clientY);
    };

    const handleClick = (e: MouseEvent | Touch) => addParticle(e.clientX, e.clientY, 8);

    isMobile.current = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (!isMobile.current) {
      window.addEventListener("mousemove", handleMove as any);
      window.addEventListener("click", handleClick as any);
    } else {
      window.addEventListener("touchmove", (e) => handleMove(e.touches[0]));
      window.addEventListener("touchstart", (e) => {
        handleMove(e.touches[0]);
        handleClick(e.touches[0]);
      });
    }

    return () => {
      if (!isMobile.current) {
        window.removeEventListener("mousemove", handleMove as any);
        window.removeEventListener("click", handleClick as any);
      }
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    const animate = () => {
      const hoverEl = hoveredElement.current;

      particlesRef.current = particlesRef.current
        .map((p) => {
          // Magnetic pull
          if (hoverEl) {
            const rect = hoverEl.getBoundingClientRect();
            const dx = rect.left + rect.width / 2 - p.x;
            const dy = rect.top + rect.height / 2 - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < MAGNETIC_RADIUS) {
              p.dx += (dx / dist) * MAGNETIC_FORCE;
              p.dy += (dy / dist) * MAGNETIC_FORCE;
            }
          }

          // Pulse update
          p.pulse += 0.008 * p.pulseDir;
          if (p.pulse > 1.2 || p.pulse < 0.6) p.pulseDir *= -1;

          return {
            ...p,
            x: p.x + p.dx,
            y: p.y + p.dy,
            life: p.life - 0.015,
            size: p.size * 0.97,
            angle: (p.angle + p.dAngle) % 360,
          };
        })
        .filter((p) => p.life > 0);

      setParticles([...particlesRef.current]);
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <>
      <svg
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 9998,
        }}
      >
        {particles.map((p, i) =>
          particles.slice(i + 1).map((p2) => {
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < LINE_DISTANCE) {
              return (
                <line
                  key={`${p.id}-${p2.id}`}
                  x1={p.x}
                  y1={p.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke={COLORS[p.colorIndex]}
                  strokeOpacity={1 - dist / LINE_DISTANCE}
                  strokeWidth={0.5}
                />
              );
            }
            return null;
          })
        )}
      </svg>

      {particles.map((p) => {
        const sparkle = Math.random() < 0.02;
        const size = sparkle ? p.size * 1.5 : p.size;
        return (
          <motion.div
            key={p.id}
            initial={{ opacity: p.opacity, scale: 0 }}
            animate={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              position: "fixed",
              top: p.y,
              left: p.x,
              width: size,
              height: size,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${COLORS[p.colorIndex]}, ${COLORS[p.colorIndex]})`,
              filter: `brightness(${p.pulse})`,
              pointerEvents: "none",
              transform: `translate(-50%, -50%) rotate(${p.angle}deg)`,
              zIndex: 9999,
              mixBlendMode: "screen",
              boxShadow: `0 0 ${sparkle ? 12 : 8}px ${COLORS[p.colorIndex]}, 0 0 ${
                sparkle ? 24 : 16
              }px ${COLORS[p.colorIndex]}`,
            }}
          />
        );
      })}
    </>
  );
};

export default AnimatedCursor;
