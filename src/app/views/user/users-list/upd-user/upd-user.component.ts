import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../../services/toast.service';
import { AuthService } from '../../../../services/auth.service';
import { CoursesService } from '../../../../services/courses.service';
import { Course } from '../../../../models/course.model';
@Component({
  selector: 'app-upd-user',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './upd-user.component.html',
  styleUrl: './upd-user.component.css'
})
export class UpdUserComponent implements OnInit {
  courses: Course[] = []
  updform : FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required]),
  })
  constructor(public dialogRef: MatDialogRef<UpdUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast: ToastService,
    private authService: AuthService,
    private coursesService: CoursesService,
  ) { }

  ngOnInit(): void {
   
    this.updform.setValue({
      nombre: this.data.nombre,
      correo: this.data.correo,
    })

  }

  closeDialog(){
    this.dialogRef.close()
  }

  

  updUser(){
    if(this.updform.valid){
      this.authService.updateUser(this.updform.value, this.data.id).subscribe({
        next: (response: any) =>{
          this.toast.showToast('Usuario actualizado correctamente', 3000, 'success-snackbar', 'right', 'top')
          this.dialogRef.close()
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
