export interface Product {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price: string;
}

export const products: Product[] = [
  {
    id: 'prod_T3sSXtlhA74UG3',
    priceId: 'price_1S7khi9wDfAiVIZSc1j1C58H',
    name: 'Basic Yoga',
    description: 'Essential yoga practice with foundational poses and breathing techniques. Perfect for beginners starting their yoga journey.',
    mode: 'subscription',
    price: '$20'
  },
  {
    id: 'prod_T3sTUFbZg5RkQW',
    priceId: 'price_1S7kim9wDfAiVIZSQYhypnfc',
    name: 'Basic Yoga',
    description: 'Essential yoga practice with foundational poses and breathing techniques. Perfect for beginners starting their yoga journey.',
    mode: 'subscription',
    price: '$99'
  },
  {
    id: 'prod_T3sUwOsOgCrAa1',
    priceId: 'price_1S7kjI9wDfAiVIZSGdd7hPVG',
    name: 'Basic Yoga',
    description: 'Essential yoga practice with foundational poses and breathing techniques. Perfect for beginners starting their yoga journey.',
    mode: 'subscription',
    price: '$190'
  }
];

export const getProductByPriceId = (priceId: string): Product | undefined => {
  return products.find(product => product.priceId === priceId);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};