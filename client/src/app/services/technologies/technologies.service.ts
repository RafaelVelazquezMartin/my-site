import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Technology } from "../../shared/Technology";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TechnologiesService {
  constructor(private http: HttpClient) {}

  getTechnologies(): Observable<Technology[]> {
    return this.http
      .get<Technology[]>("http://localhost:3000/technologies")
      .pipe(map(response => response["technologies"]));
  }

  createTechnology(newTech: Technology) {
    return this.http.post("http://localhost:3000/technologies", newTech);
  }
}
