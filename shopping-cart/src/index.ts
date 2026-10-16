const hello = "Hello, World!";
console.log(hello);

// --- Функції з домашнього завдання TypeScript ---

// 1. Функція для з'єднання двох рядків (наприклад, бренд + назва товару)
const concatTwoStrings = (a: string, b: string): string => {
  return [a, b].join(" ");
};

// 2. Функція для додавання чисел (наприклад, розрахунок загальної вартості)
const add = (a: number, b: number): number => {
  return a + b;
};

// --- Інтерфейс для товару ---
interface Product {
  id: number;
  title: string;
  brand?: string;
  price: number;
  category: string;
}

// Початковий стан магазину
let products: Product[] = []; 
let currentPage: number = 1;
const itemsPerPage: number = 3;

// --- Робота з елементами інтерфейсу (DOM) ---

const searchInput = document.getElementById("searchInput") as HTMLInputElement;
searchInput.addEventListener("input", (event) => {
  const input = event.target as HTMLInputElement;
  console.log(`User typed: ${input.value}`);
  // Тут в майбутньому буде фільтрація за назвою
});

const sortSelect = document.getElementById("sortSelect") as HTMLSelectElement;
sortSelect.addEventListener("change", (event) => {
  const select = event.target as HTMLSelectElement;
  console.log(`User selected: ${select.value}`);
});

const priceMax = document.getElementById("priceMax") as HTMLInputElement;
priceMax.addEventListener("input", (event) => {
  const input = event.target as HTMLInputElement;
  console.log(`User set max price: ${input.value}`);
});

const priceMin = document.getElementById("priceMin") as HTMLInputElement;
priceMin.addEventListener("input", (event) => {
  const input = event.target as HTMLInputElement;
  console.log(`User set min price: ${input.value}`);
});

const checkboxes = document.querySelectorAll('.category-checkbox') as NodeListOf<HTMLInputElement>;
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", (event) => {
    const input = event.target as HTMLInputElement;
    console.log(`User ${input.checked ? "checked" : "unchecked"}: ${input.value}`);
  });
});

const clearFiltersBtn = document.getElementById("clearFiltersBtn") as HTMLButtonElement;
clearFiltersBtn.addEventListener("click", () => {
  searchInput.value = "";
  sortSelect.selectedIndex = 0;
  priceMax.value = "";
  priceMin.value = "";
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
  console.log("Filters cleared");
});

const container = document.getElementById('productsContainer') as HTMLDivElement | null;
const paginationContainer = document.getElementById('paginationContainer') as HTMLDivElement | null;
const totalProductsCountHTML = document.getElementById('totalProductsCount') as HTMLSpanElement | null;

// --- Демонстрація роботи домашнього завдання на сторінці ---

document.addEventListener("DOMContentLoaded", () => {
  // Використовуємо функцію concatTwoStrings для формування назви товару
  const formattedTitle: string = concatTwoStrings("Super", "Gadget Pro");
  
  // Використовуємо функцію add для розрахунку ціни зі знижкою чи доставкою
  const basePrice: number = 1000;
  const deliveryCost: number = 150;
  const finalPrice: number = add(basePrice, deliveryCost);

  if (totalProductsCountHTML) {
    totalProductsCountHTML.textContent = "1";
  }

  if (container) {
    container.innerHTML = `
      <div class="product-card" style="border: 1px solid #ddd; padding: 15px; border-radius: 8px; background: #fff;">
        <h3>${formattedTitle}</h3>
        <p>Ціна з доставкою: <strong>${finalPrice} грн</strong></p>
        <button id="demoBuyBtn" style="padding: 5px 10px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Купити</button>
      </div>
    `;

    const demoBuyBtn = document.getElementById("demoBuyBtn");
    demoBuyBtn?.addEventListener("click", () => {
      alert(`Ви замовили "${formattedTitle}" на суму ${finalPrice} грн!`);
    });
  }
});
// 1. Інтерфейс для товару
interface Product {
  id: string;
  name: string;
  price: number;
}
// 2. Інтерфейс для елемента у кошику (товар + кількість)
interface CartItem {
  product: Product;
  quantity: number;
}

