import { Component } from "@angular/core";
import { Http } from "../http";
import { UserResponseModel } from "../models/user.model";
import { Auth } from "../services/auth";
import { ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { ToolbarModule } from "primeng/toolbar";

@Component({
  selector: "app-user-list",
  imports: [CommonModule, ButtonModule, TableModule, ToolbarModule],
  templateUrl: "./user-list.html",
  styleUrl: "./user-list.scss",
})
export class UserList {
  public users: UserResponseModel[] = [];
  public meData: UserResponseModel;

  constructor(
    private http: Http,
    private auth: Auth,
    private route: ActivatedRoute
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
      },
      error: (err) => {
        console.error("User deletion failed", err);
        // TODO: Add user-facing error handling if needed (e.g., via PrimeNG message service)
      },
    });
  }

  public logout() {
    this.auth.logout();
  }
}
