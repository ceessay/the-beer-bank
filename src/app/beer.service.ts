import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class BeerService {
  API_URL = "https://api.punkapi.com/v2/beers?page=1&per_page=10";

  constructor(private http: HttpClient) {}

  getBeers() {
    return this.http.get<[Object]>(this.API_URL);
  }
}
