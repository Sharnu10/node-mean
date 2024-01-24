import { AbstractControl, ValidatorFn } from '@angular/forms';

export const Validation: ValidatorFn = (controls: AbstractControl) => {
  const password = controls.get('password');
  const confirmPassword = controls.get('confirmPassword');

  return password?.value === confirmPassword?.value ? null : { matching: true };
};
