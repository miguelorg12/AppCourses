import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../../services/toast.service';
import { CoursesService } from '../../../../services/courses.service';
@Component({
  selector: 'app-new-course',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-course.component.html',
  styleUrl: './new-course.component.css'
})
export class NewCourseComponent {
  newform : FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
  })

  constructor(public dialogRef: MatDialogRef<NewCourseComponent>,
    private toast: ToastService,
    private coursesService: CoursesService,
  ) { }

  closeDialog(){
    this.dialogRef.close()
  }

  newCourse(){
    if(this.newform.valid){
      this.coursesService.newCourse(this.newform.value).subscribe({
        next: (response: any) =>{
          this.toast.showToast('Curso creado correctamente', 3000, 'success-snackbar', 'right', 'top')
          this.dialogRef.close()
        },
        error: (error: any) => {
          this.toast.showToast('Error en el servidor', 3000, 'error-snackbar', 'right', 'top')

        }
      })

    }
    else{
      this.toast.showToast('Formulario invalido', 3000, 'warning-snackbar', 'right', 'top')
    }
    

  }

}
