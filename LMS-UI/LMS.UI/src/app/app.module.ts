import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewBooksComponent } from './components/books/view-books/view-books.component';
import { LoginComponent } from './components/user-authentication/login/login.component';
import { RegisterComponent } from './components/user-authentication/register/register.component';
import { DashboardComponent } from './components/books/dashboard/dashboard.component';
import { JwtModule } from '@auth0/angular-jwt';
import { BookDetailsModalComponent } from './components/books/view-books/book-details-modal/book-details-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeleteBooksComponent } from './components/books/delete-books/delete-books.component';
import { CreateBooksComponent } from './components/books/create-books/create-books.component';
import { DeleteConfirmationModalComponent } from './components/books/delete-books/delete-confirmation-modal/delete-confirmation-modal.component';
import { ViewImageModalComponent } from './components/books/create-books/view-image-modal/view-image-modal.component';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';

@NgModule({
  declarations: [
    AppComponent,
    ViewBooksComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    BookDetailsModalComponent,
    DeleteBooksComponent,
    CreateBooksComponent,
    DeleteConfirmationModalComponent,
    ViewImageModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        allowedDomains: ['localhost:7097'],
      },
    }),
    NgbModule,
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
