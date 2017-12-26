import { Component, OnInit , Inject} from '@angular/core';

import {MatDialog, 
  MatDialogRef, 
  MAT_DIALOG_DATA, 
  MatDialogContent, 
  MatDialogActions,
MatDialogClose} from '@angular/material';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  school: string;
  startDate: string;
  endDate: string;
  major: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(EdicationContentDialog, {
      width: '600px',
      data: { school: this.school, major: this.major }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'edit-education-content.html',
})
export class EdicationContentDialog {

  constructor(
    public dialogRef: MatDialogRef<EdicationContentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


