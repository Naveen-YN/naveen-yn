import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Construction, X } from "lucide-react";

const MaintenanceNotification: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the notification after a short delay every time
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500); // 1.5-second delay
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    // Hide only for the current view
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 p-5 max-w-sm bg-yellow-400 text-black rounded-xl shadow-2xl border-2 border-yellow-500"
        >
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 p-1 text-gray-800 hover:bg-black/10 rounded-full transition-colors"
            aria-label="Dismiss notification"
          >
            <X size={20} />
          </button>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 p-2 bg-black/10 rounded-full mt-1">
              <Construction size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Under Maintenance</h3>
              <p className="text-sm text-gray-800 mt-1">
                I’m improving my portfolio! New features are on the way, and you
                might notice a few bugs—thanks for sticking around.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MaintenanceNotification;
