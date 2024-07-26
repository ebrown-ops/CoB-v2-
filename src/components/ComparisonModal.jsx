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

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Product Comparison</DialogTitle>
          <DialogDescription>Compare features of selected products</DialogDescription>
        </DialogHeader>
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
            {Object.keys(products[0]).filter(key => key !== 'id' && key !== 'name').map((feature) => (
              <TableRow key={feature}>
                <TableCell className="font-medium">{feature}</TableCell>
                {products.map((product) => (
                  <TableCell key={product.id}>{product[feature]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}