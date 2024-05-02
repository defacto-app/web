"use client"
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { AccordionSlots } from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { MinusIcon, PlusIcon } from 'lucide-react';
import Fade from '@mui/material/Fade';

export default function FaqAccordian() {
  const [expanded, setExpanded] = React.useState<number | false>(false);

  const handleChange = (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqs = [
    {
      question: "1. How can I place an order with Defacto Delivery?",
      answer:
        "You can place an order with Defacto Delivery through our website or mobile app. Simply select the items you wish to purchase, choose your delivery address and payment method, and confirm your order.",
    },
    {
      question: "2. What types of products does Defacto Delivery offer?",
      answer:
        "Defacto Delivery offers a wide range of products including groceries, household essentials, electronics, clothing, and more. You can browse our catalog to explore the full range of available items.",
    },
    {
      question: "3. What are the delivery hours of Defacto Delivery?",
      answer:
        "Our delivery hours vary depending on your location and local regulations. Generally, we offer delivery services throughout the day, including evenings and weekends. You can check the available delivery slots during the checkout process.",
    },
    {
      question: "4. Is there a minimum order requirement for Defacto Delivery?",
      answer:
        "Yes, we have a minimum order requirement for delivery orders. The minimum order amount may vary depending on your location and the type of items you're purchasing. You can view the minimum order amount for your area during the checkout process.",
    },
    {
      question: "5. How can I track my order with Defacto Delivery?",
      answer:
        "You can track your order with Defacto Delivery through our website or mobile app. Once your order is placed, you'll receive a confirmation email or notification with a tracking link. Click on the link to view the status of your order in real-time.",
    },
    {
      question: "6. Can I schedule a delivery in advance with Defacto Delivery?",
      answer:
        "Yes, you can schedule a delivery in advance with Defacto Delivery. During the checkout process, you'll have the option to choose your preferred delivery date and time slot. We'll make sure to deliver your order at the scheduled time.",
    },
    {
      question: "7. What payment methods does Defacto Delivery accept?",
      answer:
        "Defacto Delivery accepts a variety of payment methods including credit/debit cards, digital wallets, and cash on delivery (COD). You can choose your preferred payment method during the checkout process.",
    },
  ];

  return (
    <div>
    {faqs.map((faq, index) => (
      <Accordion slots={{ transition: Fade as AccordionSlots['transition'] }}
      slotProps={{ transition: { timeout: 400 } }}
      sx={{
        '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
        '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
      }} className='bg-primary-600' key={index} expanded={expanded === index} onChange={handleChange(index)}>
        <AccordionSummary
  expandIcon={expanded === index ? <MinusIcon className='text-white' /> : <PlusIcon className='text-white' />}
  aria-controls={`panel${index + 1}-content`}
  id={`panel${index + 1}-header`}

>
  <Typography className='text-white'>{faq.question}</Typography>
</AccordionSummary>
        <AccordionDetails>
          <Typography className='text-white'>{faq.answer}</Typography>
        </AccordionDetails>
      </Accordion>
    ))}
  </div>
  );
}
