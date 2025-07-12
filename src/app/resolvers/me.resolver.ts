import { inject } from "@angular/core";
import { ResolveFn, Router } from "@angular/router";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Http } from "../http";
import { UserResponseModel } from "../models/user.model";
import { Auth } from "../services/auth";

export interface UserResolveResult {
  user?: UserResponseModel;
  error?: any;
}

export const meResolver: ResolveFn<UserResolveResult> = (route, state) => {
  const http = inject(Http);
  const router = inject(Router);
  const auth = inject(Auth);

  if (!auth.getAccessToken()) {
    auth.logout();
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
          return { meData: response.data.user };
        }
        auth.logout();
        return { error: "Invalid response status" };
      }),
      catchError((error) => {
        console.error("User fetch failed:", error);
        auth.logout();
        return of({ error });
      })
    );
};
