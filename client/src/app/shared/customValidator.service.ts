import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomvalidationService {

    patternValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
          if (!control.value) {
            return null;
          }
          const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
          const valid = regex.test(control.value);
          return valid ? null : { invalidPassword: true };
        };
      }


  userNameValidator(userControl: AbstractControl) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (this.validateUserName(userControl.value)) {
          resolve({ userNameNotAvailable: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
  }

  validateUserName(userName: string) {
    const UserList = ['ankit', 'admin', 'user', 'superuser'];
    return (UserList.indexOf(userName) > -1);
  }

    phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // Use a regular expression to validate the phone number format
      const phoneNumberPattern = /^\(\d{3}\) \d{3}-\d{4}$/;
      const isNotNumber = isNaN(control.value)
      const valid = phoneNumberPattern.test(control.value);
      if(isNotNumber){
        return isNotNumber ? { numericAllow: true } : null;
      }
      if(control.value){
        return control.value.length == 10 ? null : { invalidPhoneNumber: true };
      }
      return null;
    };
  }

  adharNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // Use a regular expression to validate the phone number format
      const isNotNumber = isNaN(control.value)
      if(isNotNumber){
        return isNotNumber ? { numericAllow: true } : null;
      }
      if(control.value){
        return control.value.length == 12 ? null : { invalidlength: true };
      }
      return null;
    };
  }

}