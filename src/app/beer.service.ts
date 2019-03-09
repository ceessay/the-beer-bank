import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class BeerService {
  API_URL = "https://api.punkapi.com/v2/beers";

  constructor(private http: HttpClient) {}

  getBeers() {
    return this.http.get<[any]>(this.API_URL);
  }

  search(terms: Observable<string>) {
    return terms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => this.searchBeers(term))
    );
  }

  searchBeers(term: string): Observable<any> {
    const url = !!term ? `${this.API_URL}?beer_name=${term.replace(" ", "_")}` : `${this.API_URL}`;
    console.log(`url = ${url}`);
    return this.http.get(url).pipe(map(res => res));
  }

}
