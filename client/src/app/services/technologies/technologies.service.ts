import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Technology } from "../../shared/Technology";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TechnologiesService {
  constructor(private http: HttpClient) { }

  getTechnologies(): Observable<Technology[]> {
    return this.http
      .get<Technology[]>("https://cors-anywhere.herokuapp.com/http://35.222.61.88/technologies")
      .pipe(map(response => response["technologies"]));
  }

  createTechnology(newTech: Technology) {
    return this.http.post("https://cors-anywhere.herokuapp.com/http://35.222.61.88/technologies", newTech);
  }
}
