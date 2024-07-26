import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingComparisonBar({ selectedItems, onCompare, onClear }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(selectedItems.length > 0);
  }, [selectedItems]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 bg-primary text-primary-foreground p-4 shadow-lg"
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div>
              <span className="font-bold">{selectedItems.length} items selected</span>
            </div>
            <div>
              <Button onClick={onCompare} className="mr-2">Compare</Button>
              <Button onClick={onClear} variant="secondary">Clear All</Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}