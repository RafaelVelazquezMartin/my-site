import { Component, OnInit, Inject, Input } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { DialogData } from "../projects/project-edit/project-edit.component";

@Component({
  selector: "app-tech-dialog",
  templateUrl: "./tech-dialog.component.html",
  styleUrls: ["./tech-dialog.component.css"]
})
export class TechDialogComponent implements OnInit {
  fileUrl: string;
  isDataAvailable: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<TechDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {}

  onNoClick() {
    this.dialogRef.close();
  }

  fileChangeEvent(fileInput) {
    let file = fileInput.target.files[0];

    if (file) {
      this.data.logo = file;
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.fileUrl = event.target.result;
        this.isDataAvailable = true;
      };
      reader.readAsDataURL(file);
    }
  }
}
