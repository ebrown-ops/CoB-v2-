import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function ComparisonModal({ isOpen, onClose, products }) {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleSaveComparison = () => {
    // Here you would typically save the comparison to the user's account
    console.log('Saving comparison:', products);
    toast({
      title: "Comparison Saved",
      description: "Your comparison has been saved successfully.",
    });
  };

  if (!products || products.length === 0) {
    return null;
  }

  const features = products.length > 0 ? Object.keys(products[0]).filter(key => key !== 'id' && key !== 'name') : [];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Product Comparison</DialogTitle>
          <DialogDescription>Compare features of selected products</DialogDescription>
        </DialogHeader>
        {products.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/4">Feature</TableHead>
                  {products.map((product) => (
                    <TableHead key={product.id} className="w-1/4">{product.name}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {features.map((feature) => (
                  <TableRow key={feature}>
                    <TableCell className="font-medium">{feature}</TableCell>
                    {products.map((product) => (
                      <TableCell key={product.id} className="text-center">
                        {typeof product[feature] === 'boolean' 
                          ? (product[feature] ? '✅' : '❌')
                          : product[feature]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-end">
              <Button onClick={handleSaveComparison}>Save Comparison</Button>
            </div>
          </motion.div>
        ) : (
          <p>No products selected for comparison.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}