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
    id: 'prod_SzkGjzAt3Em7Zh',
    priceId: 'price_1S3kljGHz3Ny4kcEU2xoQ9lu',
    name: 'YOGI basic',
    description: 'Essential yoga practice with foundational poses and breathing techniques. Perfect for beginners starting their yoga journey.',
    mode: 'subscription',
    price: '$20.00'
  },
  {
    id: 'prod_SzkGJAZSMNc3Qi',
    priceId: 'price_1S3kmNGHz3Ny4kcE6vSpbRm4',
    name: 'YOGI PRE',
    description: 'Intermediate yoga program with flowing sequences and deeper poses. Build strength and flexibility with guided practice for 6 months.',
    mode: 'subscription',
    price: '$99.00'
  },
  {
    id: 'prod_SzkHvBaBUup1gY',
    priceId: 'price_1S3knNGHz3Ny4kcE5uwJHFPZ',
    name: 'YOGI ADV',
    description: 'Advanced yoga techniques including challenging poses, inversions, and advanced breathing methods. Master your practice.',
    mode: 'subscription',
    price: '$190.00'
  }
];

export const getProductByPriceId = (priceId: string): Product | undefined => {
  return products.find(product => product.priceId === priceId);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};