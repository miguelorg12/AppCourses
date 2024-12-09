import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { NewUserComponent } from './new-user/new-user.component';
import { UpdUserComponent } from './upd-user/upd-user.component';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-users-list',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  users: User[] = []

  constructor(private dialog: MatDialog,
    private authService: AuthService
  ){
    this.getUsers()
  }

  getUsers(){
    this.authService.getUsers().subscribe((data: any)=>{
      console.log(data)
      this.users = data.data
    })
  }
  openDialog(update: boolean, user?: User): void {
    if(!update)
    {
      const dialogRef = this.dialog.open(NewUserComponent, {
        width: '600px', 
        height: 'auto',
        hasBackdrop: false,
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    }
    else{
      const dialogRef = this.dialog.open(UpdUserComponent, {
        width: '600px', 
        height: 'auto',
        hasBackdrop: false,
        data: user
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    }
  }

}
