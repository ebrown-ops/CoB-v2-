import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ComparisonTable({ products }) {
  if (!products || products.length === 0) return null;

  const features = Object.keys(products[0]).filter(key => key !== 'id' && key !== 'name' && key !== 'category');

  const highlightDifferences = (feature) => {
    const values = products.map(p => p[feature]);
    return values.every(v => v === values[0]) ? 'bg-gray-100' : 'bg-yellow-100';
  };

  const renderCell = (value, feature) => {
    if (typeof value === 'number') {
      const data = products.map(p => ({ name: p.name, value: p[feature] }));
      return (
        <div className="h-20">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    }
    return value;
  };

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
            <TableRow key={feature} className={highlightDifferences(feature)}>
              <TableCell className="font-medium">{feature}</TableCell>
              {products.map(product => (
                <TableCell key={product.id}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {renderCell(product[feature], feature)}
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