import espressoImg from '../assets/images/espresso_classique_1794564996739.jpg';
import cafeAllongeImg from '../assets/images/cafe_allonge_1794564997378.jpg';
import noisetteCortadoImg from '../assets/images/noisette_cortado_1794564997442.jpg';
import flatWhiteImg from '../assets/images/flat_white_1794564997996.jpg';
import cafeLatteImg from '../assets/images/cafe_latte_1794564999022.jpg';
import icedAmericanoImg from '../assets/images/iced_americano_1794564998199.jpg';
import icedLatteImg from '../assets/images/iced_latte_1794564999384.jpg';
import icedMochaImg from '../assets/images/iced_mocha_1794564999093.jpg';
import coldBrewImg from '../assets/images/cold_brew_1794564999915.jpg';
import chaiLatteImg from '../assets/images/chai_latte_1794565000394.jpg';
import vanillaLatteImg from '../assets/images/vanilla_latte_1794565000554.jpg';
import chocolatChaudImg from '../assets/images/chocolat_chaud_1794565000703.jpg';
import croissantBeurreImg from '../assets/images/croissant_beurre_1794565001183.jpg';
import painAuChocolatImg from '../assets/images/pain_au_chocolat_1794565001747.jpg';
import briocheFeuilleteeImg from '../assets/images/brioche_feuilletee_1794565001923.jpg';
import cookieChocolatImg from '../assets/images/cookie_chocolat_1794565002799.jpg';
import brownieCacaoImg from '../assets/images/brownie_cacao_1794565003204.jpg';
import formuleMatinImg from '../assets/images/formule_matin_1794565003216.jpg';
import toastAvocatImg from '../assets/images/toast_avocat_1794565003724.jpg';
import croissantComteImg from '../assets/images/croissant_comte_1794565003759.jpg';
import granolaBowlImg from '../assets/images/granola_bowl_1794565004006.jpg';

export type MenuCategoryId =
  | 'all'
  | 'hot-coffees'
  | 'iced-coffees'
  | 'signature-drinks'
  | 'pastries'
  | 'food-breakfast';

export interface MenuCategory {
  id: Exclude<MenuCategoryId, 'all'>;
  label: string;
  subtitle: string;
}

export interface MenuItem {
  id: string;
  category: Exclude<MenuCategoryId, 'all'>;
  name: string;
  description: string;
  priceEur: string;
  image: string;
  imageAlt: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: string;
}

export const BRAND_CONTACT = {
  name: 'COFFEE LHARDY',
  address: '8 rue des Champs-Élysées',
  district: '75008 Paris, France',
  phone: '07 84 55 63 28',
  phoneHref: 'tel:+33784556328',
  email: 'cofeelhardy@gmail.com',
  emailHref: 'mailto:cofeelhardy@gmail.com',
  hours: '8h – 21h · 7/7 j',
  mapsEmbedUrl:
    'https://www.google.com/maps?q=8+Rue+des+Champs-%C3%89lys%C3%A9es,+75008+Paris,+France&output=embed',
  mapsDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=8+Rue+des+Champs-%C3%89lys%C3%A9es,+75008+Paris,+France',
} as const;

export const SHOP_PHOTOS = {
  interiorBar: '/assets/aistudio/cofee_shop_2_6baf4b35.jpg',
  latteTray: '/assets/aistudio/cofee_shop_1_d359a355.jpg',
  barista: '/assets/aistudio/cofee_shop_3_2d7fd0e4.jpg',
  drinksAndPastries: '/assets/aistudio/cofee_shop_4_bf662321.jpg',
} as const;

