import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { ButtonModule } from "primeng/button";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { SelectModule } from "primeng/select";
import { IftaLabelModule } from "primeng/iftalabel";

import { Http } from "../../http";
import {
  UserResponseModel,
  UserRole,
  UserCreateModel,
  UserUpdateModel,
} from "../../models/user.model";
import { LoaderService } from "../../services/loader.service";

@Component({
  selector: "app-user-upsert-dialog",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ToastModule,
    SelectModule,
    IftaLabelModule,
  ],
  providers: [MessageService],
  templateUrl: "./user-upsert-dialog.html",
  styleUrl: "./user-upsert-dialog.scss",
})
export class UserUpsertDialog implements OnInit {
  form: FormGroup = new FormGroup({});
  isEdit: boolean = false;
  user: UserResponseModel | null = null;

  roles = [
    { label: "Admin", value: UserRole.ADMIN },
    { label: "User", value: UserRole.USER },
  ];

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private http: Http,
    private messageService: MessageService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.user = this.config.data?.user;
    console.log("user", this.user);
    this.isEdit = !!this.user;

    this.form = this.fb.group({
      email: [this.user?.email || "", [Validators.required, Validators.email]],
      fullName: [this.user?.fullName || "", Validators.required],
      password: [
        "",
        this.isEdit ? [] : [Validators.required, Validators.minLength(6)],
      ],
      role: [this.user?.role || UserRole.USER, Validators.required],
    });

    if (this.isEdit) {
      this.form.get("email")?.disable();
      this.form.get("password")?.disable();
    }
  }

  submit() {
    if (this.form.invalid) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Please fill in all required fields correctly",
      });
      return;
    }

    const value = this.form.value;

    if (this.isEdit && this.user) {
      const updateData: UserUpdateModel = {
        fullName: value.fullName,
        role: value.role,
      };

      this.loaderService.show();
      this.http
        .put<{ status: string }>(`/user/${this.user.id}`, updateData, true)
        .subscribe({
          next: () => {
            this.loaderService.hide();
            this.ref.close({ ...this.user, ...updateData });
          },
          error: (err) => {
            this.loaderService.hide();
            console.error("User update failed", err);
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Failed to update user",
            });
          },
        });
    } else {
      const createData: UserCreateModel = {
        email: value.email,
        fullName: value.fullName,
        password: value.password,
        role: value.role,
      };

      this.loaderService.show();
      this.http
        .post<{ status: string; data: UserResponseModel }>(
          `/user`,
          createData,
          true
        )
        .subscribe({
          next: (res) => {
            this.loaderService.hide();
            this.ref.close(res.data);
          },
          error: (err) => {
            console.error("User creation failed", err);
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Failed to create user",
            });
          },
        });
    }
  }

  cancel() {
    this.ref.close();
  }
}
