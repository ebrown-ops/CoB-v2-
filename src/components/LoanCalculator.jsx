import { useState } from 'react';
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const term = parseFloat(loanTerm) * 12;

    if (!isNaN(principal) && !isNaN(rate) && !isNaN(term)) {
      const payment = (principal * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
      setMonthlyPayment(payment.toFixed(2));
    }
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-lg">Loan Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700">Loan Amount ($)</label>
            <Input
              id="loanAmount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="Enter loan amount"
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700">Interest Rate (%)</label>
            <Input
              id="interestRate"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="Enter interest rate"
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="loanTerm" className="block text-sm font-medium text-gray-700">Loan Term (years)</label>
            <Input
              id="loanTerm"
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              placeholder="Enter loan term"
              className="mt-1"
            />
          </div>
          <Button onClick={calculateLoan} className="w-full">Calculate</Button>
          {monthlyPayment !== null && (
            <div className="mt-2">
              <p className="font-semibold">Estimated Monthly Payment: ${monthlyPayment}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}