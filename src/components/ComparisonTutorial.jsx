import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ComparisonTutorial() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenComparisonTutorial');
    if (!hasSeenTutorial) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenComparisonTutorial', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-50 max-w-sm"
        >
          <h3 className="text-lg font-semibold mb-2">How to Compare</h3>
          <ol className="list-decimal list-inside mb-4">
            <li>Select up to 3 items you want to compare</li>
            <li>Click the "Compare" button in the floating bar</li>
            <li>View the detailed comparison table</li>
          </ol>
          <Button onClick={handleClose}>Got it!</Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}