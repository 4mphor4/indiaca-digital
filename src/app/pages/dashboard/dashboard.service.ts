import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DashboardService {
  constructor(private http: HttpClient) {}
  getAllCityData() {
    console.log("Service Called");
    return this.http
      .get("https://data.cityofchicago.org/resource/k7hf-8y75.json")
      .pipe(
        map(data => {
          // console.log("Data ==>", data);
          return data;
        })
      );
  }

  // console.log("Get Weather Called");
  // return this.http
  //   .get("https://data.cityofchicago.org/resource/k7hf-8y75.json")
  //   .pipe(
  //     map(data => {
  //       console.log("Data Recived ==>", data);
  //       return data;
  //     })
  //   );
}
