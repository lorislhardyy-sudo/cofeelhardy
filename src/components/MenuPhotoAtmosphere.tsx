import { useId } from 'react';
import { MenuCategoryId } from '../data/coffeeData';

export type AtmosphereMode =
  | 'hot-drink'
  | 'iced-drink'
  | 'warm-pastry'
  | 'fresh-plate';

export function getItemAtmosphere(
  category: Exclude<MenuCategoryId, 'all'>,
  itemId: string
): AtmosphereMode {
  if (category === 'iced-coffees') return 'iced-drink';
  if (category === 'hot-coffees' || category === 'signature-drinks') {
    return 'hot-drink';
  }
  if (category === 'pastries') return 'warm-pastry';
  if (itemId === 'formule-matin' || itemId === 'croissant-sale') {
    return 'warm-pastry';
  }
  return 'fresh-plate';
}

interface MenuPhotoAtmosphereProps {
  mode: AtmosphereMode;
  variantIndex?: number;
}

export function MenuPhotoAtmosphere({
  mode,
  variantIndex = 0,
}: MenuPhotoAtmosphereProps) {
  const uid = useId().replace(/:/g, '');
  const steamGradId = `steam-${uid}`;
  const delayClass = `atmo-delay-${variantIndex % 4}`;

  if (mode === 'hot-drink') {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 overflow-hidden ${delayClass}`}
      >
        {/* Mouvement & frémissement du café dans la tasse */}
        <div className="atmo-liquid-swirl absolute left-[20%] right-[20%] bottom-[16%] top-[36%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,238,210,0.42)_0%,rgba(232,184,122,0.18)_48%,transparent_75%)] mix-blend-screen blur-[5px]" />
        <div className="atmo-ripple absolute left-[28%] right-[28%] bottom-[24%] top-[44%] rounded-full border border-[#FFF3DF]/45 mix-blend-screen blur-[1px]" />

        {/* Halo de chaleur montante */}
        <div className="atmo-heat-haze absolute inset-x-[18%] top-[8%] bottom-[28%] bg-[radial-gradient(ellipse_at_50%_75%,rgba(255,244,226,0.28)_0%,rgba(255,248,238,0.12)_48%,transparent_76%)] blur-[7px]" />

        {/* Volutes de vapeur chaude qui s'élèvent */}
        <svg
          viewBox="0 0 120 120"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <defs>
            <linearGradient id={steamGradId} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#FFF8EE" stopOpacity="0" />
              <stop offset="28%" stopColor="#FFF8EE" stopOpacity="0.72" />
              <stop offset="68%" stopColor="#FFFBF4" stopOpacity="0.48" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          <g className="blur-[3px]">
            <path
              d="M42 96 C34 80, 50 66, 41 48 C33 32, 48 18, 42 4"
              fill="none"
              stroke={`url(#${steamGradId})`}
              strokeWidth="6.5"
              strokeLinecap="round"
              className="atmo-steam-1"
            />
            <path
              d="M61 98 C70 82, 52 65, 62 46 C71 30, 56 16, 63 2"
              fill="none"
              stroke={`url(#${steamGradId})`}
              strokeWidth="7.5"
              strokeLinecap="round"
              className="atmo-steam-2"
            />
            <path
              d="M79 94 C72 78, 86 64, 78 46 C71 31, 83 18, 77 5"
              fill="none"
              stroke={`url(#${steamGradId})`}
              strokeWidth="5.5"
              strokeLinecap="round"
              className="atmo-steam-3"
            />
          </g>
        </svg>
      </div>
    );
  }

  if (mode === 'iced-drink') {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 overflow-hidden ${delayClass}`}
      >
        {/* Remous du lait et de l'espresso glacé à l'intérieur du verre */}
        <div className="atmo-iced-swirl-a absolute left-[18%] right-[18%] top-[22%] bottom-[12%] rounded-full bg-[conic-gradient(from_40deg_at_50%_50%,rgba(255,250,242,0.34)_0deg,transparent_105deg,rgba(225,244,240,0.3)_185deg,transparent_285deg,rgba(255,250,242,0.28)_360deg)] mix-blend-screen blur-[6px]" />
        <div className="atmo-iced-swirl-b absolute left-[24%] right-[24%] top-[28%] bottom-[18%] rounded-full bg-[radial-gradient(ellipse_at_45%_45%,rgba(235,250,248,0.38)_0%,rgba(255,246,232,0.16)_52%,transparent_76%)] mix-blend-screen blur-[4px]" />

        {/* Éclats et flottement des glaçons dans le contenant */}
        <span className="atmo-ice-glint-1 absolute left-[34%] top-[34%] w-3.5 h-3.5 rotate-12 rounded-xs bg-[#F4FFFD]/70 blur-[1px] mix-blend-screen" />
        <span className="atmo-ice-glint-2 absolute right-[32%] top-[44%] w-3 h-3 -rotate-12 rounded-xs bg-[#FFFFFF]/65 blur-[1px] mix-blend-screen" />
        <span className="atmo-ice-glint-3 absolute left-[46%] top-[28%] w-2.5 h-2.5 rotate-45 rounded-xs bg-[#E8FAF7]/70 blur-[0.5px] mix-blend-screen" />

        {/* Gouttelettes de condensation qui glissent sur la paroi fraîche */}
        <span className="atmo-drop-1 absolute left-[28%] top-[26%] w-1.5 h-2.5 rounded-full bg-white/70 blur-[0.5px]" />
        <span className="atmo-drop-2 absolute right-[29%] top-[32%] w-1.5 h-2 rounded-full bg-white/65 blur-[0.5px]" />
      </div>
    );
  }

  if (mode === 'warm-pastry') {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 overflow-hidden ${delayClass}`}
      >
        {/* Douce chaleur dorée de sortie du four */}
        <div className="atmo-oven-glow absolute left-[18%] right-[18%] top-[26%] bottom-[16%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,228,176,0.32)_0%,rgba(255,210,140,0.12)_54%,transparent_78%)] mix-blend-screen blur-[6px]" />

        {/* Légères volutes de chaleur tiède */}
        <svg
          viewBox="0 0 120 120"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <defs>
            <linearGradient id={steamGradId} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#FFF5E0" stopOpacity="0" />
              <stop offset="32%" stopColor="#FFF5E0" stopOpacity="0.52" />
              <stop offset="72%" stopColor="#FFF8EB" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          <g className="blur-[3.5px]">
            <path
              d="M46 88 C40 74, 52 60, 45 45 C39 31, 50 18, 45 6"
              fill="none"
              stroke={`url(#${steamGradId})`}
              strokeWidth="6"
              strokeLinecap="round"
              className="atmo-steam-1"
            />
            <path
              d="M72 86 C78 72, 65 58, 73 43 C79 29, 68 17, 74 5"
              fill="none"
              stroke={`url(#${steamGradId})`}
              strokeWidth="6"
              strokeLinecap="round"
              className="atmo-steam-2"
            />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${delayClass}`}
    >
      {/* Rayon de lumière matinale et éclat de fraîcheur */}
      <div className="atmo-sunbeam absolute -inset-y-4 left-[10%] right-[10%] bg-[linear-gradient(115deg,transparent_25%,rgba(255,250,235,0.28)_48%,transparent_72%)] mix-blend-screen blur-[4px]" />
      <span className="atmo-ice-glint-1 absolute left-[38%] top-[40%] w-2.5 h-2.5 rotate-45 rounded-full bg-[#FFFDF6]/70 blur-[0.5px] mix-blend-screen" />
      <span className="atmo-ice-glint-2 absolute right-[36%] top-[50%] w-2 h-2 rotate-45 rounded-full bg-[#FFFDF6]/60 blur-[0.5px] mix-blend-screen" />
    </div>
  );
}
