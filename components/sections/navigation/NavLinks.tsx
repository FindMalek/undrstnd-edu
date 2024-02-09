import Link from "next/link";
import { useState } from "react";

import { AnimatePresence } from "framer-motion";

import { marketingConfig } from "@config/marketing";
import PresenceAnimate from "@components/sections/navigation/PresenceAnimate";

export default function NavLinks() {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return marketingConfig.mainNav.map(({ title, href }, index) => (
    <Link
      key={title}
      href={href}
      className="relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors delay-150 hover:text-gray-900 hover:delay-[150ms]"
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <AnimatePresence>
        {hoveredIndex === index && <PresenceAnimate />}
      </AnimatePresence>
      <span className="relative z-10">{title}</span>
    </Link>
  ));
}
