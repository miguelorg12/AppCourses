import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../../services/toast.service';
import { AuthService } from '../../../../services/auth.service';
@Component({
  selector: 'app-new-user',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {

  newform: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(public dialogRef: MatDialogRef<NewUserComponent>,
    private toast: ToastService,
    private authService: AuthService,
  ){

  }

  closeDialog(): void {
    this.dialogRef.close()
  }

  newUser(): void {
    if(this.newform.valid){
      this.authService.newUser(this.newform.value).subscribe({
        next: (response: any) =>{
          this.toast.showToast('Usuario creado correctamente', 3000, 'success-snackbar', 'right', 'top')
          this.dialogRef.close()
        },
        error: (error: any) => {
          this.toast.showToast('Error en el servidor', 3000, 'error-snackbar', 'right', 'top')
          console.log(error)
        }
      })

    }
    else{
      this.toast.showToast('Formulario invalido', 3000, 'warning-snackbar', 'right', 'top')
    }
  }
}
