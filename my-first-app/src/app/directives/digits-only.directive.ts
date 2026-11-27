import { Directive, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: 'input[appDigitsOnly]',
  standalone: true
})
export class DigitsOnlyDirective {
  private el = inject(ElementRef<HTMLInputElement>);
  private renderer = inject(Renderer2);

  @HostListener('input')
  onInput() {
    const inputElement = this.el.nativeElement;
    const rawValue = inputElement.value;
    const digitsOnly = rawValue.replace(/\D+/g, '');

    if (rawValue !== digitsOnly) {
      this.renderer.setProperty(inputElement, 'value', digitsOnly);
      inputElement.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
}