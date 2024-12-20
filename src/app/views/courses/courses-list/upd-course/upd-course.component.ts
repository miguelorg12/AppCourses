import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../../services/toast.service';
import { CoursesService } from '../../../../services/courses.service';
@Component({
  selector: 'app-upd-course',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './upd-course.component.html',
  styleUrl: './upd-course.component.css'
})
export class UpdCourseComponent implements OnInit {
  updform : FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
  })
  constructor(public dialogRef: MatDialogRef<UpdCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast: ToastService,
    private coursesService: CoursesService,
  ) { }

  ngOnInit(): void {
    this.updform.setValue({
      nombre: this.data.nombre,
      descripcion: this.data.descripcion
    })
      
  }
  closeDialog(){
    this.dialogRef.close()
  }
  updCourse(){
    if(this.updform.valid){
      this.coursesService.updateCourse(this.updform.value, this.data.id).subscribe({
        next: (response: any) =>{
          this.toast.showToast('Curso actualizado correctamente', 3000, 'success-snackbar', 'right', 'top')
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
    this.dialogRef.close()
  }
}
