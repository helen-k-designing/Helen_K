import AppUser from './User'; // імпорт default з довільним ім'ям
import { log as logger } from './analytics'; // імпорт з аліасом

const user = new AppUser('Олена');
logger(user.greet());