import Link from 'next/link';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const productCategories = [
  {
    name: 'Software',
    items: [
      { name: 'CRM Pro', id: '1' },
      { name: 'ERP Suite', id: '2' },
      { name: 'AccountMaster', id: '3' },
    ],
  },
  {
    name: 'Loans',
    items: [
      { name: 'Small Business Loan', id: '1' },
      { name: 'Equipment Financing', id: '2' },
      { name: 'Business Line of Credit', id: '3' },
    ],
  },
  {
    name: 'Credit Cards',
    items: [
      { name: 'Business Rewards Card', id: '1' },
      { name: 'Travel Points Card', id: '2' },
      { name: 'Cash Flow Card', id: '3' },
    ],
  },
  {
    name: 'HR Solutions',
    items: [
      { name: 'HR Management Suite', id: '1' },
      { name: 'Recruitment Tool', id: '2' },
      { name: 'Employee Engagement Platform', id: '3' },
    ],
  },
];

export default function ProductNavigation() {
  return (
    <nav className="flex space-x-4">
      {productCategories.map((category) => (
        <DropdownMenu key={category.name}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">{category.name}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {category.items.map((item) => (
              <DropdownMenuItem key={item.id}>
                <Link href={`/${category.name.toLowerCase().replace(' ', '-')}/${item.id}`}>
                  {item.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </nav>
  );
}