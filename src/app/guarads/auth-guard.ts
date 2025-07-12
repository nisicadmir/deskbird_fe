import { CanActivateFn } from "@angular/router";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { Auth } from "../services/auth";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(Auth);

  if (auth.getAccessToken()) {
    return true; // Token found, allow access
  } else {
    auth.logout();
    return false; // No token found, deny access
  }
};
