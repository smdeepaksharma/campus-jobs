import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ValidationService} from '../../service/validation.service'
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup; 
  errorMessage : boolean = false;
  constructor(private formBuilder : FormBuilder, private authService : AuthService,
  private router : Router) { 
    this.loginForm = this.formBuilder.group({
      'emailId' : ['', [Validators.required, ValidationService.emailValidator]],
      'password' : ['', [Validators.required, ValidationService.passwordValidator]]
    });
  }

  ngOnInit() {
  }

  onLoginSubmit(){
    if(this.loginForm.dirty && this.loginForm.valid){
      let credentials = this.loginForm.value;
      console.log(credentials);
      this.authService.authenticateUser(credentials).subscribe(result => {
       if(result.success){
          this.authService.storeUserData(result.token, result.currentuser);
          this.errorMessage = false;
          //this.flashMessage.show('Logged In successfully!', {cssClass : 'alert-success', timeout : 3000});
          this.router.navigate(['/home']);
        }else {
          //this.flashMessage.show(result.msg, {cssClass : 'alert-danger', timeout : 3000});
          this.errorMessage = true;
          this.router.navigate(['login']);
          
        }
      })

    }
  }
}
