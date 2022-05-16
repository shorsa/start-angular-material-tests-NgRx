import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { RouterModule, Routes } from "@angular/router";
import { RoutesConstants } from "src/app/core/constants";
import { InputModule } from "src/app/shared/components/shared-components.module";
import { SignInComponent } from "./sign-in.component";

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: SignInComponent,
  },
];

const MATERIAL = [MatButtonModule, MatFormFieldModule];

@NgModule({
  declarations: [SignInComponent],
  imports: [
    MATERIAL,
    InputModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class SignInModule {}
