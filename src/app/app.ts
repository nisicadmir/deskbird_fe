import { Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { LoaderComponent } from "./loader/loader.component";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  protected readonly title = signal("task_deskbird_fe");
}
