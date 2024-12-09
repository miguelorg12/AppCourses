import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    correo: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })
  constructor(private router: Router,
    private authService: AuthService,
    private toast: ToastService,
  ){

  }

  login() {
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) =>{
          this.router.navigate(['/users'])
          this.toast.showToast('Inicio de sesion correcto', 3000, 'success-snackbar', 'right', 'top')
        },
        error: (error: any) => {
          console.log(error)
          this.toast.showToast('Error en el servidor', 3000, 'error-snackbar', 'right', 'top')
        }
      })

    }
    else{
      this.toast.showToast('Formulario invalido', 3000, 'warning-snackbar', 'right', 'top')
    }
  }
}
