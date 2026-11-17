import { Component, EventEmitter, Output, signal, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

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
export class ChatModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  userName = signal<string>('');
  userContact = signal<string>('');
  currentMessage = signal<string>('');
  isSending = signal<boolean>(false);
  showValidationError = signal<boolean>(false);

  whatsappUrl = 'https://wa.me/380000000000';
  signalUrl = 'https://signal.me/#p/+380000000000';

  messages = signal<ChatMessage[]>([
    {
      sender: 'studio',
      text: 'Привіт! Я на зв’язку. Залиш своє ім’я, імейл та напиши запитання нижче — або переходь одразу в зручний месенджер.',
      time: this.getCurrentTime()
    }
  ]);

  ngOnInit(): void {
    emailjs.init("YOUR_PUBLIC_KEY");

    // Відновлюємо збережені дані з пам'яті браузера при відкритті чату
    const savedName = localStorage.getItem('violet_studio_user_name');
    const savedContact = localStorage.getItem('violet_studio_user_contact');

    if (savedName) {
      this.userName.set(savedName);
    }
    if (savedContact) {
      this.userContact.set(savedContact);
    }
  }

  onClose(): void {
    this.close.emit();
  }

  onFieldInput(): void {
    if (this.showValidationError() && this.userName().trim() && this.userContact().trim()) {
      this.showValidationError.set(false);
    }
  }

  sendMessage(): void {
    const name = this.userName().trim();
    const contact = this.userContact().trim();
    const text = this.currentMessage().trim();

    if (!text || this.isSending()) {
      return;
    }

    if (!name || !contact) {
      this.showValidationError.set(true);
      return;
    }

    this.showValidationError.set(false);
    this.isSending.set(true);

    // Зберігаємо введені дані в localStorage для наступних візитів
    localStorage.setItem('violet_studio_user_name', name);
    localStorage.setItem('violet_studio_user_contact', contact);

    const displayHtml = `<strong>Ім'я:</strong> ${name}<br><strong>Email:</strong> ${contact}<br><br>${text}`;

    this.messages.update((prev) => [
      ...prev,
      {
        sender: 'user',
        text: displayHtml,
        time: this.getCurrentTime()
      }
    ]);

    this.currentMessage.set('');
    this.scrollToBottom();

    const templateParams = {
      from_name: name,
      from_email: contact,
      message: text,
      to_email: 'helen@violetstudio.com'
    };

    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
      .then(() => {
        this.messages.update((prev) => [
          ...prev,
          {
            sender: 'studio',
            text: 'Дякую! Твоє повідомлення успішно надіслано мені на пошту. Скоро відповім!',
            time: this.getCurrentTime()
          }
        ]);
        this.isSending.set(false);
        this.scrollToBottom();
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        this.messages.update((prev) => [
          ...prev,
          {
            sender: 'studio',
            text: 'Повідомлення додано в чат, але сталася помилка при відправці на пошту. Можеш написати мені у WhatsApp чи Signal нижче!',
            time: this.getCurrentTime()
          }
        ]);
        this.isSending.set(false);
        this.scrollToBottom();
      });
  }

  private getCurrentTime(): string {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      try {
        if (this.scrollContainer) {
          this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
        }
      } catch (err) {}
    }, 100);
  }
}