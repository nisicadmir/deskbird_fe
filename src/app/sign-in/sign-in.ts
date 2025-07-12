import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { IftaLabelModule } from "primeng/iftalabel";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { Http } from "../http";
import { Auth } from "../services/auth";

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
  constructor(private http: Http, private router: Router, private auth: Auth) {}

  public formGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  });

  onSubmit() {
    console.log(this.formGroup.value);
    if (this.formGroup.valid) {
      this.http
        .post<{ status: string; data: { accessToken: string } }>(
          "/auth/sign-in",
          this.formGroup.value
        )
        .subscribe((res) => {
          this.auth.setAccessToken(res.data.accessToken);
          this.router.navigate(["/"]);
        });
    }
  }
}
