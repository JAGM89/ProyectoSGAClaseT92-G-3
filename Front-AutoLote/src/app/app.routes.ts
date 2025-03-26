import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { UsersComponent } from './component/users/users.component';
import { VehiclesComponent } from './component/vehicles/vehicles.component';



export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UsersComponent },
    {path: 'vehicles', component: VehiclesComponent}
  ];
