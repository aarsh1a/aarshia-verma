"use client";

import dynamic from 'next/dynamic';
import BlurFade from "@/components/magicui/blur-fade";

// Dynamic import to avoid SSR issues with Three.js
const BlackHoleCanvas = dynamic(
  () => import('@/components/blackhole/BlackHoleCanvas'),
  { ssr: false }
);

export default function BlackHolePage() {
  return (
    <main className="flex flex-col h-[100dvh] overflow-hidden">
      <section className="flex-1 flex flex-col p-4 pt-10">
        <BlurFade delay={0.1}>
          <div className="flex flex-col items-center justify-center space-y-1 text-center mb-5">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              black hole
            </h1>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              interactive visualization of gravitational lensing and spacetime distortion.
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.3} className="flex-1 min-h-0 pb-2">
          <div className="relative w-full h-full mx-auto rounded-2xl overflow-hidden border border-white/10">
            <BlackHoleCanvas />
            {/* Proximity Data UI */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-4 font-mono text-sm text-white/90 border border-white/10">
              <p className="font-bold mb-2">PROXIMITY DATA</p>
              <p>Distance to Horizon: <span id="data-distance">...</span></p>
              <p>Relative Velocity: <span id="data-velocity">...</span></p>
              <p>Time Dilation: <span id="data-dilation">...</span></p>
            </div>
            {/* Credits */}
            <div className="absolute bottom-4 right-4 text-white/60 text-sm">
              code
            </div>
          </div>
        </BlurFade>

        <BlurFade delay={0.5}>
          <div className="flex flex-col items-center justify-center py-1 text-center">
          </div>
        </BlurFade>
      </section>
    </main>
  );
}