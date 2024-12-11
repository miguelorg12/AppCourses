import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Client } from '../../../models/client.model';
import { MatDialog } from '@angular/material/dialog';
import { NewClientComponent } from './new-client/new-client.component';
import { UpdClientComponent } from './upd-client/upd-client.component';
import { ClientsService } from '../../../services/clients.service';
import { ToastService } from '../../../services/toast.service';
@Component({
  selector: 'app-client-list',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent implements OnInit, AfterViewInit {
  courseId: number | null = null;
  clients: Client[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private clientservice: ClientsService,
    private toast: ToastService
  ){

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.getClients(Number(params.get('id')));
    });
  }

  ngAfterViewInit(): void {
    this.route.paramMap.subscribe(params => {
      this.getClients(Number(params.get('id')));
    });
  }
  
  
  getClients(courseId?: number){
    if(courseId){
      this.clientservice.getClientsPerCourse(courseId).subscribe((data: any)=>{
        console.log(data)
        this.clients = data.data
      })
    }
    else{
      this.clientservice.getClients().subscribe((data: any)=>{
        console.log(data)
        this.clients = data.data
      })
    }
  }

  openDialog(update: boolean, client?: Client): void {
    if(!update){
      const dialogRef = this.dialog.open(NewClientComponent, {
        width: '600px', 
        height: 'auto',
        hasBackdrop: false,
      });
    dialogRef.afterClosed().subscribe(result => {
    });
    }
    else{
      const dialogRef = this.dialog.open(UpdClientComponent, {
        width: '600px', 
        height: 'auto',
        hasBackdrop: false,
        data: client
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    }
  }
  deleteClient(client_id?: number){
    if(client_id){
      this.clientservice.deleteClient(client_id).subscribe({
        next: (response: any) =>{
          this.toast.showToast('Cliente eliminado correctamente', 3000, 'success-snackbar', 'right', 'top')
          this.getClients()

        },
        error: (error: any) => {
          this.toast.showToast('Error en el servidor', 3000, 'error-snackbar', 'right', 'top')
          console.log(error)
        }
      })
    }
  }
}
