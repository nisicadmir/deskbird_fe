import { Routes } from "@angular/router";
import { SignIn } from "./sign-in/sign-in";
import { UserList } from "./user-list/user-list";

export const routes: Routes = [
  {
    path: "",
    component: UserList,
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