// 3. Клас для кошика

class ShoppingCart {
  // private items: CartItem[] = [];
  // Використовуємо Map для швидкого пошуку та оновлення за id товару
  private items: Map<string, CartItem> = new Map();

  // Додати товар у кошик
  addItem(product: Product, quantity: number  = 1): void {
      if (quantity <= 0) {
          throw new Error("Quantity must be greater than zero.");
      }
    if (this.items.has(product.id)) {
      // Якщо товар вже є у кошику, оновлюємо кількість
      const existingItem = this.items.get(product.id)!;
      existingItem.quantity += quantity;
    } else {
      // Якщо товару немає у кошику, додаємо новий елемент
      this.items.set(product.id, { product, quantity });
    }
  }

  // Видалити товар з кошика
  // removeItem(productId: string): void {
  //   if (this.items.has(productId)) {
  //     this.items.delete(productId);
  //   } else {
  //     throw new Error("Product not found in the cart.");
  //   }
  // }
  // removeItem(productId: string):boolean {
  //   if (this.items.has(productId)) {
  //     this.items.delete(productId);
  //     return true; // Повертаємо true, якщо товар успішно видалено
  //   } else {
  //     return false; // Повертаємо false, якщо товар не знайдено
  //   }
  // }
  removeItem(productId: string):boolean {
    return this.items.delete(productId);  
  }

  // updateItemQuantity(productId: string, quantity: number): void {
  //   if (quantity <= 0) {
  //     throw new Error("Quantity must be greater than zero.");
  //   }
  //   if (this.items.has(productId)) {
  //     const item = this.items.get(productId)!;
  //     item.quantity = quantity;
  //   } else {
  //     throw new Error("Product not found in the cart.");
  //   }
  // }

  // Отримати всі товари у кошику
  getItems(): CartItem[] {
    return Array.from(this.items.values());
  }
  
  // Оновити кількість товару у кошику
  updateItemQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than zero.");
    }
    if (this.items.has(productId)) {
      const item = this.items.get(productId)!;
      item.quantity = quantity;
    } else {
      throw new Error("Product not found in the cart.");
    }
  }

  // Отримати загальну вартість товарів у кошику
  getTotalPrice(): number {
    let total = 0;
    for (const item of this.items.values()) {
      total += item.product.price * item.quantity;
    }
    // return total;
    // Округлення до 2 знаків після коми для уникнення проблем з розрахунками Float
    return Math.round(total * 100) / 100;
  }

  // Отримати загальну кількість товарів у кошику
  getTotalItems(): number {
    let totalItems = 0;
    for (const item of this.items.values()) {
      totalItems += item.quantity;
    }
    return totalItems;
  }
  // Очистити кошик
  clearCart(): void {
    this.items.clear();
  }

}

const cart = new ShoppingCart();

// Наші товари
const laptop: Product = { id: "p1", name: "Ноутбук", price: 25000 };
const mouse: Product = { id: "p2", name: "Мишка", price: 800 };

// 1. Додаємо товари
cart.addItem(laptop);
cart.addItem(mouse, 2); // Додали 2 мишки
cart.addItem(mouse); // Додали ще одну мишку (разом 3)


console.log("Товари в кошику:", cart.getItems());
console.log("Загальна кількість:", cart.getTotalItems()); // Виведе: 4
console.log("Загальна вартість:", cart.getTotalPrice()); // Виведе: 27400

// 2. Оновлюємо кількість
cart.updateItemQuantity("p2", 1); // Зменшили кількість мишок до 1
console.log("Нова вартість після оновлення:", cart.getTotalPrice()); // Виведе: 25800
// 3. Видаляємо товар
cart.removeItem("p1"); // Видалили ноутбук
console.log("Загальна кількість після видалення:", cart.getTotalItems()); // Виведе: 1