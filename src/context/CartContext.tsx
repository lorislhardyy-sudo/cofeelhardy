import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { CoffeeGrind, CoffeeWeight } from '../data/coffeeData';

export type FulfillmentMethod = 'pickup' | 'colissimo' | 'courier';
export type PaymentMethod = 'card' | 'counter' | 'cod';
export type PurchaseType = 'one-time' | 'subscription';

export interface CartItem {
  key: string;
  coffeeId: string;
  name: string;
  image: string;
  weight: CoffeeWeight;
  grind: CoffeeGrind;
  purchaseType: PurchaseType;
  unitPrice: number;
  regularUnitPrice: number;
  quantity: number;
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  pickupSlot: string;
  notes: string;
}

export interface ConfirmedOrder {
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  fulfillment: FulfillmentMethod;
  paymentMethod: PaymentMethod;
  hasSubscription: boolean;
  monthlyRecurringTotal: number;
  subtotal: number;
  shippingFee: number;
  total: number;
  customer: OrderCustomer;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  fulfillment: FulfillmentMethod;
  lastOrder: ConfirmedOrder | null;
  totalCount: number;
  hasSubscription: boolean;
  monthlyRecurringTotal: number;
  subtotal: number;
  shippingFee: number;
  total: number;
  freeShippingRemaining: number;
  openCart: () => void;
  closeCart: () => void;
  setFulfillment: (method: FulfillmentMethod) => void;
  addItem: (item: Omit<CartItem, 'key' | 'quantity'>) => void;
  updateQuantity: (key: string, delta: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  submitOrder: (
    customer: OrderCustomer,
    paymentMethod: PaymentMethod
  ) => ConfirmedOrder;
  clearLastOrder: () => void;
}

const STORAGE_KEY = 'coffee_lhardy_cart_v1';
export const FREE_SHIPPING_THRESHOLD = 45;
export const SUBSCRIPTION_DISCOUNT_LABEL = '-15 %';

export function getSubscriptionPrice(regularPrice: number): number {
  return Math.round(regularPrice * 0.85 * 10) / 10;
}

const CartContext = createContext<CartContextValue | null>(null);

export function formatEur(amount: number): string {
  return `${amount.toFixed(2).replace('.', ',')} €`;
}

export function computeShippingFee(
  method: FulfillmentMethod,
  subtotal: number,
  hasSubscription: boolean
): number {
  if (subtotal <= 0 || method === 'pickup') return 0;
  if (method === 'colissimo') {
    return hasSubscription || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 4.9;
  }
  return 7.5;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as CartItem[];
      if (!Array.isArray(parsed)) return [];
      return parsed.map((item) => ({
        ...item,
        purchaseType: item.purchaseType ?? 'one-time',
        regularUnitPrice: item.regularUnitPrice ?? item.unitPrice,
      }));
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);
  const [fulfillment, setFulfillment] = useState<FulfillmentMethod>('pickup');
  const [lastOrder, setLastOrder] = useState<ConfirmedOrder | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage quota errors
    }
  }, [items]);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const hasSubscription = items.some(
    (item) => item.purchaseType === 'subscription'
  );
  const monthlyRecurringTotal = items.reduce(
    (sum, item) =>
      item.purchaseType === 'subscription'
        ? sum + item.unitPrice * item.quantity
        : sum,
    0
  );
  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const shippingFee = computeShippingFee(
    fulfillment,
    subtotal,
    hasSubscription
  );
  const total = subtotal + shippingFee;
  const freeShippingRemaining = hasSubscription
    ? 0
    : Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addItem = (incoming: Omit<CartItem, 'key' | 'quantity'>) => {
    const key = `${incoming.coffeeId}-${incoming.weight}-${incoming.grind}-${incoming.purchaseType}`;
    setLastOrder(null);
    setItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...incoming, key, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const updateQuantity = (key: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (key: string) => {
    setItems((prev) => prev.filter((item) => item.key !== key));
  };

  const clearCart = () => setItems([]);

  const submitOrder = (
    customer: OrderCustomer,
    paymentMethod: PaymentMethod
  ): ConfirmedOrder => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const order: ConfirmedOrder = {
      orderNumber: `CL-${randomNum}`,
      createdAt: new Date().toLocaleString('fr-FR', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      items: [...items],
      fulfillment,
      paymentMethod,
      hasSubscription,
      monthlyRecurringTotal,
      subtotal,
      shippingFee,
      total,
      customer,
    };
    setLastOrder(order);
    setItems([]);
    return order;
  };

  const clearLastOrder = () => setLastOrder(null);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        fulfillment,
        lastOrder,
        totalCount,
        hasSubscription,
        monthlyRecurringTotal,
        subtotal,
        shippingFee,
        total,
        freeShippingRemaining,
        openCart,
        closeCart,
        setFulfillment,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        submitOrder,
        clearLastOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }
  return ctx;
}
