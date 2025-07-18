export interface PaymentProduct {
  id: string;
  planId: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
}

export const paymentProducts: PaymentProduct[] = [
  {
    id: 'monthly_plan',
    planId: 'gOw8NQR7',
    name: 'Monthly Plan',
    amount: 4.99,
    currency: 'USD',
    description: 'All 44 educational games, Detailed progress reports, Offline game access, Priority customer support',
  }
];

export const getProductByPlanId = (planId: string): PaymentProduct | undefined => {
  return paymentProducts.find(product => product.planId === planId);
};

export const getProductById = (id: string): PaymentProduct | undefined => {
  return paymentProducts.find(product => product.id === id);
};