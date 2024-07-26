import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ComparisonTable from '@/components/ComparisonTable';
import FloatingComparisonBar from '@/components/FloatingComparisonBar';
import { useComparison } from '@/context/ComparisonContext';
import { motion } from "framer-motion";
import { toast } from "@/components/ui/use-toast";

const hrSolutions = [
  { id: 1, name: 'HR Management Suite', description: 'Comprehensive HR platform for SMBs', price: '$10/employee/month', features: 'Payroll, Time Tracking, Benefits Administration', employeeSelfService: 'Yes', mobileApp: 'Yes', integrations: '50+' },
  { id: 2, name: 'Recruitment Tool', description: 'Streamline your hiring process', price: '$200/month', features: 'Job Posting, Applicant Tracking, Interview Scheduling', employeeSelfService: 'No', mobileApp: 'Yes', integrations: '20+' },
  { id: 3, name: 'Employee Engagement Platform', description: 'Boost employee satisfaction and retention', price: '$5/employee/month', features: 'Surveys, Recognition Programs, Performance Management', employeeSelfService: 'Yes', mobileApp: 'Yes', integrations: '30+' },
  { id: 4, name: 'Learning Management System', description: 'Facilitate employee training and development', price: '$8/employee/month', features: 'Course Creation, Skills Tracking, Certifications', employeeSelfService: 'Yes', mobileApp: 'Yes', integrations: '15+' },
  { id: 5, name: 'Workforce Analytics', description: 'Data-driven HR decision making', price: '$15/employee/month', features: 'Dashboards, Predictive Analytics, Custom Reports', employeeSelfService: 'No', mobileApp: 'No', integrations: '40+' },
];

export default function HRSolutionsPage() {
  const { selectedItems, addItem, removeItem, clearItems } = useComparison();
  const [isComparing, setIsComparing] = useState(false);

  const toggleSolutionSelection = (solution) => {
    if (selectedItems.find(item => item.id === solution.id)) {
      removeItem(solution.id);
      toast({
        title: "Removed from comparison",
        description: `${solution.name} has been removed from the comparison.`,
      });
    } else {
      if (selectedItems.length < 3) {
        addItem(solution);
        toast({
          title: "Added to comparison",
          description: `${solution.name} has been added to the comparison.`,
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

  const handleCompare = () => {
    setIsComparing(true);
  };

  const handleClearAll = () => {
    clearItems();
    setIsComparing(false);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-8">HR Solutions</h1>
          <p className="mb-4">Select up to 3 HR solutions to compare their features. Click the "Compare" button in the floating bar to see a detailed comparison.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hrSolutions.map((solution) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>{solution.name}</CardTitle>
                  <CardDescription>{solution.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p><strong>Price:</strong> {solution.price}</p>
                  <p><strong>Features:</strong> {solution.features}</p>
                  <Button 
                    className="mt-4"
                    onClick={() => toggleSolutionSelection(solution)}
                    variant={selectedItems.find(item => item.id === solution.id) ? "secondary" : "default"}
                  >
                    {selectedItems.find(item => item.id === solution.id) ? "Remove from Compare" : "Add to Compare"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        {isComparing && selectedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <h2 className="text-2xl font-bold mb-4">Comparison</h2>
            <ComparisonTable products={selectedItems} />
          </motion.div>
        )}
        <FloatingComparisonBar
          selectedItems={selectedItems}
          onCompare={handleCompare}
          onClear={handleClearAll}
        />
      </div>
    </Layout>
  );
}