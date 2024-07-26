import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useComparison } from '@/context/ComparisonContext';
import { toast } from "@/components/ui/use-toast";

export default function ProductDetails({ product }) {
  const { selectedItems, addItem, removeItem } = useComparison();

  const toggleProductSelection = () => {
    if (selectedItems.find(item => item.id === product.id)) {
      removeItem(product.id);
      toast({
        title: "Removed from comparison",
        description: `${product.name} has been removed from the comparison.`,
      });
    } else {
      if (selectedItems.length < 3) {
        addItem(product);
        toast({
          title: "Added to comparison",
          description: `${product.name} has been added to the comparison.`,
        });
      } else {
        toast({
          title: "Comparison limit reached",
          description: "You can compare up to 3 items at a time.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {Object.entries(product).map(([key, value]) => {
          if (key !== 'id' && key !== 'name' && key !== 'description') {
            return (
              <p key={key}><strong>{key}:</strong> {value}</p>
            );
          }
          return null;
        })}
        <Button 
          className="mt-4"
          onClick={toggleProductSelection}
          variant={selectedItems.find(item => item.id === product.id) ? "secondary" : "default"}
        >
          {selectedItems.find(item => item.id === product.id) ? "Remove from Compare" : "Add to Compare"}
        </Button>
      </CardContent>
    </Card>
  );
}