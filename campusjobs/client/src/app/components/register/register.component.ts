import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {User} from '../../model/user';
import {ValidationService} from '../../service/validation.service'
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';

import {MatInputModule} from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    userForm: any;
  
  constructor(
    private formBuilder: FormBuilder,
    private authService : AuthService,
    private router : Router) {
      
    this.userForm = this.formBuilder.group({
      'firstName': ['', Validators.required],
      'lastName' : ['', Validators.required],
      'emailId': ['', [Validators.required, ValidationService.emailValidator]],
      'currentEmployment' : ['', Validators.required],
      'currentLocation' : ['', Validators.required],
      'password': ['', [Validators.required, ValidationService.passwordValidator]]
    });
  }
  
  saveUser() {
    if (this.userForm.dirty && this.userForm.valid) {
      console.log(this.userForm.value);
       this.authService.registerUser(this.userForm.value).subscribe(data => {
        if(data.success){
          //this.flashMessage.show('Succesfully Registered', {cssClass : 'alert-success', timeout : 3000});
          this.router.navigate(['/login']);
      }else {
        //this.flashMessage.show('Something went wrong', {cssClass : 'alert-danger', timeout : 3000});
          this.router.navigate(['/register']);
        }
    });
  }
    }
  
  ngOnInit() {}

}
