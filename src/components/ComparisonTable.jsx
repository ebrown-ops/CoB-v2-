import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ComparisonTable({ products }) {
  if (!products || products.length === 0) return null;

  const features = Object.keys(products[0]).filter(key => key !== 'id' && key !== 'name' && key !== 'category');

  return (
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
              <TableCell key={product.id}>{product[feature]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}