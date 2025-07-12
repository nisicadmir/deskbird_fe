import { ResolveFn } from "@angular/router";
import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { UserResponseModel } from "../models/user.model";
import { Router } from "@angular/router";
import { Http } from "../http";

export interface UserResolveResult {
  user?: UserResponseModel;
  error?: any;
}

export const meResolver: ResolveFn<UserResolveResult> = (route, state) => {
  const http = inject(Http);
  const router = inject(Router);
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    router.navigate(["/sign-in"]);
    return of({ error: "No access token" });
  }

  return http
    .get<{ status: string; data: { user: UserResponseModel } }>(
      `/auth/me`,
      true
    )
    .pipe(
      map((response) => {
        if (response.status === "ok") {
          return { user: response.data.user };
        }
        router.navigate(["/sign-in"]);
        return { error: "Invalid response status" };
      }),
      catchError((error) => {
        console.error("User fetch failed:", error);
        router.navigate(["/sign-in"]);
        return of({ error });
      })
    );
};
