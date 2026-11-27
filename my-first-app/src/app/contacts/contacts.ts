import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MapLocationComponent } from '../map-location/map-location';
import { HighlightDirective } from '../directives/highlight.directive';
import { DigitsOnlyDirective } from '../directives/digits-only.directive';
import { MaskSecretPipe } from '../pipes/mask-secret.pipe';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MapLocationComponent,
    HighlightDirective,
    DigitsOnlyDirective,
    MaskSecretPipe
  ],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css'
})
export class ContactsComponent {
  private fb = inject(FormBuilder);

  isSent = signal(false);
  supportCard = '4149499100001234';
  supportPhone = '380501234567';

  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    subject: ['', Validators.required],
    message: ['', Validators.required]
  });

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSent.set(true);
    this.contactForm.reset();
  }
}