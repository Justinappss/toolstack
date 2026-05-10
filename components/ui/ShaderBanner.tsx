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
            height: 360,
            zIndex: 0,
            opacity: 0.5,
            pointerEvents: "none",
            WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
        }}>
            <AnimatedShaderBackground />
        </div>
    );
}
