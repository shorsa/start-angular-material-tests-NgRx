import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormErrorComponent } from './form-error/form-error.component';
import { InputComponent } from './input/input.component';
@NgModule({
  declarations: [FormErrorComponent],
  imports: [
    CommonModule,
    MatFormFieldModule
  ],
  exports: [FormErrorComponent]
})

export class FormErrorModule { }

@NgModule({
  declarations: [InputComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    FormErrorModule
  ],
  exports: [InputComponent]
})

export class InputModule { }
