"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Tab, Tabs } from "@heroui/tabs";

import { FrequencyEnum, Tier, Frequency } from "./sub/pricing-types";
import { tiers, frequencies } from "./sub/pricing-tiers";

export default function Component() {
  const [selectedFrequency, setSelectedFrequency] = React.useState<Frequency>(
    frequencies.find((f) => f.key === FrequencyEnum.Monthly) || frequencies[0],
  );

  const onFrequencyChange = (key: React.Key) => {
    const newFrequency = frequencies.find((f) => f.key === key);

    if (newFrequency) {
      setSelectedFrequency(newFrequency);
    }
  };

  return (
    <section className="relative w-full py-16 md:py-20" id="pricing">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 mx-auto max-w-4xl text-center mb-16">
          <div className="">
            <h2
              className="font-medium text-emerald-600 text-sm uppercase tracking-wider"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Pricing
            </h2>
          </div>
          <h1
            className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-white"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Simple, transparent pricing
          </h1>
          <p
            className="mt-6 text-lg text-white/60"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Get unlimited access to all AI models with a simple monthly
            subscription. No hidden fees, no token limits.
          </p>
        </div>

        <div
          className="mt-10 flex justify-center mb-12"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <Tabs
            classNames={{
              tabList: "bg-white/5 border border-white/10 backdrop-blur-sm",
              cursor: "bg-emerald-600",
              tab: "data-[hover-unselected=true]:opacity-90 text-white/70 data-[selected=true]:text-white",
            }}
            radius="full"
            selectedKey={selectedFrequency.key}
            onSelectionChange={onFrequencyChange}
          >
            {frequencies.map((frequency) => (
              <Tab key={frequency.key} title={frequency.label} />
            ))}
          </Tabs>
        </div>

        <div className="relative z-10 grid gap-8 md:grid-cols-3">
          {tiers.map((tier: Tier, index: number) => (
            <div
              key={index}
              className={`group relative ${tier.mostPopular ? "md:-mt-4 md:mb-4" : ""}`}
              data-aos="fade-up"
              data-aos-delay={200 + index * 100}
            >
              {/* Background card - visible by default, enhanced on hover */}
              <div
                className={`absolute inset-0 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
                  tier.mostPopular
                    ? "border-emerald-600/30 bg-gradient-to-b from-emerald-600/10 to-emerald-600/5 group-hover:border-emerald-600/50 group-hover:from-emerald-600/15 group-hover:to-emerald-600/10"
                    : "border-white/10 bg-gradient-to-b from-white/5 to-white/2 group-hover:border-white/20 group-hover:from-white/10 group-hover:to-white/5"
                }`}
              />

              {tier.mostPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="relative p-8">
                {/* Header */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {tier.title}
                  </h3>
                  <p className="text-white/60 text-sm">{tier.description}</p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">
                      {typeof tier.price === "string"
                        ? tier.price
                        : tier.price[selectedFrequency.key]}
                    </span>
                    {typeof tier.price !== "string" && (
                      <span className="text-white/60 text-sm">
                        {tier.priceSuffix
                          ? `/${tier.priceSuffix}/${selectedFrequency.priceSuffix}`
                          : `/${selectedFrequency.priceSuffix}`}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <ul className="space-y-3">
                    {tier.features?.map((feature: string) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Icon
                          className="text-emerald-600 mt-0.5 flex-shrink-0"
                          icon="ci:check"
                          width={20}
                        />
                        <span className="text-white/70 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button */}
                <Button
                  fullWidth
                  as={Link}
                  className={`${
                    tier.mostPopular
                      ? "bg-emerald-600 text-white hover:bg-emerald-500"
                      : "bg-white/10 border border-white/20 text-white hover:bg-white/20"
                  } transition-all duration-300 font-medium`}
                  href={tier.href}
                  radius="lg"
                  size="lg"
                >
                  {tier.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
