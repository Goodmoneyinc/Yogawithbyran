export interface Product {
  id: string;
  priceId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  mode: 'payment' | 'subscription';
}

export const products: Product[] = [
  {
    id: 'prod_T3sUwOsOgCrAa1',
    priceId: 'price_1S7kjI9wDfAiVIZSGdd7hPVG',
    name: 'YOGI avd',
    description: 'Advanced yoga subscription with premium features',
    price: 190.00,
    currency: 'usd',
    mode: 'subscription'
  },
  {
    id: 'prod_T3sTUFbZg5RkQW',
    priceId: 'price_1S7kim9wDfAiVIZSQYhypnfc',
    name: 'Yogi Pre',
    description: 'Premium yoga subscription for dedicated practitioners',
    price: 99.00,
    currency: 'usd',
    mode: 'subscription'
  },
  {
    id: 'prod_T3sSXtlhA74UG3',
    priceId: 'price_1S7khi9wDfAiVIZSc1j1C58H',
    name: 'Basic Yogi',
    description: 'Essential yoga subscription for beginners',
    price: 20.00,
    currency: 'usd',
    mode: 'subscription'
  }
];

export function getProductByPriceId(priceId: string): Product | undefined {
  return products.find(product => product.priceId === priceId);
}