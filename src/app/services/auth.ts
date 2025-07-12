import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class Auth {
  constructor(private router: Router) {}

  public setAccessToken(accessToken: string) {
    localStorage.setItem("access_token", accessToken);
  }

  public getAccessToken() {
    return localStorage.getItem("access_token");
  }

  public logout() {
    localStorage.removeItem("access_token");
    this.router.navigate(["/sign-in"]);
  }
}
