export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  mode: 'subscription' | 'payment';
}

export const stripeProducts: StripeProduct[] = [
  {
    id: 'prod_T3sUwOsOgCrAa1',
    priceId: 'price_1S7kjI9wDfAiVIZSGdd7hPVG',
    name: 'YOGI avd',
    description: 'Advanced yoga practice with premium features and personalized guidance',
    price: 190.00,
    currency: 'usd',
    mode: 'subscription'
  },
  {
    id: 'prod_T3sTUFbZg5RkQW',
    priceId: 'price_1S7kim9wDfAiVIZSQYhypnfc',
    name: 'Yogi Pre',
    description: 'Intermediate yoga program with enhanced features and community access',
    price: 99.00,
    currency: 'usd',
    mode: 'subscription'
  },
  {
    id: 'prod_T3sSXtlhA74UG3',
    priceId: 'price_1S7khi9wDfAiVIZSc1j1C58H',
    name: 'Basic Yogi',
    description: 'Essential yoga practice with fundamental poses and breathing exercises',
    price: 20.00,
    currency: 'usd',
    mode: 'subscription'
  }
];

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.priceId === priceId);
};

export const formatPrice = (price: number, currency: string = 'usd'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(price);
};