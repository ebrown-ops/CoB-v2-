import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const steps = [
  {
    title: "Welcome to SMB Solutions",
    content: "We're here to help you find the best solutions for your small to medium-sized business. Let's get started!",
  },
  {
    title: "Explore Products",
    content: "Browse through our categories: Software, Loans, Credit Cards, and HR Solutions. Click on any category to see detailed options.",
  },
  {
    title: "Compare Products",
    content: "Select up to 3 products to compare their features side by side. Use the 'Add to Compare' button on each product card.",
  },
  {
    title: "Use Calculators",
    content: "Each product category has specialized calculators to help you make informed decisions. Try them out!",
  },
  {
    title: "Search Functionality",
    content: "Use the search bar at the top to quickly find specific products or categories you're interested in.",
  },
];

export default function OnboardingTutorial() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenOnboardingTutorial');
    if (!hasSeenTutorial) {
      setIsVisible(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenOnboardingTutorial', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
        >
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">{steps[currentStep].title}</h2>
            <p className="mb-6">{steps[currentStep].content}</p>
            <div className="flex justify-between">
              <Button onClick={handleClose} variant="outline">Skip</Button>
              <Button onClick={handleNext}>
                {currentStep < steps.length - 1 ? "Next" : "Finish"}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}