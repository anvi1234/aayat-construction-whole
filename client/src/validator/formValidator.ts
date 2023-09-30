import { AbstractControl, Validators } from '@angular/forms';

export class FormValidation {
  static phoneNumber(control: AbstractControl) {
    const value = control.value;
    if (!value) {
      return { required: true };
    }

    const numericValue = value.replace(/\D/g, '');
    if (!/^\d+$/.test(numericValue)) {
      return { pattern: true };
    }

    if (numericValue.length < 10) {
      return { minlength: true };
    }

    if (numericValue.length > 15) {
      return { maxlength: true };
    }

    return null;
  }
}