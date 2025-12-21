"use client";

import { useEffect, useRef } from 'react';

interface BlackHoleCanvasProps {
    className?: string;
}

export default function BlackHoleCanvas({ className = '' }: BlackHoleCanvasProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const experienceRef = useRef<any>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Dynamically import to avoid SSR issues
        const initExperience = async () => {
            try {
                // Reset singletons before creating new instance
                const ExperienceModule = await import('./Experience/Experience.js');
                const NoisesModule = await import('./Experience/Noises.js');
                const Experience = ExperienceModule.default;
                const Noises = NoisesModule.default;

                // Clear any existing singletons
                if (Experience.instance) {
                    Experience.instance = null;
                }
                if (Noises.instance) {
                    Noises.instance = null;
                }

                // Create new experience
                experienceRef.current = new Experience({
                    targetElement: containerRef.current
                });
            } catch (error) {
                console.error('Failed to initialize BlackHole Experience:', error);
            }
        };

        initExperience();

        // Cleanup on unmount
        return () => {
            if (experienceRef.current) {
                // Try to clean up
                if (experienceRef.current.destroy) {
                    experienceRef.current.destroy();
                }
                // Reset singleton
                const Experience = experienceRef.current.constructor;
                if (Experience && Experience.instance) {
                    Experience.instance = null;
                }
                experienceRef.current = null;
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`absolute inset-0 w-full h-full ${className}`}
        />
    );
}
