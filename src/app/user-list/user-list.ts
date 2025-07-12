import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { ToolbarModule } from "primeng/toolbar";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MessageService } from "primeng/api"; // Added for user-facing messages
import { ToastModule } from "primeng/toast"; // Added for toast notifications
import { Http } from "../http";
import { UserResponseModel } from "../models/user.model";
import { Auth } from "../services/auth";
import { ActivatedRoute } from "@angular/router";

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
  ], // Updated imports array
  providers: [MessageService], // Provide MessageService at component level, or move to app.config.ts for global use
  templateUrl: "./user-list.html",
  styleUrl: "./user-list.scss",
})
export class UserList {
  public users: UserResponseModel[] = [];
  public meData: UserResponseModel;
  public displayEditDialog: boolean = false;
  public selectedUser: UserResponseModel | null = null;

  constructor(
    private http: Http,
    private auth: Auth,
    private route: ActivatedRoute,
    private messageService: MessageService // Added for error/success notifications
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

  public createUser() {}
  public editUser(user: UserResponseModel) {}

  public logout() {
    this.auth.logout();
  }
}
