import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";

export default function ComparisonTable({ products }) {
  if (!products || products.length === 0) return null;

  const features = Object.keys(products[0]).filter(key => key !== 'id' && key !== 'name' && key !== 'category');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Feature</TableHead>
            {products.map(product => (
              <TableHead key={product.id}>{product.name}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map(feature => (
            <TableRow key={feature}>
              <TableCell className="font-medium">{feature}</TableCell>
              {products.map(product => (
                <TableCell key={product.id}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {product[feature]}
                  </motion.div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}