export const SHOP_VIDEOS = {
  latteArt: {
    mp4: '/assets/aistudio/coffee_lhardy_latte_art.mp4',
    movFallback:
      '/assets/aistudio/ScreenRecording_11-13-2026_10-49-22_1_fa8e872d.mov',
    poster: '/assets/aistudio/coffee_lhardy_latte_art_poster.jpg',
    title: 'Versement de latte art en direct chez COFFEE LHARDY',
  },
  icedCoffee: {
    mp4: '/assets/aistudio/coffee_lhardy_iced_coffee.mp4',
    movFallback:
      '/assets/aistudio/ScreenRecording_11-13-2026_11-35-04_1_723026b6.mov',
    poster: '/assets/aistudio/coffee_lhardy_iced_coffee_poster.jpg',
    title: 'Préparation de café glacé avec crème fraîchement versée chez COFFEE LHARDY',
  },
} as const;

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-interior',
    src: SHOP_PHOTOS.interiorBar,
    alt: 'Comptoir principal en bois cannelé et vitrine de pâtisseries chez Coffee Lhardy',
    caption: 'Notre comptoir en bois cannelé, suspensions architecturales et vitrine du matin.',
    category: 'L’espace',
  },
  {
    id: 'photo-barista',
    src: SHOP_PHOTOS.barista,
    alt: 'Barista préparant un espresso sur machine professionnelle chez Coffee Lhardy',
    caption: 'Extraction de précision et savoir-faire barista au fil de la journée.',
    category: 'Savoir-faire',
  },
  {
    id: 'photo-latte-tray',
    src: SHOP_PHOTOS.latteTray,
    alt: 'Deux cappuccinos servis en tasses cannelées avec biscuit sur plateau en bois',
    caption: 'Cappuccinos en tasses cannelées accompagnés de notre cookie maison.',
    category: 'Cafés chauds',
  },
  {
    id: 'photo-drinks-pastries',
    src: SHOP_PHOTOS.drinksAndPastries,
    alt: 'Assortiment de matcha latte, cafés à emporter, brioche feuilletée et pâtisseries',
    caption: 'Matcha latte cérémoniel, cafés à emporter, brioche feuilletée et douceurs cacao.',
    category: 'Signatures & Pâtisseries',
  },
];

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'hot-coffees',
    label: 'Cafés Chauds',
    subtitle: 'Grains de spécialité torréfiés avec précision et lait fermier ou végétal.',
  },
  {
    id: 'iced-coffees',
    label: 'Cafés Glacés',
    subtitle: 'Extractions fraîches servies sur glace cristalline.',
  },
  {
    id: 'signature-drinks',
    label: 'Boissons Signatures',
    subtitle: 'Recettes de la maison préparées à la commande.',
  },
  {
    id: 'pastries',
    label: 'Pâtisseries',
    subtitle: 'Viennoiseries pur beurre et biscuits cuits chaque matin.',
  },
  {
    id: 'food-breakfast',
    label: 'Salé & Petit-Déjeuner',
    subtitle: 'Assiettes fraîches et formules matinales au cœur du 8e arrondissement.',
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // Cafés Chauds
  {
    id: 'espresso',
    category: 'hot-coffees',
    name: 'Espresso Classique',
    description: 'Extraction courte et équilibrée de notre assemblage de spécialité, notes de cacao et noisette grillée.',
    priceEur: '3,50 €',
    image: espressoImg,
    imageAlt: 'Espresso Classique servi en tasse cannelée sur plateau en chêne',
  },
  {
    id: 'americano',
    category: 'hot-coffees',
    name: 'Café Allongé / Americano',
    description: 'Double espresso allongé à l’eau chaude filtrée, tasse longue et aromatique.',
    priceEur: '4,00 €',
    image: cafeAllongeImg,
    imageAlt: 'Café Allongé Americano chaud en tasse céramique blanche',
  },
  {
    id: 'cortado',
    category: 'hot-coffees',
    name: 'Noisette / Cortado',
    description: 'Espresso intense adouci par une juste mesure de lait chaud finement texturé.',
    priceEur: '4,50 €',
    image: noisetteCortadoImg,
    imageAlt: 'Noisette Cortado à la micro-mousse veloutée',
  },
  {
    id: 'cappuccino',
    category: 'hot-coffees',
    name: 'Cappuccino',
    description: 'Espresso double, lait entier velouté et mousse onctueuse travaillée en latte art.',
    priceEur: '5,50 €',
    image: SHOP_PHOTOS.latteTray,
    imageAlt: 'Cappuccino en tasse cannelée servi sur plateau en bois',
  },
  {
    id: 'flat-white',
    category: 'hot-coffees',
    name: 'Flat White',
    description: 'Double ristretto riche surmonté d’une micro-mousse fine et soyeuse.',
    priceEur: '5,50 €',
    image: flatWhiteImg,
    imageAlt: 'Flat White avec latte art rosetta en tasse cannelée',
  },
  {
    id: 'cafe-latte',
    category: 'hot-coffees',
    name: 'Café Latte',
    description: 'Grand classique doux et généreux (lait entier ou option avoine disponible).',
    priceEur: '6,00 €',
    image: cafeLatteImg,
    imageAlt: 'Café Latte onctueux en tasse céramique blanche',
  },

  // Cafés Glacés
  {
    id: 'iced-americano',
    category: 'iced-coffees',
    name: 'Iced Americano',
    description: 'Double espresso versé sur eau fraîche et glaçons, vif et désaltérant.',
    priceEur: '5,00 €',
    image: icedAmericanoImg,
    imageAlt: 'Iced Americano servi sur glaçons en verre transparent',
  },
  {
    id: 'iced-latte',
    category: 'iced-coffees',
    name: 'Iced Latte',
    description: 'Lait frais ou boisson avoine sur glace, couronné d’un double shot d’espresso.',
    priceEur: '6,50 €',
    image: icedLatteImg,
    imageAlt: 'Iced Latte au lait froid et espresso sur glace',
  },
  {
    id: 'iced-mocha',
    category: 'iced-coffees',
    name: 'Iced Mocha',
    description: 'Alliance d’espresso, de chocolat noir fondu et de lait glacé.',
    priceEur: '7,00 €',
    image: icedMochaImg,
    imageAlt: 'Iced Mocha au chocolat noir et espresso glacé',
  },
  {
    id: 'cold-brew',
    category: 'iced-coffees',
    name: 'Cold Brew Maison',
    description: 'Infusion lente à froid pendant 16 heures, rondeur chocolatée et faible acidité.',
    priceEur: '6,00 €',
    image: coldBrewImg,
    imageAlt: 'Cold Brew maison servi sur un grand glaçon cristallin',
  },

  // Boissons Signatures
  {
    id: 'matcha-latte',
    category: 'signature-drinks',
    name: 'Matcha Latte Cérémoniel',
    description: 'Thé vert matcha japonais fouetté au bambou, servi chaud ou glacé avec lait velouté.',
    priceEur: '6,50 €',
    image: SHOP_PHOTOS.drinksAndPastries,
    imageAlt: 'Matcha latte cérémoniel et boissons signatures sur plateau en bois',
  },
  {
    id: 'chai-latte',
    category: 'signature-drinks',
    name: 'Chai Latte Épicé',
    description: 'Infusion de thé noir aux épices douces, cardamome, cannelle et mousse de lait.',
    priceEur: '6,00 €',
    image: chaiLatteImg,
    imageAlt: 'Chai Latte épicé saupoudré de cannelle en tasse cannelée',
  },
  {
    id: 'vanilla-latte',
    category: 'signature-drinks',
    name: 'Latte Vanille Bourbon',
    description: 'Double espresso, lait onctueux et sirop artisanal infusé à la gousse de vanille.',
    priceEur: '6,80 €',
    image: vanillaLatteImg,
    imageAlt: 'Latte Vanille Bourbon servi avec gousse de vanille',
  },
  {
    id: 'hot-chocolate',
    category: 'signature-drinks',
    name: 'Chocolat Chaud Grand Cru',
    description: 'Véritable chocolat noir de couverture fondu lentement dans du lait entier.',
    priceEur: '6,50 €',
    image: chocolatChaudImg,
    imageAlt: 'Chocolat Chaud Grand Cru velouté en tasse blanche',
  },

  // Pâtisseries
  {
    id: 'croissant',
    category: 'pastries',
    name: 'Croissant au Beurre AOP',
    description: 'Feuilletage doré et croustillant pur beurre, cuit sur place chaque matin.',
    priceEur: '3,20 €',
    image: croissantBeurreImg,
    imageAlt: 'Croissant au beurre AOP doré et feuilleté sur assiette en bois',
  },
  {
    id: 'pain-au-chocolat',
    category: 'pastries',
    name: 'Pain au Chocolat',
    description: 'Pâte feuilletée levée et doubles barres de chocolat noir fondant.',
    priceEur: '3,50 €',
    image: painAuChocolatImg,
    imageAlt: 'Pain au Chocolat artisanal feuilleté et chocolat noir fondant',
  },
  {
    id: 'brioche-feuilletee',
    category: 'pastries',
    name: 'Brioche Feuilletée Maison',
    description: 'Feuilletage aérien caramélisé en surface et cœur tendre au beurre.',
    priceEur: '4,50 €',
    image: briocheFeuilleteeImg,
    imageAlt: 'Brioche feuilletée maison caramélisée sur assiette en chêne',
  },
  {
    id: 'cookie-chocolat',
    category: 'pastries',
    name: 'Cookie Chocolat & Noisette',
    description: 'Biscuit épais au cœur fondant, pépites de chocolat noir et éclats grillés.',
    priceEur: '4,50 €',
    image: cookieChocolatImg,
    imageAlt: 'Cookie épais aux pépites de chocolat noir et noisettes grillées',
  },
  {
    id: 'brownie-cacao',
    category: 'pastries',
    name: 'Fondant Brownie Cacao',
    description: 'Pâtisserie dense au chocolat noir intense, juste sortie du four.',
    priceEur: '5,00 €',
    image: brownieCacaoImg,
    imageAlt: 'Fondant Brownie Cacao au chocolat noir intense sur bois',
  },

  // Salé & Petit-Déjeuner
  {
    id: 'formule-matin',
    category: 'food-breakfast',
    name: 'Formule Matin Parisien',
    description: 'Un café chaud classique au choix, une viennoiserie du matin et un jus d’orange pressé.',
    priceEur: '11,50 €',
    image: formuleMatinImg,
    imageAlt: 'Formule Matin Parisien avec cappuccino, croissant et jus d’orange pressé',
  },
  {
    id: 'avocado-toast',
    category: 'food-breakfast',
    name: 'Toast Avocat & Graines',
    description: 'Pain au levain toasté, avocat écrasé au citron vert, fleur de sel et graines torréfiées.',
    priceEur: '12,00 €',
    image: toastAvocatImg,
    imageAlt: 'Toast avocat au pain au levain, citron vert et graines torréfiées',
  },
  {
    id: 'croissant-sale',
    category: 'food-breakfast',
    name: 'Croissant Jambon & Comté',
    description: 'Croissant pur beurre garni de jambon blanc artisanal et Comté affiné.',
    priceEur: '8,50 €',
    image: croissantComteImg,
    imageAlt: 'Croissant salé garni de jambon artisanal et fromage Comté fondu',
  },
  {
    id: 'granola-bowl',
    category: 'food-breakfast',
    name: 'Granola Fermier & Fruits Frais',
    description: 'Yaourt grec onctueux, granola avoine-miel doré au four et fruits de saison.',
    priceEur: '9,50 €',
    image: granolaBowlImg,
    imageAlt: 'Bol de yaourt grec, granola maison et fruits rouges frais',
  },
];
