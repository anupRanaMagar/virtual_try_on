"use client";
import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonDress,
  faPerson,
  faShirt,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,

    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};
const DiscoverSection = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      variants={containerVariants}
      className="py-12 bg-white mb-16"
    >
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <motion.div variants={itemVariants} className="my-12 text-center">
          <h2 className="text-3xl font-semibold leading-tight text-gray-800 ">
            Discover
          </h2>
          <p className="mt-4 text-lg text-gray-600 ">
            Experience Fashion Like Never Before!
          </p>
          <p className="mt-2 text-gray-500 max-w-3xl mx-auto">
            Trying on clothes has never been easier. With our innovative virtual
            try-on feature, you can see how outfits look on you in real-time—no
            fitting room required! Explore endless styles, mix and match
            outfits, and find your perfect look from the comfort of your home.
            Start your virtual fashion journey today!
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 xl:gap-16 text-center">
          {[
            {
              imageSrc: faShirt,
              title: "Browse Styles",
              description:
                " Explore a wide range of clothing collections tailored to your taste.",
            },
            {
              imageSrc: faPerson,
              title: "Try On Virtually",
              description:
                "See how outfits fit on your digital avatar with just a few clicks.",
            },
            {
              imageSrc: faPersonDress,
              title: "Find Your Perfect Look",
              description:
                "Experiment with different styles and make confident fashion choices.",
            },
          ].map((card, index) => (
            <motion.div key={index} variants={itemVariants}>
              <DiscoverCard {...card} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const DiscoverCard = ({
  imageSrc,
  title,
  description,
}: {
  imageSrc: IconProp;
  title: string;
  description: string;
}) => (
  <div className="px-4 py-12 shadow-lg rounded-lg bg-primary-50 md:h-72">
    <div className="bg-white p-[0.6rem] rounded-full mb-4 h-12 w-12 mx-auto">
      <FontAwesomeIcon icon={imageSrc} className="h-10 w-10" />
    </div>
    <h3 className="text-xl font-medium mt-5 text-gray-800">{title}</h3>
    <p className="mt-2 text-base text-gray-500 ">{description}</p>
  </div>
);

export default DiscoverSection;
