import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ComparisonModal({ isOpen, onClose, products }) {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  if (!products || products.length === 0) {
    return null;
  }

  const features = products.length > 0 ? Object.keys(products[0]).filter(key => key !== 'id' && key !== 'name') : [];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Product Comparison</DialogTitle>
          <DialogDescription>Compare features of selected products</DialogDescription>
        </DialogHeader>
        {products.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                {products.map((product) => (
                  <TableHead key={product.id}>{product.name}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((feature) => (
                <TableRow key={feature}>
                  <TableCell className="font-medium">{feature}</TableCell>
                  {products.map((product) => (
                    <TableCell key={product.id}>{product[feature]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No products selected for comparison.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}