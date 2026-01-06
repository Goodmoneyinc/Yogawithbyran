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
    id: 'prod_SzkHvBaBUup1gY',
    priceId: 'price_1S3knNGHz3Ny4kcE5uwJHFPZ',
    name: 'YOGI ADV',
    description: 'Advanced yoga training program with personalized guidance and premium features',
    price: 190.00,
    currency: 'usd',
    mode: 'subscription'
  },
  {
    id: 'prod_SzkGJAZSMNc3Qi',
    priceId: 'price_1S3kmNGHz3Ny4kcE6vSpbRm4',
    name: 'YOGI PRE',
    description: 'Premium yoga experience with exclusive content and advanced techniques',
    price: 99.00,
    currency: 'usd',
    mode: 'subscription'
  },
  {
    id: 'prod_SzkGjzAt3Em7Zh',
    priceId: 'price_1S3kljGHz3Ny4kcEU2xoQ9lu',
    name: 'YOGI basic',
    description: 'Essential yoga fundamentals for beginners and casual practitioners',
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