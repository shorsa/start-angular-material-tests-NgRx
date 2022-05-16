import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import {
  AbstractControl,
  AbstractControlDirective,
  ValidationErrors,
} from '@angular/forms';
import { PatternsConstants } from 'src/app/core/constants/patterns.constants';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorComponent implements AfterViewChecked {
  @Input()
  private control!: AbstractControlDirective | AbstractControl;

  private readonly errorMessage = {
    pattern: (params: ValidationErrors): string => this.getPatternMassage(params),
    min: (params: ValidationErrors): string => `The minimum value must be ${params.min}`,
    max: (params: ValidationErrors): string => `The maximum value must be ${params.max}`,
    mustMatch: (): string => 'Passwords do not match',
    required: () => 'This field is required',
    minlength: (params: ValidationErrors) =>
      'The min number of characters is ' + params.requiredLength,
    maxlength: (params: ValidationErrors) =>
      'The max allowed number of characters is ' + params.requiredLength,
  };

  constructor(private readonly changeDetector: ChangeDetectorRef) {}

  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }

  get errors(): Error[] | null {
    console.log(this.control);

    if (!this.control.errors) return null;
    return Object.keys(this.control.errors).map((field) => {
      console.log(field);

      return this.getMessage(field, (this.control.errors as ValidationErrors)[field]);
    });
  }

  private getPatternMassage(params: ValidationErrors): string {
    if (params.requiredPattern === `${PatternsConstants.PATTERN_EMAIL}`) {
      return 'Invalid email, must be in the format xxx@example.com';
    }
    return 'Invalid value';
  }

  private getMessage(type: string, params: any): Error {
    return {
      key: type,
      value: (this.errorMessage as any)[type](params),
    };
  }
}

export interface Error {
  key: string;
  value: string;
}
