import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../../services/toast.service';
import { ClientsService } from '../../../../services/clients.service';
import { CoursesService } from '../../../../services/courses.service';
import { Course } from '../../../../models/course.model';

@Component({
  selector: 'app-upd-client',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './upd-client.component.html',
  styleUrl: './upd-client.component.css'
})
export class UpdClientComponent implements OnInit {
  courses: Course[] = []
  updform : FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    curso_id: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required])
  })

  constructor(public dialogRef: MatDialogRef<UpdClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast: ToastService,
    private clientsService: ClientsService,
    private coursesService: CoursesService,
  ){

  }
  ngOnInit(): void {
    this.updform.setValue({
      nombre: this.data.nombre,
      correo: this.data.correo,
      telefono: this.data.telefono,
      curso_id: this.data.curso_id
    })
    this.getCourses()
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

  closeDialog(){
    this.dialogRef.close()
  }

  updClient(){
    if(this.updform.valid){
      this.clientsService.updateClient(this.updform.value, this.data.id).subscribe({
        next: (response: any) =>{
          this.toast.showToast('Cliente actualizado correctamente', 3000, 'success-snackbar', 'right', 'top')
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
