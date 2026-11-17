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

  // Сигнали форми (повністю збігаються з твоїм HTML)
  userName = signal<string>('');
  userContact = signal<string>(''); // Сюди вводиться імейл користувача
  currentMessage = signal<string>('');
  isSending = signal<boolean>(false);

  // Посилання на месенджери у футері
  whatsappUrl = 'https://wa.me/380000000000'; // Заміни на свій актуальний номер
  signalUrl = 'https://signal.me/#p/+380000000000'; // Заміни на своє посилання Signal

  // Стрічка повідомлень
  messages = signal<ChatMessage[]>([
    {
      sender: 'studio',
      text: 'Привіт! Я на зв’язку. Залиш свій імейл та напиши запитання нижче — або переходь одразу в зручний месенджер.',
      time: this.getCurrentTime()
    }
  ]);

  // Закриття модального вікна
  onClose(): void {
    this.close.emit();
  }

  // Відправлення повідомлення
  sendMessage(): void {
    const contact = this.userContact().trim();
    const text = this.currentMessage().trim();
    const name = this.userName().trim();

    if (!contact || !text || this.isSending()) {
      return;
    }

    this.isSending.set(true);

    // Додаємо повідомлення користувача у чат
    this.messages.update((prev) => [
      ...prev,
      {
        sender: 'user',
        text: name ? `${name} (${contact}): ${text}` : `${contact}: ${text}`,
        time: this.getCurrentTime()
      }
    ]);

    // Очищаємо поле повідомлення та знімаємо стан відправки
    this.currentMessage.set('');
    
    setTimeout(() => {
      this.isSending.set(false);
    }, 400);
  }

  private getCurrentTime(): string {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}