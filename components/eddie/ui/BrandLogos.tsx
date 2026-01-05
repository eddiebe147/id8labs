"use client";

// Monochromatic brand logos - simplified SVG versions
// All logos are displayed in a single color for cohesive aesthetic

interface LogoProps {
  className?: string;
  color?: string;
}

export function GELogo({ className = "w-12 h-12", color = "currentColor" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill={color}>
      <circle cx="50" cy="50" r="45" fill="none" stroke={color} strokeWidth="4" />
      <text x="50" y="62" textAnchor="middle" fontSize="38" fontWeight="bold" fontFamily="serif" fill={color}>
        GE
      </text>
    </svg>
  );
}

export function HondaLogo({ className = "w-16 h-12", color = "currentColor" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 120 60" fill={color}>
      <path d="M10 50V10h12v16h8V10h12v40h-12V34h-8v16H10zM46 30c0-11 9-20 20-20s20 9 20 20-9 20-20 20-20-9-20-20zm12 0c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8-8 3.6-8 8zM90 10h12l14 26V10h10v40h-12L100 24v26H90V10z" />
    </svg>
  );
}

export function RevlonLogo({ className = "w-20 h-10", color = "currentColor" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 140 40" fill={color}>
      <text x="70" y="30" textAnchor="middle" fontSize="24" fontWeight="bold" fontFamily="serif" letterSpacing="4" fill={color}>
        REVLON
      </text>
    </svg>
  );
}

export function BurgerKingLogo({ className = "w-14 h-14", color = "currentColor" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill={color}>
      {/* Simplified burger bun shape */}
      <ellipse cx="50" cy="25" rx="35" ry="15" fill="none" stroke={color} strokeWidth="3" />
      <ellipse cx="50" cy="75" rx="35" ry="15" fill="none" stroke={color} strokeWidth="3" />
      {/* Burger patty */}
      <rect x="18" y="45" width="64" height="10" rx="5" fill={color} />
      {/* Text */}
      <text x="50" y="38" textAnchor="middle" fontSize="8" fontWeight="bold" fill={color}>BK</text>
    </svg>
  );
}

export function LouboutinLogo({ className = "w-14 h-14", color = "currentColor" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill={color}>
      {/* Iconic high heel silhouette */}
      <path
        d="M20 85 L30 40 Q35 30 50 25 Q65 20 75 25 L80 30 L82 40 L75 42 L70 85 Z"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
      />
      {/* Stiletto heel */}
      <path d="M25 85 L28 55 L32 55 L30 85 Z" fill={color} />
      {/* Sole line */}
      <path d="M20 85 L70 85" stroke={color} strokeWidth="3" />
    </svg>
  );
}

export function ArcadisLogo({ className = "w-20 h-10", color = "currentColor" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 140 40" fill={color}>
      {/* Stylized A with arc */}
      <path d="M15 35 L25 5 L35 35 M20 25 L30 25" fill="none" stroke={color} strokeWidth="3" />
      <text x="85" y="28" textAnchor="middle" fontSize="18" fontWeight="500" fontFamily="sans-serif" letterSpacing="1" fill={color}>
        ARCADIS
      </text>
    </svg>
  );
}

export function DaseLogo({ className = "w-16 h-10", color = "currentColor" }: LogoProps) {
  return (
    <svg className={className} viewBox="0 0 100 40" fill={color}>
      <text x="50" y="28" textAnchor="middle" fontSize="20" fontWeight="600" fontFamily="sans-serif" fontStyle="italic" letterSpacing="2" fill={color}>
        DASÉ
      </text>
    </svg>
  );
}

// Map brand names to logo components
export const brandLogos: Record<string, React.ComponentType<LogoProps>> = {
  "GE": GELogo,
  "Honda": HondaLogo,
  "Revlon": RevlonLogo,
  "Burger King / Jersey Shore": BurgerKingLogo,
  "Christian Louboutin": LouboutinLogo,
  "Arcadis Engineering": ArcadisLogo,
  "Dasé Clothing Co": DaseLogo,
};
