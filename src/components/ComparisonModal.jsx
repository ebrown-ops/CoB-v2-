import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Loader2 } from "lucide-react";

export default function ComparisonModal({ isOpen, onClose, products }) {
  const [open, setOpen] = useState(isOpen);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleSaveComparison = async () => {
    setLoading(true);
    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Saving comparison:', products);
      toast({
        title: "Comparison Saved",
        description: "Your comparison has been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving comparison:', error);
      toast({
        title: "Error",
        description: "Failed to save comparison. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!products || products.length === 0) {
    return null;
  }

  const features = products.length > 0 ? Object.keys(products[0]).filter(key => key !== 'id' && key !== 'name') : [];

  const chartData = features.map(feature => {
    const data = { name: feature };
    products.forEach(product => {
      data[product.name] = typeof product[feature] === 'number' ? product[feature] : 0;
    });
    return data;
  });

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
            <Table className="mb-8">
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
            <div className="mb-8 h-64 md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {products.map((product, index) => (
                    <Bar key={product.id} dataKey={product.name} fill={`hsl(${index * 60}, 70%, 50%)`} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={handleSaveComparison} disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Comparison
              </Button>
            </div>
          </motion.div>
        ) : (
          <p>No products selected for comparison.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}