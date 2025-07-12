import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { ToolbarModule } from "primeng/toolbar";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { Http } from "../http";
import { UserResponseModel } from "../models/user.model";
import { Auth } from "../services/auth";
import { ActivatedRoute } from "@angular/router";
import { DynamicDialogModule, DialogService } from "primeng/dynamicdialog";
import { UserUpsertDialog } from "./user-upsert-dialog/user-upsert-dialog";

@Component({
  selector: "app-user-list",
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    ToolbarModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    DynamicDialogModule,
  ],
  providers: [MessageService, DialogService],
  templateUrl: "./user-list.html",
  styleUrl: "./user-list.scss",
})
export class UserList {
  public users: UserResponseModel[] = [];
  public meData: UserResponseModel;

  constructor(
    private http: Http,
    private auth: Auth,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private dialogService: DialogService
  ) {
    this.meData = this.route.snapshot.data["meData"][
      "meData"
    ] as UserResponseModel;
  }

  ngOnInit() {
    this.http
      .get<{ status: string; data: UserResponseModel[] }>("/user/list", true)
      .subscribe((users) => {
        this.users = users.data;
      });
  }

  public deleteUser(id: number) {
    this.http.delete<{ status: string }>(`/user/${id}`, true).subscribe({
      next: () => {
        this.users = this.users.filter((user) => user.id !== id);
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "User deleted successfully",
        });
      },
      error: (err) => {
        console.error("User deletion failed", err);
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Failed to delete user",
        });
      },
    });
  }

  public createUser() {
    const ref = this.dialogService.open(UserUpsertDialog, {
      header: "Create User",
      width: "50%",
    });

    ref.onClose.subscribe((newUser: UserResponseModel) => {
      if (newUser) {
        this.users.push(newUser);
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "User created successfully",
        });
      }
    });
  }

  public editUser(user: UserResponseModel) {
    const ref = this.dialogService.open(UserUpsertDialog, {
      header: "Edit User",
      width: "50%",
      data: { user },
    });

    ref.onClose.subscribe((updatedUser: UserResponseModel) => {
      if (updatedUser) {
        const index = this.users.findIndex((u) => u.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "User updated successfully",
          });
        }
      }
    });
  }

  public logout() {
    this.auth.logout();
  }
}
