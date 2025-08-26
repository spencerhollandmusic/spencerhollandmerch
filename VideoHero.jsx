import React from "react";

export function VideoHero() {
  return (
    <section id="home" className="relative min-h-[100svh]">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/background.jpg')" }}
        aria-hidden="true"
      />
      
      {/* Replace this with your "Spencer Holland" hero text or other content */}
      <div className="relative flex items-center justify-center min-h-[100svh]">
        <h1 className="text-white text-6xl md:text-8xl font-bold">
          Spencer Holland
        </h1>
      </div>
    </section>
  );
}
