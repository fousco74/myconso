"use client";

import Image from "next/image";
import React from "react";

type Props = {
    value: number;       // 0..100
    size?: number;       // px
    stroke?: number;     // épaisseur
    trackColor?: string; // couleur du fond
    progressColor?: string; // couleur de la progression
    rounded?: boolean;   // bouts arrondis
    showLabel?: boolean; // afficher % au centre
};

export default function CircleProgress({
    value,
    size = 220,
    stroke = 10,
    trackColor = "rgba(0,0,0,0.1)",
    progressColor = "currentColor",
    rounded = true,
    showLabel = true,
}: Props) {
    const clamped = Math.max(0, Math.min(100, value));
    const r = (size - stroke) / 2;
    const C = 2 * Math.PI * r;
    const dashOffset = C * (1 - clamped / 100);

    return (
        <div
            className="relative inline-block"
            style={{ width: size, height: size }}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(clamped)}
            aria-label="Progression"
        >
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <g transform={`translate(${size / 2}, ${size / 2})`}>
                    {/* piste */}
                    <circle r={r} fill="none" stroke={trackColor} strokeWidth={stroke} />
                    {/* progression */}
                    <g transform="rotate(-90)">
                        <circle
                            r={r}
                            fill="none"
                            stroke={progressColor}
                            strokeWidth={stroke}
                            strokeDasharray={C}
                            strokeDashoffset={dashOffset}
                            strokeLinecap={rounded ? "round" : "butt"}
                        />
                    </g>
                </g>
            </svg>

            {showLabel && (
                <div className="absolute inset-0 grid place-items-center select-none">
                    <span style={{ fontWeight: 700, fontSize: size * 0.22 }}>
                        {Math.round(clamped)}
                    </span>
                    <div className="absolute right-10 leading-none">
                        <div>
                            <span className="text-lg">CO</span>
                            <span className="text-[10px]">2</span><br />
                        </div>
                        <div className="text-lg">Kg</div>
                    </div>
                    <Image src="/icons/carbone-icone-in.svg" width={30} height={30} alt="carbon-icon" className="absolute bottom-10" />
                </div>
            )}
        </div>
    );
}
