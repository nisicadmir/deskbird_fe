import { Routes } from "@angular/router";
import { SignIn } from "./sign-in/sign-in";
import { UserList } from "./user-list/user-list";
import { authGuard } from "./guarads/auth-guard";
import { meResolver } from "./resolvers/me.resolver";

export const routes: Routes = [
  {
    path: "",
    component: UserList,
    canActivate: [authGuard],
    resolve: {
      meData: meResolver,
    },
  },
  {
    path: "sign-in",
    component: SignIn,
  },
  {
    path: "**",
    redirectTo: "",
  },
];
