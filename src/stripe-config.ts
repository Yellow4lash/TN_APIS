export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'subscription' | 'payment';
}

export const stripeProducts: StripeProduct[] = [
  {
    id: 'prod_SUPQPlkCJNpdsx',
    priceId: 'price_1RZQbHFxGQKjBg4cpa61sprd',
    name: 'Monthly Plan',
    description: 'All 44 educational games, Detailed progress reports, Offline game access, Priority customer support',
    mode: 'subscription'
  }
];

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.priceId === priceId);
};

export const getProductById = (id: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.id === id);
};