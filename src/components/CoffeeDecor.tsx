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
