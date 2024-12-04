import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private spinner: NgxSpinnerService) { }

  showSpinner() {
    this.spinner.show(undefined, {
      type: "square-jelly-box",
      size: "large",
      bdColor: "rgba(0, 0, 0, 0.5)",
      color: "white",
    });
  }

  hideSpinner() {
    this.spinner.hide();
  }
}