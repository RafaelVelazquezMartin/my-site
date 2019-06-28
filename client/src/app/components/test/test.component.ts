import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.css"]
})
export class TestComponent implements OnInit {
  public ckeditorContent: string;
  constructor() {
    this.ckeditorContent = `<p>Greetings from CKEditor...</p>`;
  }

  ngOnInit() {}
}
