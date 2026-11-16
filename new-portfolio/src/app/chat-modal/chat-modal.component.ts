import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ChatMessage {
  sender: 'studio' | 'user';
  text: string;
  time: string;
}

@Component({
  selector: 'app-chat-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.css']
})
export class ChatModalComponent {
  @Output() close = new EventEmitter<void>();

  // Твої контакти для швидких кнопок (підстав свої реальні дані)
  readonly whatsappUrl = 'https://wa.me/380000000000?text=Привіт!%20Хочу%20задати%20запитання%20щодо%20проєкту';
  readonly signalUrl = 'https://signal.me/#p/+380000000000'; // Офіційне посилання Signal

  // Поля форми
  userName = signal('');
  contactMethod = signal<'Email' | 'WhatsApp' | 'Signal'>('Email');
  userContact = signal('');
  currentMessage = signal('');
  isSending = signal(false);
  isSent = signal(false);

  // Історія повідомлень у вікні чату
  messages = signal<ChatMessage[]>([
    {
      sender: 'studio',
      text: 'Привіт! 👋 Я на зв’язку. Залиш свої контакти та напиши запитання нижче — або переходь одразу в зручний месенджер.',
      time: this.getCurrentTime()
    }
  ]);

  get contactPlaceholder(): string {
    switch (this.contactMethod()) {
      case 'Email':
        return 'Твій email (напр. name@gmail.com)';
      case 'WhatsApp':
        return 'Номер у WhatsApp (+380...)';
      case 'Signal':
        return 'Номер або нікнейм у Signal';
    }
  }

  selectMethod(method: 'Email' | 'WhatsApp' | 'Signal') {
    this.contactMethod.set(method);
  }

  sendMessage() {
    const text = this.currentMessage().trim();
    const contact = this.userContact().trim();

    if (!text || !contact) return;

    // Додаємо повідомлення користувача у вікно чату
    this.messages.update(list => [
      ...list,
      {
        sender: 'user',
        text: text,
        time: this.getCurrentTime()
      }
    ]);

    this.isSending.set(true);
    this.currentMessage.set('');

    // Імітація відправки (сюди згодом підключимо EmailJS)
    setTimeout(() => {
      this.isSending.set(false);
      this.isSent.set(true);

      const nameGreeting = this.userName().trim() ? `, ${this.userName().trim()}` : '';
      this.messages.update(list => [
        ...list,
        {
          sender: 'studio',
          text: `Дякую${nameGreeting}! Запитання отримано. Я відповім тобі у ${this.contactMethod()} (${contact}) найближчим часом ✨`,
          time: this.getCurrentTime()
        }
      ]);
    }, 600);
  }

  onClose() {
    this.close.emit();
  }

  private getCurrentTime(): string {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}