import { calculateTotal } from './order.js';
import type { Product } from './types.js';

const cart: Product[] = [
  { id: 1, title: 'Angular Book', price: 450 },
  { id: 2, title: 'TypeScript Guide', price: 300 }
];

console.log('Загальна сума замовлення:', calculateTotal(cart));