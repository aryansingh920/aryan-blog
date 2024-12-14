"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Accordion Component
 *
 * Usage Example:
 * <Accordion
 *    items={[
 *      { key: 'item1', title: 'Section 1', content: 'Content for Section 1' },
 *      { key: 'item2', title: 'Section 2', content: 'Content for Section 2' },
 *    ]}
 * />
 */

interface AccordionItem {
  key: string;
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpenKey?: string; // Optional key to open by default
}

export default function Accordion({ items, defaultOpenKey }: AccordionProps) {
  const [openKey, setOpenKey] = useState<string | null>(defaultOpenKey || null);

  const toggleAccordion = (key: string) => {
    setOpenKey((prevKey) => (prevKey === key ? null : key));
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 border border-gray-200 rounded-md">
      {items.map((item) => (
        <div key={item.key} className="mb-2">
          {/* Title */}
          <button
            onClick={() => toggleAccordion(item.key)}
            className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 text-left text-gray-800 font-medium rounded"
          >
            <span>{item.title}</span>
            <span>
              {openKey === item.key ? (
                <span className="transform rotate-90">&#x25BC;</span>
              ) : (
                <span>&#x25B6;</span>
              )}
            </span>
          </button>

          {/* Content */}
          <AnimatePresence>
            {openKey === item.key && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="p-4 bg-white border-t border-gray-200 text-gray-700"
              >
                {item.content}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
