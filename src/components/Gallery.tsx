import { useRef, useState } from 'react';
import { ArrowRight, Coffee, Pause, Play, Snowflake } from 'lucide-react';
import { SHOP_VIDEOS } from '../data/coffeeData';
import { BotanicalCorner, CoffeeBranchDivider } from './CoffeeDecor';

interface VideoCardProps {
  mp4: string;
  movFallback: string;
  poster: string;
  title: string;
  kicker: string;
  heading: string;
  description: string;
  notes: string;
  variant: 'warm' | 'herb';
}

function CoffeeVideoCard({
  mp4,
  movFallback,
  poster,
  title,
  kicker,
  heading,
  description,
  notes,
  variant,
}: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const styles =
    variant === 'warm'
      ? {
          frame: 'border-[#8C5A32]/50 bg-[#FBF6F0]',
          kickerColor: 'text-[#8C5A32]',
          iconWrap: 'bg-[#EFE1D1] text-[#5E3A22]',
          button: 'bg-[#5E3A22] hover:bg-[#3B2314]',
          divider: 'border-[#E6D6C3]',
        }
      : {
          frame: 'border-[#4A6B53]/50 bg-[#F4F8F4]',
          kickerColor: 'text-[#3D5A45]',
          iconWrap: 'bg-[#E1ECE3] text-[#3D5A45]',
          button: 'bg-[#3D5A45] hover:bg-[#2C4433]',
          divider: 'border-[#D3E0D5]',
        };

  return (
    <article
      className={`rounded-2xl overflow-hidden border-2 flex flex-col ${styles.frame}`}
    >
      {/* 9:16 Vertical Video Frame */}
      <div className="relative aspect-[9/16] max-h-[520px] w-full bg-[#1B100B] overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          aria-label={title}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="w-full h-full object-cover"
        >
          <source src={mp4} type="video/mp4" />
          <source src={movFallback} type="video/quicktime" />
        </video>

        {/* Clean Floating Play/Pause Control */}
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={isPlaying ? 'Mettre la vidéo en pause' : 'Lire la vidéo'}
          className={`absolute bottom-3.5 right-3.5 inline-flex items-center justify-center w-11 h-11 rounded-lg text-[#FAF4EC] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${styles.button}`}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" aria-hidden="true" />
          ) : (
            <Play className="w-4 h-4" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Editorial Coffee-Shop Presentation Panel */}
      <div className="p-6 flex-1 flex flex-col justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span
              className={`inline-flex items-center justify-center w-7 h-7 rounded-md shrink-0 ${styles.iconWrap}`}
            >
              {variant === 'warm' ? (
                <Coffee className="w-3.5 h-3.5" aria-hidden="true" />
              ) : (
                <Snowflake className="w-3.5 h-3.5" aria-hidden="true" />
              )}
            </span>
            <p className={`text-xs font-medium tracking-wide ${styles.kickerColor}`}>
              {kicker}
            </p>
          </div>

          <h3 className="font-serif text-2xl font-semibold text-[#231915] leading-snug">
            {heading}
          </h3>
          <p className="text-sm text-[#5A4D44] mt-2 leading-relaxed">
            {description}
          </p>
        </div>

        <p
          className={`pt-3 border-t text-xs font-medium text-[#6E6259] ${styles.divider}`}
        >
          {notes}
        </p>
      </div>
    </article>
  );
}

export function Gallery() {
  return (
    <section
      id="galerie"
      className="relative overflow-hidden bg-coffee-crema border-b border-[#DDD0BE]"
    >
      <BotanicalCorner
        variant="light"
        className="hidden lg:block absolute -top-4 -left-4 opacity-50"
      />
      <BotanicalCorner
        variant="light"
        className="hidden lg:block absolute -bottom-4 -right-4 rotate-180 opacity-50"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-sm font-medium text-[#3D5A45] tracking-wide mb-2">
            Savoir-faire en Vidéo
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#231915]">
            L’art du chaud et du glacé chez COFFEE LHARDY
          </h2>
          <p className="text-base text-[#5A4D44] mt-3 leading-relaxed">
            Du versement précis de notre latte art au nuage de crème sur&nbsp;glaçons,
            <br />
            retrouvez deux instants signatures préparés sous vos&nbsp;yeux.
          </p>
        </div>

        {/* Decorated Roasted-Coffee Salon Frame Around Both Videos */}
        <div className="relative rounded-2xl overflow-hidden bg-coffee-roast border border-[#4A3327] p-6 sm:p-10 lg:p-12">
          <BotanicalCorner
            variant="dark"
            className="hidden sm:block absolute -top-3 -right-3 rotate-90 opacity-65"
          />
          <BotanicalCorner
            variant="dark"
            className="hidden sm:block absolute -bottom-3 -left-3 -rotate-90 opacity-65"
          />

          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Dual Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
              <CoffeeVideoCard
                mp4={SHOP_VIDEOS.latteArt.mp4}
                movFallback={SHOP_VIDEOS.latteArt.movFallback}
                poster={SHOP_VIDEOS.latteArt.poster}
                title={SHOP_VIDEOS.latteArt.title}
                kicker="01 · Création Chaude"
                heading="Latte Art & micro-mousse"
                description="Une extraction espresso riche surmontée d’un lait fermier texturé avec finesse, dessiné à la main dans la tasse."
                notes="Cappuccino · Flat White · Café Latte"
                variant="warm"
              />

              <CoffeeVideoCard
                mp4={SHOP_VIDEOS.icedCoffee.mp4}
                movFallback={SHOP_VIDEOS.icedCoffee.movFallback}
                poster={SHOP_VIDEOS.icedCoffee.poster}
                title={SHOP_VIDEOS.icedCoffee.title}
                kicker="02 · Création Glacée"
                heading="Cafés glacés & crème fraîche"
                description="Café de spécialité versé sur glace cristalline et adouci d’un filet de crème légère pour une pause parisienne rafraîchissante."
                notes="Iced Americano · Iced Latte · Cold Brew"
                variant="herb"
              />
            </div>

            <div className="mt-10 flex flex-col items-center gap-6">
              <CoffeeBranchDivider className="w-full max-w-md opacity-80" />
              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-medium text-[#241610] bg-[#EFE3D2] hover:bg-[#FAF4EC] rounded-lg transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EFE3D2]"
              >
                <span>Découvrir toute notre carte</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
