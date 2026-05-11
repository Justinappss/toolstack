'use client';

import dynamic from 'next/dynamic';

const AnimatedShaderBackground = dynamic(
    () => import('@/components/ui/animated-shader-background'),
    { ssr: false }
);

export default function ShaderBanner() {
    return (
        <div style={{
            position: "fixed",
            top: 0, left: 0, right: 0,
            height: 520,
            zIndex: 1,
            opacity: 0.9,
            pointerEvents: "none",
            WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
        }}>
            <AnimatedShaderBackground />
        </div>
    );
}
