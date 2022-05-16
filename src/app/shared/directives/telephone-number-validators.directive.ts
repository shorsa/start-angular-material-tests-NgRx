import { Directive } from '@angular/core';
import { FormControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[telephoneNumber]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: TelephoneNumberValidatorsDirective,
      multi: true,
    },
  ],
})
export class TelephoneNumberValidatorsDirective implements Validator {
  validate(c: FormControl): ValidationErrors | null {
    const isValidPhoneNumber = /^\d{3,3}-\d{3,3}-\d{3,3}$/.test(c.value);
    const message = {
      telephoneNumber: {
        message: 'The phone number mu st be valid (XXX-XXX-XXX, where X is a digit)',
      },
    };
    return isValidPhoneNumber ? null : message;
  }
}
