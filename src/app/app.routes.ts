import { Routes } from '@angular/router';
import { ClientListComponent } from './views/clients/client-list/client-list.component';
import { CoursesListComponent } from './views/courses/courses-list/courses-list.component';
import { LoginComponent } from './auth/login/login.component';
import { UsersListComponent } from './views/user/users-list/users-list.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';


export const routes: Routes = [
    {path: 'clients', component: ClientListComponent},
    {path: 'clients/:id', component: ClientListComponent},
    {path: 'courses', component: CoursesListComponent},
    {path: 'users', component: UsersListComponent},
    {path: 'home', component: NavbarComponent},
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: 'login', pathMatch:'full'},
];
