import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../../services/toast.service';
import { ClientsService } from '../../../../services/clients.service';
import { CoursesService } from '../../../../services/courses.service';
import { Course } from '../../../../models/course.model';
@Component({
  selector: 'app-new-client',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-client.component.html',
  styleUrl: './new-client.component.css'
})
export class NewClientComponent implements OnInit {
  courses: Course[] = []
  newform: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    curso_id: new FormControl('', [Validators.required]),
  })

  constructor(public dialogRef: MatDialogRef<NewClientComponent>,
    private toast: ToastService,
    private clientsService: ClientsService,
    private coursesService: CoursesService,
  ){

  }
  ngOnInit(): void {
    this.getCourses()
  }
  closeDialog(){
    this.dialogRef.close()
  }
  getCourses(){
    this.coursesService.getCourses().subscribe({
      next: (response: any) =>{
        this.courses = response.data
      },
      error: (error: any) => {
        this.toast.showToast('Error en el servidor', 3000, 'error-snackbar', 'right', 'top')
      }
    })
  }
  newClient(){
    if(this.newform.valid){
      this.clientsService.newClient(this.newform.value).subscribe({
        next: (response: any) =>{
          this.toast.showToast('Cliente creado correctamente', 3000, 'success-snackbar', 'right', 'top')
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
