import Layout from '@/components/Layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What types of business solutions do you offer?",
    answer: "We offer a wide range of business solutions including software (CRM, ERP, accounting), loans (business loans, equipment financing, lines of credit), credit cards, and HR solutions. Our platform helps you compare and find the best options for your specific business needs."
  },
  {
    question: "How do I compare different products?",
    answer: "You can easily compare products within each category by using our comparison tool. Simply select the products you're interested in and click the 'Compare' button. This will show you a side-by-side comparison of features, pricing, and other important details."
  },
  {
    question: "Are the recommendations personalized?",
    answer: "Yes, our recommendations are tailored based on your browsing history and the information you provide about your business. The more you interact with our platform, the more personalized your recommendations become."
  },
  {
    question: "How do I apply for a loan or credit card?",
    answer: "Once you've found a loan or credit card that suits your needs, you can click the 'Apply Now' button on the product page. This will typically redirect you to the provider's website where you can complete the application process."
  },
  {
    question: "Is my information secure?",
    answer: "Absolutely. We take data security very seriously and use industry-standard encryption and security measures to protect your information. We never share your personal data with third parties without your explicit consent."
  }
];

export default function FAQPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
        <Accordion type="single" collapsible>
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Layout>
  );
}