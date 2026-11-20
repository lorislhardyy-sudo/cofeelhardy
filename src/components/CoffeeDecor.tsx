import { useId } from 'react';

export function BrandLogo({
  variant = 'light',
  className = '',
}: {
  variant?: 'light' | 'dark';
  className?: string;
}) {
  const uid = useId();
  const gradId = `gold-bean-grad-${variant}-${uid}`;
  const ringStroke = variant === 'dark' ? '#E5BA5C' : '#A67818';
  const outlineStroke = variant === 'dark' ? '#F6DE92' : '#7D540B';
  const cleftStroke = variant === 'dark' ? '#1D1410' : '#4A2E14';

  return (
    <svg
      aria-hidden="true"
      width="36"
      height="36"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      <defs>
        <linearGradient
          id={gradId}
          x1="8"
          y1="6"
          x2="32"
          y2="34"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FDF0B4" />
          <stop offset="42%" stopColor="#E6B94A" />
          <stop offset="78%" stopColor="#C28E22" />
          <stop offset="100%" stopColor="#8F630D" />
        </linearGradient>
      </defs>

      {/* Delicate brushed gold seal ring */}
      <circle
        cx="20"
        cy="20"
        r="17.5"
        stroke={ringStroke}
        strokeOpacity="0.45"
        strokeWidth="1"
      />

      {/* Sculpted golden coffee bean */}
      <g transform="rotate(-22 20 20)">
        <ellipse
          cx="20"
          cy="20"
          rx="10"
          ry="14"
          fill={`url(#${gradId})`}
          stroke={outlineStroke}
          strokeWidth="1.1"
        />

        {/* Specular gold highlight along left curve */}
        <path
          d="M13.8 12.2C12.3 16.5 12.3 23.2 13.9 27.6"
          stroke="#FFF7D4"
          strokeOpacity="0.72"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Subtle S-curve coffee bean roast cleft behind the signature */}
        <path
          d="M19.8 7.2C17.4 13 22.8 25.5 20.2 32.8"
          stroke={cleftStroke}
          strokeOpacity="0.38"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
      </g>

      {/* Engraved calligraphic "CL" signature flourish across the golden bean */}
      <g transform="rotate(-7 20 20)">
        {/* Subtle bright gold bevel */}
        <path
          d="M19.2 16.6C16.2 15.8 13.6 18.2 14.1 21.4C14.5 23.8 17.5 24.1 19.6 21.8C21.2 20 22.8 16.4 22.4 14.6C22.1 13.6 20.9 14.4 20.5 16.5L19.6 22.8C19.4 23.9 20.4 24.2 21.8 23.3C23.5 22.2 25.4 21.4 27.4 21.6"
          stroke="#FFF6CE"
          strokeOpacity="0.65"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(0.4 0.5)"
        />
        {/* Deep espresso engraved ink */}
        <path
          d="M19.2 16.6C16.2 15.8 13.6 18.2 14.1 21.4C14.5 23.8 17.5 24.1 19.6 21.8C21.2 20 22.8 16.4 22.4 14.6C22.1 13.6 20.9 14.4 20.5 16.5L19.6 22.8C19.4 23.9 20.4 24.2 21.8 23.3C23.5 22.2 25.4 21.4 27.4 21.6"
          stroke="#2A170B"
          strokeWidth="1.45"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Signature underline sweep */}
        <path
          d="M14.4 25.7C18.2 24.6 22.8 24.4 26.8 24.7"
          stroke="#2A170B"
          strokeOpacity="0.85"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

interface CoffeeBranchDividerProps {
  className?: string;
}

export function CoffeeBranchDivider({ className = '' }: CoffeeBranchDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center gap-4 ${className}`}
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#CBB8A0] to-[#A6896B]" />
      <svg
        width="84"
        height="28"
        viewBox="0 0 84 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Botanical stem */}
        <path
          d="M6 16C24 12 42 15 78 13"
          stroke="#5E3A22"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        {/* Herb & coffee leaves (sage / matcha green) */}
        <path
          d="M22 14C19 7 25 3 31 6C29 11 26 14 22 14Z"
          fill="#4A6B53"
          fillOpacity="0.28"
          stroke="#3D5A45"
          strokeWidth="1.1"
        />
        <path
          d="M36 14C37 21 44 24 48 19C44 15 40 13 36 14Z"
          fill="#4A6B53"
          fillOpacity="0.28"
          stroke="#3D5A45"
          strokeWidth="1.1"
        />
        <path
          d="M54 14C52 7 58 3 64 7C61 11 58 14 54 14Z"
          fill="#4A6B53"
          fillOpacity="0.28"
          stroke="#3D5A45"
          strokeWidth="1.1"
        />
        {/* Roasted coffee beans */}
        <ellipse
          cx="43"
          cy="10"
          rx="3.4"
          ry="4.5"
          transform="rotate(-22 43 10)"
          fill="#6E4427"
          fillOpacity="0.85"
        />
        <path
          d="M42 6.5C43 9 43 11 44.2 13.5"
          stroke="#F6EFE5"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        <ellipse
          cx="69"
          cy="17.5"
          rx="3"
          ry="4"
          transform="rotate(20 69 17.5)"
          fill="#8C5A32"
          fillOpacity="0.85"
        />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#CBB8A0] to-[#A6896B]" />
    </div>
  );
}

export function BotanicalCorner({
  variant = 'light',
  className = '',
}: {
  variant?: 'light' | 'dark';
  className?: string;
}) {
  const stemStroke = variant === 'dark' ? '#C79B6B' : '#6E4427';
  const leafFill = variant === 'dark' ? '#6D9478' : '#4A6B53';
  const leafStroke = variant === 'dark' ? '#8CB396' : '#3D5A45';

  return (
    <svg
      aria-hidden="true"
      width="160"
      height="160"
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
    >
      <path
        d="M12 146C34 102 68 68 128 24"
        stroke={stemStroke}
        strokeOpacity="0.45"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M36 112C22 96 28 76 46 82C48 96 44 106 36 112Z"
        fill={leafFill}
        fillOpacity="0.22"
        stroke={leafStroke}
        strokeOpacity="0.5"
        strokeWidth="1.2"
      />
      <path
        d="M58 88C74 96 86 82 76 68C64 70 58 78 58 88Z"
        fill={leafFill}
        fillOpacity="0.22"
        stroke={leafStroke}
        strokeOpacity="0.5"
        strokeWidth="1.2"
      />
      <path
        d="M84 62C70 46 78 28 96 34C96 48 92 56 84 62Z"
        fill={leafFill}
        fillOpacity="0.22"
        stroke={leafStroke}
        strokeOpacity="0.5"
        strokeWidth="1.2"
      />
      <path
        d="M108 42C124 46 132 34 122 22C112 24 108 32 108 42Z"
        fill={leafFill}
        fillOpacity="0.22"
        stroke={leafStroke}
        strokeOpacity="0.5"
        strokeWidth="1.2"
      />
      <ellipse
        cx="52"
        cy="104"
        rx="5"
        ry="7"
        transform="rotate(-18 52 104)"
        fill={stemStroke}
        fillOpacity="0.35"
      />
      <ellipse
        cx="96"
        cy="54"
        rx="4.5"
        ry="6.5"
        transform="rotate(24 96 54)"
        fill={stemStroke}
        fillOpacity="0.35"
      />
    </svg>
  );
}
