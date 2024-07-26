import { useState } from 'react';
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export default function HRSolutionsCalculator() {
  const [employees, setEmployees] = useState('');
  const [currentCost, setCurrentCost] = useState('');
  const [newCost, setNewCost] = useState('');
  const [roi, setRoi] = useState(null);

  const calculateRoi = () => {
    const numEmployees = parseInt(employees);
    const oldCost = parseFloat(currentCost);
    const hrSolutionCost = parseFloat(newCost);

    if (!isNaN(numEmployees) && !isNaN(oldCost) && !isNaN(hrSolutionCost)) {
      const annualSavings = (oldCost - hrSolutionCost) * 12;
      const annualCost = hrSolutionCost * 12 * numEmployees;
      const calculatedRoi = (annualSavings / annualCost) * 100;
      setRoi(calculatedRoi.toFixed(2));
    }
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-lg">HR Solution ROI Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <label htmlFor="employees" className="block text-sm font-medium text-gray-700">Number of Employees</label>
            <Input
              id="employees"
              type="number"
              value={employees}
              onChange={(e) => setEmployees(e.target.value)}
              placeholder="Enter number of employees"
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="currentCost" className="block text-sm font-medium text-gray-700">Current Monthly HR Cost per Employee ($)</label>
            <Input
              id="currentCost"
              type="number"
              value={currentCost}
              onChange={(e) => setCurrentCost(e.target.value)}
              placeholder="Enter current monthly cost"
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="newCost" className="block text-sm font-medium text-gray-700">New HR Solution Cost per Employee ($)</label>
            <Input
              id="newCost"
              type="number"
              value={newCost}
              onChange={(e) => setNewCost(e.target.value)}
              placeholder="Enter new solution cost"
              className="mt-1"
            />
          </div>
          <Button onClick={calculateRoi} className="w-full">Calculate ROI</Button>
          {roi !== null && (
            <div className="mt-2">
              <p className="font-semibold">Estimated Annual ROI: {roi}%</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}