import { Pipe, PipeTransform } from "@angular/core";
import { UserResponseModel } from "../models/user.model";
import { UserRole } from "../models/user.model";

@Pipe({
  name: "isAdmin",
  standalone: true,
})
export class AdminPipe implements PipeTransform {
  transform(user: UserResponseModel | null): boolean {
    console.log("user", user);
    return user?.role === UserRole.ADMIN || false;
  }
}
