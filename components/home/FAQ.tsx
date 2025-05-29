"use client";

import React from "react";
import { Icon } from "@iconify/react";

import faqs from "./sub/faq-data";

export default function Component() {
  const [openItems, setOpenItems] = React.useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);

    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section className="relative w-full py-16 md:py-20" id="faq">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 mx-auto max-w-4xl text-center mb-16">
          <div className="">
            <h2
              className="font-medium text-emerald-600 text-sm uppercase tracking-wider"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              FAQ
            </h2>
          </div>
          <h1
            className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-white"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Frequently Asked Questions
          </h1>
          <p
            className="mt-6 text-lg text-white/60"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Everything you need to know about Mega GPT and its features
          </p>
        </div>

        <div className="space-y-2">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="group relative"
              data-aos="fade-up"
              data-aos-delay={100 + index * 50}
            >
              {/* Background with consistent glass-morphism styling */}
              <div className="absolute inset-0 rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/2 backdrop-blur-sm transition-all duration-300 group-hover:border-white/20 group-hover:from-white/10 group-hover:to-white/5" />

              <div className="relative">
                {/* Question */}
                <button
                  className="w-full p-6 text-left focus:outline-none"
                  onClick={() => toggleItem(index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white group-hover:text-white/90 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <Icon
                      className={`text-emerald-600 transition-transform duration-300 flex-shrink-0 ml-4 ${
                        openItems.has(index) ? "rotate-45" : ""
                      }`}
                      icon="lucide:plus"
                      width={18}
                    />
                  </div>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openItems.has(index)
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6">
                    <div className="border-t border-white/5 pt-4">
                      <p className="text-white/60 leading-relaxed text-sm">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
