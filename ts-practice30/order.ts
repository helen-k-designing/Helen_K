import type { Product } from './types';

export function calculateTotal(products: Product[]): number {
  return products.reduce((sum, product) => sum + product.price, 0);
}