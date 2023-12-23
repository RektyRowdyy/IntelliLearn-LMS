import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user-model';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient, private jwt: JwtHelperService) { }

  AddUser(addUserRequest: User): Observable<User> {
    return this.http.post<User>(this.baseApiUrl + '/api/UserAuthentication', addUserRequest, { responseType: 'text' as 'json' });
  }

  AuthenticateUser(email: string, password: string) : Observable<User> {
    return this.http.get<User>(this.baseApiUrl + '/api/UserAuthentication/', { params: {email,password}, responseType: 'json' });
  }

  saveToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }  

  deleteToken() {
    localStorage.removeItem('access_token');
    location.reload();
  }

  getTokenUserInfo(): User | null {
    if(!this.isLoggedIn()) {
      return null;
    } 
    let token = this.jwt.decodeToken();

    let user: User = {
      Id: Number(token.id),
      FirstName: token.firstName,
      LastName: token.lastName,
      Email: token.email,
      Password: ''
    };
    return user;
  }

}
