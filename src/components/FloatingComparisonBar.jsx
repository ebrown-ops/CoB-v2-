import { useState, useEffect } from 'react';
import { Button } from "../components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Share2 } from 'lucide-react';

console.log('FloatingComparisonBar is being loaded');

export default function FloatingComparisonBar({ selectedItems, onCompare, onClear }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(selectedItems.length > 0);
  }, [selectedItems]);

  const handleShare = () => {
    const comparisonUrl = `${window.location.origin}/compare?items=${selectedItems.map(item => item.id).join(',')}`;
    navigator.clipboard.writeText(comparisonUrl).then(() => {
      alert('Comparison link copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy comparison link: ', err);
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 bg-primary text-primary-foreground p-4 shadow-lg z-50"
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div>
              <span className="font-bold">{selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected</span>
            </div>
            <div>
              <Button onClick={onCompare} className="mr-2" disabled={selectedItems.length < 2}>Compare</Button>
              <Button onClick={handleShare} className="mr-2" disabled={selectedItems.length < 2}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button onClick={onClear} variant="secondary">Clear All</Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}