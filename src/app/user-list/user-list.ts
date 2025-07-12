import { Component } from "@angular/core";
import { Http } from "../http";
import { UserResponseModel } from "../models/user.model";
import { Auth } from "../services/auth";

@Component({
  selector: "app-user-list",
  imports: [],
  templateUrl: "./user-list.html",
  styleUrl: "./user-list.scss",
})
export class UserList {
  public users: UserResponseModel[] = [];

  constructor(private http: Http, private auth: Auth) {}

  ngOnInit() {
    this.http
      .get<{ status: string; data: UserResponseModel[] }>("/user/list", true)
      .subscribe((users) => {
        this.users = users.data;
      });
  }

  public deleteUser(id: string) {}

  public logout() {
    this.auth.logout();
  }
}
