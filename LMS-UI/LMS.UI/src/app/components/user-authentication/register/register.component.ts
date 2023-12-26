import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user-model';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']

})

export class RegisterComponent implements OnInit {

  type:string = "password";
  isText:boolean = false;
  eyeIcon: string = "fa-eye-slash";
  registerForm!: FormGroup;
  responseMsg: string = '';

  constructor(private fb: FormBuilder, private userService: UsersService, private router: Router) {}

  ngOnInit(): void {

    //Form Validator
    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required,Validators.email]],
        password: ['', Validators.required],
        rePassword: ['', Validators.required] 
      });
  }

  //Password Visibilty [Eye Icon]
  hideShowPass() {
    this.isText = !this.isText;
    this.isText? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  //Validation check for fields
  isInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  //Custom Password Validator
  isPasswordInvalid(controlName: string): boolean {
    const passwordControl = this.registerForm.get(controlName);
  
    if (!passwordControl || !passwordControl.touched) {
      return false;
    }
  
    const passwordValue = passwordControl.value;
    const isLengthValid = passwordValue.length >= 6 && passwordValue.length <= 15;
    const hasCapitalLetter = /[A-Z]/.test(passwordValue);
    const hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(passwordValue);
    const hasNumericCharacter = /\d/.test(passwordValue);
        
    return !isLengthValid || !hasCapitalLetter || !hasSpecialCharacter || !hasNumericCharacter;
  }

  //Custom Validation for Re-type Password
  arePasswordsMatching(): boolean {
    const passwordControl = this.registerForm.get('password');
    const rePasswordControl = this.registerForm.get('rePassword');
  
    if (!passwordControl || !rePasswordControl) {
      return false;
    }
  
    return passwordControl.value === rePasswordControl.value;
  }
  
  
  //OnSubmit
  register() {
    let user: User = {
      Id: 0,
      FirstName: this.registerForm.get('firstName')?.value,
      LastName: this.registerForm.get('lastName')?.value,
      Email: this.registerForm.get('email')?.value,
      Password: this.registerForm.get('password')?.value
    };

    this.userService.AddUser(user)
    .subscribe({
      next: (user: any) => {
        this.responseMsg = user.toString();
        alert(this.responseMsg);
        if(this.responseMsg == "Account Registered Succesfully")
          this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.log('Error: ');
        console.log(err);
        alert(err);
      },
    });
  }

}
