import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  type:string = "password"; 
  isText:boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;
  responseMsg: string = "";

  constructor(private fb: FormBuilder, private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    //Validations for Form
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required] 
    })
  }

  //Password Visibilty [Eye Icon]
  hideShowPass() {
    this.isText = !this.isText;
    this.isText? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  //Validation Check for Email and Pass
  isInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  //onSubmit 
  login() {
    
    let loginInfo = {
      Email: this.loginForm.get('email')?.value,
      Password: this.loginForm.get('password')?.value
    }

    this.userService.AuthenticateUser(loginInfo.Email,loginInfo.Password)
    .subscribe({
      next: (response: any) => {
        this.responseMsg = response.message.toString();
        this.userService.saveToken(response.token.toString());
        alert(this.responseMsg);
        
        this.router.navigate(['/dashboard']);  
      },
      error: (err: any) => {
        console.log('Error: ');
        console.log(err);
        alert(err);
      },
    });
  }
}
