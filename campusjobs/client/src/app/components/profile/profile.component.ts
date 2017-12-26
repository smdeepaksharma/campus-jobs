import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user : any;
  

  constructor(private authService : AuthService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getProfile();
  }

  private getProfile(){
    console.log("Inside get Profile");
    this.user = this.authService.getUserData();
    //var exp = JSON.parse(this.user.experience);
    //var edu = JSON.parse(this.user.education);
    //var sk = JSON.parse(this.user.skills)
    //this.user.education = edu;
    //this.user.experience = exp;
    //this.user.skills = sk;
    //console.log(exp);
    console.log(this.user);

   // this.authService.getProfile().subscribe(profile => {
   //     this.user = profile.user;
    //    console.log(profile.user);
    //});
  }

}
