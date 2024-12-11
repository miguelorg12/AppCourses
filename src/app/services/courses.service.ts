import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Course } from '../models/course.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${environment.api}/cursos`)
  }

  newCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${environment.api}/cursos`, course)
  }

  updateCourse(course: Course, course_id: number): Observable<Course> {
    return this.http.put<Course>(`${environment.api}/cursos/${course_id}`, course)
  }

  deleteCourse(course_id: number): Observable<Course> {
    return this.http.delete<Course>(`${environment.api}/cursos/${course_id}`)
  }

  
}
