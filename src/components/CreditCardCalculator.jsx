import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreditCardCalculator() {
  const [monthlySpend, setMonthlySpend] = useState('');
  const [cashbackRate, setCashbackRate] = useState('');
  const [annualRewards, setAnnualRewards] = useState(null);

  const calculateRewards = () => {
    const spend = parseFloat(monthlySpend);
    const rate = parseFloat(cashbackRate);
    if (!isNaN(spend) && !isNaN(rate)) {
      const rewards = (spend * 12 * (rate / 100)).toFixed(2);
      setAnnualRewards(rewards);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rewards Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label htmlFor="monthlySpend" className="block text-sm font-medium text-gray-700">Monthly Spend ($)</label>
            <Input
              id="monthlySpend"
              type="number"
              value={monthlySpend}
              onChange={(e) => setMonthlySpend(e.target.value)}
              placeholder="Enter your monthly spend"
            />
          </div>
          <div>
            <label htmlFor="cashbackRate" className="block text-sm font-medium text-gray-700">Cashback Rate (%)</label>
            <Input
              id="cashbackRate"
              type="number"
              value={cashbackRate}
              onChange={(e) => setCashbackRate(e.target.value)}
              placeholder="Enter cashback rate"
            />
          </div>
          <Button onClick={calculateRewards}>Calculate Rewards</Button>
          {annualRewards !== null && (
            <div className="mt-4">
              <p className="font-semibold">Estimated Annual Rewards: ${annualRewards}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}