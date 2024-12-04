import { Component } from '@angular/core';

import { LoadingService } from './services/loading.service';
import { NgxSpinnerModule } from 'ngx-spinner';
@Component({
  selector: 'app-root',
  imports: [NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'AppCursos';
  constructor(private loadingService: LoadingService){

  }
  show(){
    this.loadingService.showSpinner()
  }
  hide(){
    this.loadingService.hideSpinner()
  }
}
