import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';

import { AuthguardService } from "./_services/authguard.service";
const routes: Routes = [
  { path: 'home', component: HomeComponent ,canActivate: [AuthguardService]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent,canActivate: [AuthguardService] },
  { path: 'user', component: BoardUserComponent,canActivate: [AuthguardService] },
  { path: 'mod', component: BoardModeratorComponent,canActivate: [AuthguardService] },
  { path: 'admin', component: BoardAdminComponent,canActivate: [AuthguardService] },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
