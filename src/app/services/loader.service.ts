import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public isLoading = signal(false);

  constructor() {}

  public show() {
    this.isLoading.set(true);
  }

  public hide() {
    this.isLoading.set(false);
  }
}
