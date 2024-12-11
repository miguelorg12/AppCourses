import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Course } from '../../../models/course.model';
import {
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { NewCourseComponent } from './new-course/new-course.component';
import { UpdCourseComponent } from './upd-course/upd-course.component';
import { Router } from '@angular/router';
import { CoursesService } from '../../../services/courses.service';
import { ToastService } from '../../../services/toast.service';
@Component({
  selector: 'app-courses-list',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.css'
})
export class CoursesListComponent implements OnInit {
  courses : Course[] = []
  constructor(private dialog: MatDialog,
    private router: Router,
    private coursesService: CoursesService,
    private toast: ToastService
  ){

  }
  ngOnInit(): void {
      this.getCourses()
  }

  getCourses(){
    this.coursesService.getCourses().subscribe((data: any)=>{
      console.log(data)
      this.courses = data.data
    })
  }
  gotoClients(courseid?: number){
    this.router.navigate(['/clients', courseid])
  }

  openDialognewCourse(update: boolean, course?: Course): void {
    if(!update)
    {
      const dialogRef = this.dialog.open(NewCourseComponent, {
        width: '600px', 
        height: 'auto',
        hasBackdrop: false,
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    }
    else{
      const dialogRef = this.dialog.open(UpdCourseComponent, {
        width: '600px', 
        height: 'auto',
        hasBackdrop: false,
        data: course
      });
      dialogRef.afterClosed().subscribe(result => {
      });

    } 
  }

  deleteCourse(course_id?: number){
    if(course_id){
      this.coursesService.deleteCourse(course_id).subscribe({
        next: (data: any) => {
          this.toast.showToast('Curso eliminado correctamente', 3000, 'success-snackbar', 'right', 'top')
          this.getCourses()
        },
        error: (error: any) => {
          this.toast.showToast('Error al eliminar el curso', 3000, 'error-snackbar', 'right', 'top')
          console.log(error)
        }
      })
      }
    }
}
