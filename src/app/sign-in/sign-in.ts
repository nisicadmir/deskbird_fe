import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { IftaLabelModule } from "primeng/iftalabel";

@Component({
  selector: "app-sign-in",
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    IftaLabelModule,
  ],
  templateUrl: "./sign-in.html",
  styleUrl: "./sign-in.scss",
})
export class SignIn {
  public formGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  });
}
