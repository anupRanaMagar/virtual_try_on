"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="relative h-screen">
      <Image
        // src="/landing-splash.jpg"
        src="/hero_image.webp"
        alt="Rentiful Rental Platform Hero Section"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-55"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-1/3 transform -translate-x-1/3 -translate-y-1/2 text-center w-full"
      >
        <div className="max-w-4xl mx-auto px-16 sm:px-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Begin your journey to discovering the perfect outfit.
          </h1>
          <p className="text-xl text-white mb-8">
            Revolutionize the way you shop with our cutting-edge virtual try-on
            experience—simply upload your photo, try on different outfits in
            real time, and find your perfect look without ever stepping into a
            store!
          </p>
          <div className="">
            <Link href="/login">
              <Button className="bg-secondary-500 text-white rounded-xl border-none hover:bg-secondary-600 h-12">
                Try On Now
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
