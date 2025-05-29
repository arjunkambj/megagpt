import React from "react";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function Component() {
  return (
    <section className="relative w-full h-[75vh] flex items-center justify-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative z-20 mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8" data-aos="fade-up" data-aos-delay="100">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-gradient-to-b from-white/5 to-white/2 backdrop-blur-sm px-4 py-2 text-sm text-white/90">
              <Icon
                className="text-emerald-600"
                icon="solar:arrow-right-linear"
                width={16}
              />
              All AI models in one place
            </div>
          </div>

          {/* Main Heading */}
          <h1
            className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-white mb-8"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            One platform, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
              every AI at your fingertips.
            </span>
          </h1>

          {/* Description */}
          <p
            className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto mb-12"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            MegaGPT unifies GPT-4, Claude, Gemini, and more in a single
            subscription. Save money, save time, and get the best answers—every
            time.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <Button
              as={Link}
              className="rounded-full"
              color="primary"
              href="/login"
            >
              Get Started Free
            </Button>
            <Button
              as={Link}
              className="rounded-full"
              endContent={
                <Icon
                  className="text-white"
                  icon="solar:stars-minimalistic-linear"
                  width={18}
                />
              }
              href="/pricing"
              variant="bordered"
            >
              Subscribe Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
