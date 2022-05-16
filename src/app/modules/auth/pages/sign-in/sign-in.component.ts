import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PatternsConstants } from 'src/app/core/constants';
import { RequestSignInModel } from 'src/app/shared/models/auth/sign-in';
import { FormGroupTyped } from 'src/typings';
import { signIn } from '../../store/auth.actions';

type FormGroupType = FormGroupTyped<RequestSignInModel>;
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  formGroup!: FormGroupType;
  isSubmit: boolean = false;

  constructor(private formBuilder: FormBuilder, private store$: Store) {
    this.buildForm();
  }

  private buildForm(): void {
    this.formGroup = <FormGroupType>this.formBuilder.group({
      login: [
        '',
        [
          Validators.required,
          Validators.pattern(PatternsConstants.PATTERN_EMAIL),
        ],
      ],
      password: ['', [Validators.required]],
    });
  }

  signIn(): void {
    this.isSubmit = true;

    if (this.formGroup.invalid) return;

    const model: RequestSignInModel = this.formGroup.value;
    this.store$.dispatch(signIn({ payload: model }));
  }
}
