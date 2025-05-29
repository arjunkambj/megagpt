import React from "react";
import { Icon } from "@iconify/react";

const featureItems = [
  {
    title: "All AI Models Support",
    description:
      "Access all major AI models including OpenAI, Claude, Qwen, and many more in one unified platform.",
    icon: "fluent:brain-circuit-24-filled",
  },
  {
    title: "MCP Support",
    description:
      "Full integration with Multi-Chain Protocol for seamless cross-chain interactions and operations.",
    icon: "mdi:link-variant",
  },
  {
    title: "Web3 Authentication",
    description:
      "Secure, decentralized authentication using blockchain technology for enhanced privacy and control.",
    icon: "fluent:shield-keyhole-24-filled",
  },
  {
    title: "Web3 Payments",
    description:
      "Seamless cryptocurrency payments integration with multiple token support and instant transactions.",
    icon: "fluent:payment-24-filled",
  },
  {
    title: "Agentic Capabilities",
    description:
      "Autonomous agents that can purchase and sell crypto, execute trades, and perform tasks on your behalf.",
    icon: "mdi:robot",
  },
  {
    title: "Decentralized Data Storage",
    description:
      "Your data remains private and secure with our decentralized storage infrastructure.",
    icon: "fluent:database-24-filled",
  },
];

export default function Features() {
  return (
    <section className="relative w-full py-16 md:py-20" id="features">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 mx-auto max-w-4xl text-center mb-16">
          <div className="">
            <h2
              className="font-medium text-emerald-600 text-sm uppercase tracking-wider"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Features
            </h2>
          </div>
          <h1
            className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-white"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Benefits designed to provide a seamless, secure, and accessible
            experience for all users.
          </h1>
        </div>

        <div className="relative z-10 grid gap-8 md:gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {featureItems.map((feature, index) => (
            <div
              key={index}
              className="group relative"
              data-aos="fade-up"
              data-aos-delay={100 + index * 50}
            >
              {/* Background card - visible by default, enhanced on hover */}
              <div className="absolute inset-0 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/2 backdrop-blur-sm transition-all duration-300 group-hover:border-white/20 group-hover:from-white/10 group-hover:to-white/5" />

              <div className="relative p-8">
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm group-hover:bg-emerald-600/20 transition-colors duration-300">
                    <Icon
                      className="text-white group-hover:text-emerald-400 transition-colors duration-300"
                      icon={feature.icon}
                      width={24}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed text-sm group-hover:text-white/80 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
