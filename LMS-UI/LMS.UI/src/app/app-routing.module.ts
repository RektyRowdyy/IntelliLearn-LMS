import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewBooksComponent } from './components/books/view-books/view-books.component';
import { LoginComponent } from './components/user-authentication/login/login.component';
import { RegisterComponent } from './components/user-authentication/register/register.component';
import { DashboardComponent } from './components/books/dashboard/dashboard.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { DeleteBooksComponent } from './components/books/delete-books/delete-books.component';
import { CreateBooksComponent } from './components/books/create-books/create-books.component';
import { UsersService } from 'src/app/services/users.service';

const routes: Routes = [
  {
    path: 'view-book',
    component: ViewBooksComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'delete-book',
    component: DeleteBooksComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'create-book',
    component: CreateBooksComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
