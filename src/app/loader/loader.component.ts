import { Component, effect, inject, signal } from "@angular/core";
import { LoaderService } from "../services/loader.service";

@Component({
  selector: "app-loader",
  imports: [],
  templateUrl: "./loader.component.html",
  styleUrl: "./loader.component.scss",
})
export class LoaderComponent {
  public loaderService = inject(LoaderService);
  public isLoading = signal(false);

  constructor() {
    effect(() => {
      this.isLoading.set(this.loaderService.isLoading());
    });
  }
}
