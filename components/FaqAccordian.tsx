"use client"
import * as React from 'react';

import { MinusIcon, PlusIcon } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export default function FaqAccordion() {
  const [expanded, setExpanded] = React.useState<number | false>(false);

  const handleChange = (panel: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqs = [
    {
      question: "1. How can I place an order with Defacto Delivery?",
      answer: "You can place an order with Defacto Delivery through our website or mobile app. Simply select the items you wish to purchase, choose your delivery address and payment method, and confirm your order.",
    },
    {
      question: "2. What types of products does Defacto Delivery offer?",
      answer: "Defacto Delivery offers a wide range of products including groceries, household essentials, electronics, clothing, and more. You can browse our catalog to explore the full range of available items.",
    },
    {
      question: "3. What are the delivery hours of Defacto Delivery?",
      answer: "Our delivery hours vary depending on your location and local regulations. Generally, we offer delivery services throughout the day, including evenings and weekends. You can check the available delivery slots during the checkout process.",
    },
    {
      question: "4. Is there a minimum order requirement for Defacto Delivery?",
      answer: "Yes, we have a minimum order requirement for delivery orders. The minimum order amount may vary depending on your location and the type of items you're purchasing. You can view the minimum order amount for your area during the checkout process.",
    },
    {
      question: "5. How can I track my order with Defacto Delivery?",
      answer: "You can track your order with Defacto Delivery through our website or mobile app. Once your order is placed, you'll receive a confirmation email or notification with a tracking link. Click on the link to view the status of your order in real-time.",
    },
    {
      question: "6. Can I schedule a delivery in advance with Defacto Delivery?",
      answer: "Yes, you can schedule a delivery in advance with Defacto Delivery. During the checkout process, you'll have the option to choose your preferred delivery date and time slot. We'll make sure to deliver your order at the scheduled time.",
    },
    {
      question: "7. What payment methods does Defacto Delivery accept?",
      answer: "Defacto Delivery accepts a variety of payment methods including credit/debit cards, digital wallets, and cash on delivery (COD). You can choose your preferred payment method during the checkout process.",
    },
  ];

  return (
      // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
<div className={`flex justify-center`}>
        <div className=" shadow rounded-md  bg-white ">
          {faqs.map((faq, index) => (
              // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
<Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent className="max-w-3xl p-4" >
             {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
          ))}
        </div>
      </div>
  );
}
