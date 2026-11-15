import { BlogPost } from './blog.model';

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'Від паперових лекал до CSS Grid: спільна геометрія',
    excerpt: 'Як досвід конструювання одягу допомагає будувати складні адаптивні сітки без зайвих медіа-запитів.',
    content: [
      'Коли я створювала лекала для суконь, кожна виточка та лінія крою мала свою математичну логіку. Тканина має натяг, драпірування і поводить себе по-різному в русі.',
      'У фронтенді CSS Grid та Flexbox працюють за тим самим принципом. Замість жорсткої фіксації пікселів ми задаємо пропорції (fr, minmax) і дозволяємо інтерфейсу «сідати» по фігурі будь-якого екрана.'
    ],
    codeSnippet: `.editorial-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 1.5rem;\n}`,
    category: 'design',
    categoryLabel: 'Дизайн та UI',
    date: '12 Лис 2026',
    readTime: '4 хв',
    imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
    tags: ['CSS Grid', 'Архітектура', 'Fashion-бекграунд']
  },
  {
    id: 2,
    title: 'Типізація гардероба: мій перший пет-проєкт на Angular',
    excerpt: 'Чому сувора типізація TypeScript рятує від хаосу в компонентах так само, як капсульний підхід у моді.',
    content: [
      'Перехід із креативної індустрії в розробку змусив мене полюбити структурованість. Коли проєкт росте, без чітких контрактів даних легко загубитися.',
      'Використання Angular Signals у поєднанні з інтерфейсами TypeScript дозволило зробити фільтрацію лукбуку миттєвою та передбачуваною.'
    ],
    codeSnippet: `interface GarmentItem {\n  id: string;\n  season: 'SS26' | 'FW26';\n  fabricComposition: string[];\n}`,
    category: 'frontend',
    categoryLabel: 'Frontend',
    date: '05 Лис 2026',
    readTime: '5 хв',
    tags: ['Angular', 'TypeScript', 'Signals']
  },
  {
    id: 3,
    title: 'Чистий UI без візуального шуму',
    excerpt: 'Чому я прибираю стандартні рамки браузера і як зберігати доступність, не руйнуючи мінімалізм.',
    content: [
      'В одязі преміальність визначається виворотом — тим, як оброблені шви, яких ніхто не бачить. У вебі це якість коду та відсутність випадкових візуальних артефактів.',
      'Стандартні сині обводки фокусу часто ламають витончену типографіку. Замість них я використовую кастомні стани :focus-visible з м’яким підсвічуванням.'
    ],
    category: 'career',
    categoryLabel: 'Кар’єрний шлях',
    date: '28 Жов 2026',
    readTime: '3 хв',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    tags: ['UI/UX', 'Мінімалізм', 'A11y']
  }
];