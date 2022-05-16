import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Injector,
  Input,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  NgControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { PatternsConstants } from 'src/app/core/constants';
import { ValueAccessorBase } from './value-accessor';

type InputType = 'text' | 'password' | 'number' | 'email' | 'phone';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent
  extends ValueAccessorBase<string>
  implements OnInit, AfterViewInit
{
  @Input() inputAriaLabel?: string;
  @Input() autocomplete?: string;
  @Input() disabled?: boolean;
  @Input() attemptSubmit?: boolean;
  @Input() control?: FormControl;
  @Input() placeholder?: string;
  @Input() readonly?: boolean;
  @Input() actionIcon?: string;
  @Input() isClearButton?: boolean;

  @Input('type')
  get type(): InputType {
    return this.inputType;
  }
  set type(value: InputType) {
    this.inputType = value;
  }

  @Input() styleClasses?: string;
  @Input() label?: string;

  private ngControl!: NgControl | AbstractControl;

  showPassword: boolean = false;
  isPasswordType: boolean = false;
  inputType: InputType = 'text';

  constructor(
    private injector: Injector,
    private changeDetector: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.isPasswordType = this.isPassword;
  }

  ngAfterViewInit(): void {
    if (!this.control) return;

    const model: NgControl | null = this.injector.get(NgControl, null);
    if (model && model.control) {
      this.ngControl = model.control;
    } else if (model) {
      this.ngControl = model;
    } else if (this.control) {
      this.ngControl = this.control;
    }

    this.control.valueChanges.subscribe((value) => {
      if (typeof value === 'string') {
        if (!value.split(' ')[0]) {
          value = value.split(' ').splice(0, 1).join(' ');
        }

        if (this.type === 'phone') {
          const reg = value
            .replace(/\D/g, '')
            .match(PatternsConstants.PATTERN_PHONE_NUMBER);
          value = !reg[2]
            ? reg[1]
            : '(' + reg[1] + ') ' + reg[2] + (reg[3] ? '-' + reg[3] : '');
        }
        this.control!.setValue(value, { emitEvent: false });
      }
    });

    this.changeDetector.detectChanges();
  }

  get isPassword(): boolean {
    return this.type === 'password';
  }

  get typeInput(): InputType {
    return this.type === 'password'
      ? this.showPassword
        ? 'text'
        : this.type
      : this.type;
  }

  clearInput(): void {
    if (this.control) {
      this.control.setValue('');
    } else {
      this.value = '';
    }
  }

  changeShowPassword(): void {
    this.showPassword = !this.showPassword;
    this.inputType = this.showPassword ? 'text' : 'password';
  }
}
