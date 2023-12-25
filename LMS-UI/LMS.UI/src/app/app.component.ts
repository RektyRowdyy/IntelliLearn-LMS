import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'LMS.UI';
  intelliLearn: string = "";
  
  constructor(public userService: UsersService) {
  }

  ngOnInit(): void {    
  }

  //Dynamically set the nav-brand routing
  loadIntellilearn():string {
    this.intelliLearn = this.userService.isLoggedIn()? "/dashboard" : "/login";
    return this.intelliLearn;
  }

  logOut() {
    this.userService.deleteToken();
  }
}
