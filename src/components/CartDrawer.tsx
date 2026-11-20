import { FormEvent, useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Lock,
  Mail,
  MapPin,
  Minus,
  Plus,
  ShoppingBag,
  Store,
  Trash2,
  Truck,
  X,
} from 'lucide-react';
import {
  formatEur,
  FREE_SHIPPING_THRESHOLD,
  FulfillmentMethod,
  OrderCustomer,
  PaymentMethod,
  useCart,
} from '../context/CartContext';
import { BRAND_CONTACT } from '../data/coffeeData';
import { ImageWithFallback } from './ImageWithFallback';

type DrawerStep = 'cart' | 'checkout' | 'confirmation';

const PICKUP_SLOTS = [
  'Sous 30 minutes (au comptoir)',
  'Aujourd’hui · 12h – 14h',
  'Aujourd’hui · 17h – 20h',
  'Demain matin · 8h – 11h',
];

const INITIAL_CUSTOMER: OrderCustomer = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  postalCode: '',
  city: 'Paris',
  pickupSlot: PICKUP_SLOTS[0],
  notes: '',
};

export function CartDrawer() {
  const {
    items,
    isOpen,
    fulfillment,
    lastOrder,
    totalCount,
    subtotal,
    shippingFee,
    total,
    freeShippingRemaining,
    closeCart,
    setFulfillment,
    updateQuantity,
    removeItem,
    submitOrder,
    clearLastOrder,
  } = useCart();

  const [step, setStep] = useState<DrawerStep>('cart');
  const [customer, setCustomer] = useState<OrderCustomer>(INITIAL_CUSTOMER);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync step with cart/lastOrder changes when drawer opens
  useEffect(() => {
    if (!isOpen) return;
    if (lastOrder && items.length === 0) {
      setStep('confirmation');
    } else if (step === 'confirmation' && items.length > 0) {
      setStep('cart');
    }
  }, [isOpen, lastOrder, items.length, step]);

  // Keep payment method valid when switching between pickup and delivery
  useEffect(() => {
    if (fulfillment === 'pickup' && paymentMethod === 'cod') {
      setPaymentMethod('counter');
    } else if (fulfillment !== 'pickup' && paymentMethod === 'counter') {
      setPaymentMethod('card');
    }
  }, [fulfillment, paymentMethod]);

  // Escape key closes drawer
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const formatCardInput = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiryInput = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    return digits;
  };

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!customer.fullName.trim()) {
      setErrorMessage('Veuillez indiquer votre nom complet.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim())) {
      setErrorMessage('Veuillez saisir une adresse e-mail valide.');
      return;
    }
    if (customer.phone.replace(/\D/g, '').length < 8) {
      setErrorMessage('Veuillez indiquer un numéro de téléphone valide.');
      return;
    }
    if (fulfillment !== 'pickup') {
      if (
        !customer.address.trim() ||
        !customer.postalCode.trim() ||
        !customer.city.trim()
      ) {
        setErrorMessage(
          'Veuillez renseigner votre adresse complète de livraison.'
        );
        return;
      }
    }
    if (paymentMethod === 'card') {
      if (cardNumber.replace(/\D/g, '').length < 16) {
        setErrorMessage('Veuillez saisir un numéro de carte à 16 chiffres.');
        return;
      }
      if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
        setErrorMessage('Veuillez saisir une date d’expiration (MM/AA).');
        return;
      }
      if (cardCvc.replace(/\D/g, '').length < 3) {
        setErrorMessage('Veuillez saisir le code de sécurité (3 chiffres).');
        return;
      }
    }

    submitOrder(customer, paymentMethod);
    setStep('confirmation');
    setCardNumber('');
    setCardExpiry('');
    setCardCvc('');
  };

  const handleClose = () => {
    if (step === 'confirmation') {
      clearLastOrder();
      setStep('cart');
    }
    closeCart();
  };

  const fulfillmentLabel = (method: FulfillmentMethod) => {
    switch (method) {
      case 'pickup':
        return 'Retrait au comptoir (18 rue Royale)';
      case 'colissimo':
        return 'Livraison Colissimo (48h)';
      case 'courier':
        return 'Coursier Paris (sous 2h)';
    }
  };

  const paymentLabel = (method: PaymentMethod) => {
    switch (method) {
      case 'card':
        return 'Carte bancaire';
      case 'counter':
        return 'Paiement au comptoir (18 rue Royale)';
      case 'cod':
        return 'Paiement à la livraison';
    }
  };

  const buildOrderEmailHref = () => {
    if (!lastOrder) return `mailto:${BRAND_CONTACT.email}`;
    const subject = encodeURIComponent(
      `Commande ${lastOrder.orderNumber} — COFFEE LHARDY`
    );
    const itemsText = lastOrder.items
      .map(
        (item) =>
          `- ${item.quantity} × ${item.name} (${item.weight === '1kg' ? '1 kg' : item.weight.replace('g', ' g')}, ${item.grind}) : ${formatEur(item.unitPrice * item.quantity)}`
      )
      .join('\n');
    const addressBlock =
      lastOrder.fulfillment === 'pickup'
        ? `Créneau de retrait : ${lastOrder.customer.pickupSlot}`
        : `Adresse de livraison : ${lastOrder.customer.address}, ${lastOrder.customer.postalCode} ${lastOrder.customer.city}`;
    const body = encodeURIComponent(
      `Commande ${lastOrder.orderNumber} (${lastOrder.createdAt})\nClient : ${lastOrder.customer.fullName}\nTél : ${lastOrder.customer.phone}\nE-mail : ${lastOrder.customer.email}\n\nArticles :\n${itemsText}\n\nMode : ${fulfillmentLabel(lastOrder.fulfillment)}\n${addressBlock}\nRèglement : ${paymentLabel(lastOrder.paymentMethod)}\nTotal : ${formatEur(lastOrder.total)}${lastOrder.customer.notes ? `\nNote : ${lastOrder.customer.notes}` : ''}`
    );
    return `mailto:${BRAND_CONTACT.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Panier et commande COFFEE LHARDY"
    >
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-[#1B100B]/60 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-over Panel */}
      <div className="relative z-10 w-full max-w-lg bg-[#FAF4EC] text-[#231915] h-full flex flex-col border-l border-[#DFD1BF] shadow-2xl">
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-[#E5DDD3] bg-[#F5ECE0] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            {step === 'checkout' && (
              <button
                type="button"
                onClick={() => {
                  setErrorMessage(null);
                  setStep('cart');
                }}
                aria-label="Retour au panier"
                className="p-2 -ml-2 rounded-lg text-[#5E3A22] hover:bg-[#EAE0D2] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
            <div className="min-w-0">
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#231915] truncate">
                {step === 'cart' && `Votre Panier (${totalCount})`}
                {step === 'checkout' && 'Finaliser la commande'}
                {step === 'confirmation' && 'Commande confirmée'}
              </h2>
              <p className="text-xs text-[#6E6259]">
                COFFEE LHARDY · 18 rue Royale, Paris
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Fermer le panier"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-[#5A4D44] hover:text-[#231915] hover:bg-[#EAE0D2] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-6 py-2.5 border-b border-[#EAE0D2] bg-[#FAF4EC] flex items-center gap-2 text-xs font-medium shrink-0">
          <span
            className={
              step === 'cart' ? 'text-[#5E3A22] font-semibold' : 'text-[#8C7F74]'
            }
          >
            1. Panier
          </span>
          <span aria-hidden="true" className="text-[#C7B7A3]">
            /
          </span>
          <span
            className={
              step === 'checkout'
                ? 'text-[#5E3A22] font-semibold'
                : 'text-[#8C7F74]'
            }
          >
            2. Livraison &amp; Paiement
          </span>
          <span aria-hidden="true" className="text-[#C7B7A3]">
            /
          </span>
          <span
            className={
              step === 'confirmation'
                ? 'text-[#3D5A45] font-semibold'
                : 'text-[#8C7F74]'
            }
          >
            3. Confirmation
          </span>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {/* STEP 1: CART */}
          {step === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#EFE3D2] text-[#5E3A22] flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-2xl font-semibold text-[#231915]">
                      Votre panier est vide
                    </h3>
                    <p className="text-sm text-[#5A4D44] max-w-[32ch] mx-auto">
                      Choisissez votre sachet Assemblage Maison ou Réserve
                      Royale pour commencer.
                    </p>
                  </div>
                  <a
                    href="#cafes-maison"
                    onClick={handleClose}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-[#FAF4EC] bg-[#5E3A22] hover:bg-[#3B2314] rounded-lg transition-colors"
                  >
                    <span>Voir nos cafés</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Free Shipping Progress */}
                  <div className="p-3.5 rounded-xl bg-[#F2EAE0] border border-[#E2D4C3] text-xs text-[#5A4D44]">
                    {freeShippingRemaining > 0 ? (
                      <span>
                        Plus que{' '}
                        <strong className="text-[#5E3A22] tabular-nums">
                          {formatEur(freeShippingRemaining)}
                        </strong>{' '}
                        pour bénéficier de la livraison Colissimo offerte dès{' '}
                        {formatEur(FREE_SHIPPING_THRESHOLD)}.
                      </span>
                    ) : (
                      <span className="font-medium text-[#3D5A45]">
                        Livraison Colissimo offerte débloquée (commande ≥{' '}
                        {formatEur(FREE_SHIPPING_THRESHOLD)}).
                      </span>
                    )}
                  </div>

                  {/* Items List */}
                  <ul className="divide-y divide-[#E6DDD1]">
                    {items.map((item) => (
                      <li key={item.key} className="py-4 flex gap-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden border border-[#DFD1BF] bg-[#EFE9E0] shrink-0">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-serif text-lg font-semibold text-[#231915] leading-snug">
                                {item.name}
                              </h3>
                              <p className="text-xs text-[#5A4D44] mt-0.5">
                                {item.weight === '1kg'
                                  ? '1 kg'
                                  : item.weight.replace('g', ' g')}{' '}
                                · {item.grind}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.key)}
                              aria-label={`Supprimer ${item.name}`}
                              className="p-1.5 text-[#8C7F74] hover:text-[#3B2314] transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" aria-hidden="true" />
                            </button>
                          </div>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="inline-flex items-center rounded-lg border border-[#D4C0A8] bg-[#F2EAE0]">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.key, -1)}
                                aria-label="Diminuer la quantité"
                                className="p-1.5 text-[#3B2314] hover:bg-[#E6D9C7] rounded-l-lg transition-colors cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                              </button>
                              <span className="px-3 text-sm font-medium tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.key, 1)}
                                aria-label="Augmenter la quantité"
                                className="p-1.5 text-[#3B2314] hover:bg-[#E6D9C7] rounded-r-lg transition-colors cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                              </button>
                            </div>

                            <span className="text-base font-semibold text-[#5E3A22] tabular-nums">
                              {formatEur(item.unitPrice * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Fulfillment Selection */}
                  <div className="pt-2 space-y-2.5">
                    <p className="text-xs font-semibold text-[#3B2314] uppercase tracking-wide">
                      Mode de réception
                    </p>

                    <div className="space-y-2">
                      {(
                        [
                          {
                            id: 'pickup',
                            icon: Store,
                            title: 'Retrait au salon · 18 rue Royale',
                            desc: 'Moulu à la demande, prêt sous 30 min',
                            price: 'Gratuit',
                          },
                          {
                            id: 'colissimo',
                            icon: Truck,
                            title: 'Livraison Colissimo · France',
                            desc: 'Expédition sous 24h – 48h',
                            price:
                              subtotal >= FREE_SHIPPING_THRESHOLD
                                ? 'Offerte'
                                : '4,90 €',
                          },
                          {
                            id: 'courier',
                            icon: MapPin,
                            title: 'Coursier Paris · Express 2h',
                            desc: 'Livraison directe dans Paris intra-muros',
                            price: '7,50 €',
                          },
                        ] as const
                      ).map((opt) => {
                        const Icon = opt.icon;
                        const selected = fulfillment === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setFulfillment(opt.id)}
                            className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                              selected
                                ? 'bg-[#EFE3D2] border-[#5E3A22]'
                                : 'bg-[#FAF8F5] border-[#DFD1BF] hover:border-[#B89D7F]'
                            }`}
                          >
                            <div className="flex items-start gap-3 min-w-0">
                              <Icon
                                className={`w-4 h-4 mt-0.5 shrink-0 ${
                                  selected
                                    ? 'text-[#5E3A22]'
                                    : 'text-[#6E6259]'
                                }`}
                                aria-hidden="true"
                              />
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-[#231915]">
                                  {opt.title}
                                </p>
                                <p className="text-xs text-[#6E6259]">
                                  {opt.desc}
                                </p>
                              </div>
                            </div>
                            <span className="text-sm font-semibold text-[#5E3A22] tabular-nums whitespace-nowrap shrink-0">
                              {opt.price}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* STEP 2: CHECKOUT FORM */}
          {step === 'checkout' && (
            <form
              id="checkout-form"
              onSubmit={handleCheckoutSubmit}
              className="space-y-5"
            >
              {errorMessage && (
                <div
                  role="alert"
                  className="p-3.5 rounded-xl bg-[#FDF2F2] border border-[#D98282] text-sm text-[#7A1C1C]"
                >
                  {errorMessage}
                </div>
              )}

              {/* Coordonnées */}
              <div className="space-y-3">
                <h3 className="font-serif text-xl font-semibold text-[#231915]">
                  Vos coordonnées
                </h3>

                <div>
                  <label
                    htmlFor="checkout-name"
                    className="block text-xs font-medium text-[#5A4D44] mb-1"
                  >
                    Nom complet *
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    required
                    value={customer.fullName}
                    onChange={(e) =>
                      setCustomer((c) => ({ ...c, fullName: e.target.value }))
                    }
                    placeholder="Camille Laurent"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#D4C0A8] bg-white text-[#231915] focus:outline-2 focus:outline-[#5E3A22]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="checkout-email"
                      className="block text-xs font-medium text-[#5A4D44] mb-1"
                    >
                      E-mail *
                    </label>
                    <input
                      id="checkout-email"
                      type="email"
                      required
                      value={customer.email}
                      onChange={(e) =>
                        setCustomer((c) => ({ ...c, email: e.target.value }))
                      }
                      placeholder="vous@exemple.fr"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#D4C0A8] bg-white text-[#231915] focus:outline-2 focus:outline-[#5E3A22]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="checkout-phone"
                      className="block text-xs font-medium text-[#5A4D44] mb-1"
                    >
                      Téléphone *
                    </label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      required
                      value={customer.phone}
                      onChange={(e) =>
                        setCustomer((c) => ({ ...c, phone: e.target.value }))
                      }
                      placeholder="06 12 34 56 78"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#D4C0A8] bg-white text-[#231915] focus:outline-2 focus:outline-[#5E3A22]"
                    />
                  </div>
                </div>
              </div>

              {/* Pickup Slot or Delivery Address */}
              {fulfillment === 'pickup' ? (
                <div className="space-y-2">
                  <label
                    htmlFor="checkout-slot"
                    className="block text-xs font-medium text-[#5A4D44]"
                  >
                    Créneau de retrait au 18 rue Royale
                  </label>
                  <select
                    id="checkout-slot"
                    value={customer.pickupSlot}
                    onChange={(e) =>
                      setCustomer((c) => ({ ...c, pickupSlot: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#D4C0A8] bg-white text-[#231915] focus:outline-2 focus:outline-[#5E3A22]"
                  >
                    {PICKUP_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="space-y-3">
                  <h3 className="font-serif text-xl font-semibold text-[#231915]">
                    Adresse de livraison
                  </h3>
                  <div>
                    <label
                      htmlFor="checkout-address"
                      className="block text-xs font-medium text-[#5A4D44] mb-1"
                    >
                      Rue et numéro *
                    </label>
                    <input
                      id="checkout-address"
                      type="text"
                      required
                      value={customer.address}
                      onChange={(e) =>
                        setCustomer((c) => ({ ...c, address: e.target.value }))
                      }
                      placeholder="24 rue du Faubourg Saint-Honoré"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#D4C0A8] bg-white text-[#231915] focus:outline-2 focus:outline-[#5E3A22]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="checkout-zip"
                        className="block text-xs font-medium text-[#5A4D44] mb-1"
                      >
                        Code postal *
                      </label>
                      <input
                        id="checkout-zip"
                        type="text"
                        required
                        value={customer.postalCode}
                        onChange={(e) =>
                          setCustomer((c) => ({
                            ...c,
                            postalCode: e.target.value,
                          }))
                        }
                        placeholder="75008"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#D4C0A8] bg-white text-[#231915] focus:outline-2 focus:outline-[#5E3A22]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="checkout-city"
                        className="block text-xs font-medium text-[#5A4D44] mb-1"
                      >
                        Ville *
                      </label>
                      <input
                        id="checkout-city"
                        type="text"
                        required
                        value={customer.city}
                        onChange={(e) =>
                          setCustomer((c) => ({ ...c, city: e.target.value }))
                        }
                        placeholder="Paris"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#D4C0A8] bg-white text-[#231915] focus:outline-2 focus:outline-[#5E3A22]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <div className="space-y-3 pt-1">
                <h3 className="font-serif text-xl font-semibold text-[#231915]">
                  Mode de règlement
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'bg-[#EFE3D2] border-[#5E3A22]'
                        : 'bg-white border-[#DFD1BF] hover:border-[#B89D7F]'
                    }`}
                  >
                    <CreditCard
                      className="w-4 h-4 text-[#5E3A22] shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-[#231915]">
                      Carte bancaire
                    </span>
                  </button>

                  {fulfillment === 'pickup' ? (
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('counter')}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                        paymentMethod === 'counter'
                          ? 'bg-[#EFE3D2] border-[#5E3A22]'
                          : 'bg-white border-[#DFD1BF] hover:border-[#B89D7F]'
                      }`}
                    >
                      <Store
                        className="w-4 h-4 text-[#3D5A45] shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium text-[#231915]">
                        Payer au comptoir
                      </span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                        paymentMethod === 'cod'
                          ? 'bg-[#EFE3D2] border-[#5E3A22]'
                          : 'bg-white border-[#DFD1BF] hover:border-[#B89D7F]'
                      }`}
                    >
                      <Truck
                        className="w-4 h-4 text-[#3D5A45] shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium text-[#231915]">
                        À la livraison
                      </span>
                    </button>
                  )}
                </div>

                {paymentMethod === 'card' && (
                  <div className="p-4 rounded-xl bg-white border border-[#DFD1BF] space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#6E6259]">
                      <span>Visa · Mastercard · CB</span>
                      <span className="inline-flex items-center gap-1 text-[#3D5A45] font-medium">
                        <Lock className="w-3 h-3" aria-hidden="true" />
                        Transaction sécurisée
                      </span>
                    </div>

                    <div>
                      <label
                        htmlFor="card-number"
                        className="block text-xs font-medium text-[#5A4D44] mb-1"
                      >
                        Numéro de carte *
                      </label>
                      <input
                        id="card-number"
                        type="text"
                        inputMode="numeric"
                        value={cardNumber}
                        onChange={(e) =>
                          setCardNumber(formatCardInput(e.target.value))
                        }
                        placeholder="4970 1234 5678 9012"
                        className="w-full px-3.5 py-2 text-sm rounded-lg border border-[#D4C0A8] bg-[#FAF8F5] tabular-nums focus:outline-2 focus:outline-[#5E3A22]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="card-expiry"
                          className="block text-xs font-medium text-[#5A4D44] mb-1"
                        >
                          Expiration *
                        </label>
                        <input
                          id="card-expiry"
                          type="text"
                          inputMode="numeric"
                          value={cardExpiry}
                          onChange={(e) =>
                            setCardExpiry(formatExpiryInput(e.target.value))
                          }
                          placeholder="09/28"
                          className="w-full px-3.5 py-2 text-sm rounded-lg border border-[#D4C0A8] bg-[#FAF8F5] tabular-nums focus:outline-2 focus:outline-[#5E3A22]"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="card-cvc"
                          className="block text-xs font-medium text-[#5A4D44] mb-1"
                        >
                          CVC *
                        </label>
                        <input
                          id="card-cvc"
                          type="text"
                          inputMode="numeric"
                          maxLength={4}
                          value={cardCvc}
                          onChange={(e) =>
                            setCardCvc(e.target.value.replace(/\D/g, ''))
                          }
                          placeholder="123"
                          className="w-full px-3.5 py-2 text-sm rounded-lg border border-[#D4C0A8] bg-[#FAF8F5] tabular-nums focus:outline-2 focus:outline-[#5E3A22]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="checkout-notes"
                    className="block text-xs font-medium text-[#5A4D44] mb-1"
                  >
                    Note pour Jérémy (optionnel)
                  </label>
                  <input
                    id="checkout-notes"
                    type="text"
                    value={customer.notes}
                    onChange={(e) =>
                      setCustomer((c) => ({ ...c, notes: e.target.value }))
                    }
                    placeholder="Ex. : mouture fine pour Chemex ou cafetière italienne"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-[#D4C0A8] bg-white text-[#231915] focus:outline-2 focus:outline-[#5E3A22]"
                  />
                </div>
              </div>
            </form>
          )}

          {/* STEP 3: ORDER CONFIRMATION */}
          {step === 'confirmation' && lastOrder && (
            <div className="space-y-6 py-2">
              <div className="p-5 rounded-2xl bg-[#EEF5EF] border border-[#BFD5C3] flex items-start gap-3.5">
                <CheckCircle2
                  className="w-6 h-6 text-[#3D5A45] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-semibold text-[#3D5A45] tracking-wide">
                    Commande {lastOrder.orderNumber} confirmée
                  </p>
                  <h3 className="font-serif text-2xl font-semibold text-[#231915] mt-0.5">
                    Merci {lastOrder.customer.fullName.split(' ')[0]} !
                  </h3>
                  <p className="text-sm text-[#4A5A4D] mt-1">
                    {lastOrder.fulfillment === 'pickup'
                      ? `Votre commande est en cours de préparation au comptoir (18 rue Royale) · ${lastOrder.customer.pickupSlot}.`
                      : `Votre commande est enregistrée pour livraison au ${lastOrder.customer.address}, ${lastOrder.customer.postalCode} ${lastOrder.customer.city}.`}
                  </p>
                </div>
              </div>

              {/* Order Receipt Summary */}
              <div className="p-5 rounded-xl bg-white border border-[#DFD1BF] space-y-4">
                <div className="flex items-center justify-between text-xs text-[#6E6259] pb-3 border-b border-[#EFE7DC]">
                  <span>Référence : {lastOrder.orderNumber}</span>
                  <span>{lastOrder.createdAt}</span>
                </div>

                <ul className="space-y-2.5 text-sm">
                  {lastOrder.items.map((item) => (
                    <li
                      key={item.key}
                      className="flex items-baseline justify-between gap-3"
                    >
                      <span className="text-[#231915]">
                        <strong className="tabular-nums">
                          {item.quantity}×
                        </strong>{' '}
                        {item.name}{' '}
                        <span className="text-xs text-[#6E6259]">
                          (
                          {item.weight === '1kg'
                            ? '1 kg'
                            : item.weight.replace('g', ' g')}
                          , {item.grind})
                        </span>
                      </span>
                      <span className="font-medium text-[#5E3A22] tabular-nums shrink-0">
                        {formatEur(item.unitPrice * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="pt-3 border-t border-[#EFE7DC] space-y-1.5 text-xs text-[#5A4D44]">
                  <div className="flex justify-between">
                    <span>Mode</span>
                    <span className="font-medium text-[#231915]">
                      {fulfillmentLabel(lastOrder.fulfillment)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Règlement</span>
                    <span className="font-medium text-[#231915]">
                      {paymentLabel(lastOrder.paymentMethod)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-semibold text-[#231915] pt-2 border-t border-[#EFE7DC]">
                    <span>Total</span>
                    <span className="tabular-nums text-[#5E3A22]">
                      {formatEur(lastOrder.total)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                <a
                  href={buildOrderEmailHref()}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-[#FAF4EC] bg-[#3D5A45] hover:bg-[#2C4433] rounded-lg transition-colors"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  <span>Transmettre la commande par e-mail</span>
                </a>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full px-5 py-3 text-sm font-medium text-[#3B2314] bg-[#EFE3D2] hover:bg-[#E5D4BD] rounded-lg transition-colors cursor-pointer"
                >
                  Continuer la visite
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer Totals & Action CTA */}
        {step !== 'confirmation' && items.length > 0 && (
          <div className="px-6 py-4 border-t border-[#E5DDD3] bg-[#F5ECE0] space-y-3 shrink-0">
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-[#5A4D44]">
                <span>Sous-total</span>
                <span className="tabular-nums">{formatEur(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#5A4D44]">
                <span>{fulfillmentLabel(fulfillment)}</span>
                <span className="tabular-nums font-medium text-[#3D5A45]">
                  {shippingFee === 0 ? 'Gratuit' : formatEur(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold text-[#231915] pt-2 border-t border-[#E0D2C0]">
                <span>Total</span>
                <span className="text-lg font-serif tabular-nums text-[#5E3A22]">
                  {formatEur(total)}
                </span>
              </div>
            </div>

            {step === 'cart' ? (
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-medium text-[#FAF4EC] bg-[#5E3A22] hover:bg-[#3B2314] rounded-lg transition-colors cursor-pointer"
              >
                <span>Passer la commande</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="submit"
                form="checkout-form"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-medium text-[#FAF4EC] bg-[#3D5A45] hover:bg-[#2C4433] rounded-lg transition-colors cursor-pointer"
              >
                <span>
                  {paymentMethod === 'card'
                    ? `Confirmer et payer · ${formatEur(total)}`
                    : `Confirmer la commande · ${formatEur(total)}`}
                </span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
