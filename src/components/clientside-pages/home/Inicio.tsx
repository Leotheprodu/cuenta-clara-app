"use client";

import { Features } from "./Features";
import { Hero } from "./Hero";
export const Inicio = () => {
  return (
    <div className="bg-primario">
      <Hero />
      <Features />
    </div>
  );
};
