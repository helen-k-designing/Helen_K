import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskSecret',
  standalone: true
})
export class MaskSecretPipe implements PipeTransform {
  transform(value: string | null | undefined, visibleCount = 4): string {
    if (!value) {
      return '';
    }

    const str = String(value);

    if (str.length <= visibleCount) {
      return str;
    }

    const hiddenPart = '*'.repeat(str.length - visibleCount);
    const visiblePart = str.slice(-visibleCount);

    return hiddenPart + visiblePart;
  }
}