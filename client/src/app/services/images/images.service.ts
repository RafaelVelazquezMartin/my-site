import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Image } from "../../shared/Image";

@Injectable({
  providedIn: "root"
})
export class ImagesService {
  constructor(private http: HttpClient) {}

  uploadImages(image: FormData): Observable<Image[]> {
    return this.http
      .post("http://localhost:3000/images/upload", image)
      .pipe(map(response => response["uploadedImgs"]));
  }

  deleteImage(imageId: string) {
    return this.http.delete("http://localhost:3000/images/" + imageId);
  }
}
