import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: User): Observable<User> {
    return this.http.post<User>(`${environment.api}/login`, user)
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.api}/usuarios`)
  }

  newUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.api}/usuarios`, user)
  }

  updateUser(user: User, user_id: number): Observable<User> {
    return this.http.put<User>(`${environment.api}/usuarios/${user_id}`, user)
  }
}
