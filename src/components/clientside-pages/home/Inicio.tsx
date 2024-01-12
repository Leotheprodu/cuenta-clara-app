"use client";

import { useNamingPagesRoutes } from "@/components/hooks/useNamingPagesRoutes";
import { Features } from "./Features";
import { Hero } from "./Hero";
export const Inicio = () => {
  useNamingPagesRoutes({ internalLink: "home" });
  return (
    <div className="bg-primario">
      <Hero />
      <Features />
    </div>
  );
};
