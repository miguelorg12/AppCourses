import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Client } from '../models/client.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${environment.api}/clientes`)
  }

  newClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${environment.api}/clientes`, client)
  }

  updateClient(client: Client, client_id: number): Observable<Client> {
    return this.http.put<Client>(`${environment.api}/clientes/${client_id}`, client)
  }
  getClientsPerCourse(course_id: number): Observable<Client> {
    return this.http.get<Client>(`${environment.api}/cursos/clientes/${course_id}`)
  }
}
