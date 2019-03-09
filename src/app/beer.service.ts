import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
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
      switchMap(term => this.searchEntries(term))
    );
  }

  searchEntries(term) {
    const searchTerm = term.replace(" ", "_");
    console.log(`searchTerm = ${searchTerm}`);
    const url = (searchTerm !== undefined || searchTerm !== "") ? `${this.API_URL}?beer_name=${searchTerm}` : `${this.API_URL}`;
    console.log(`url = ${url}`);
    return this.http.get(url).pipe(map(res => res));
  }

  searchBeers(term: string): Observable<any> {
    // console.log("searchBeers...", term);

    if (!term.trim()) { return of([]); }

    const url = `${this.API_URL}?beer_name=${term.replace(" ", "_")}`;
    return this.http
      .get<[any]>(url)
      .pipe(tap(_ => console.log(`found heroes matching "${term}"`)));
  }

  /*searchBeers(term: string) {
    console.log("search event with term ", term);
    const url = `${this.API_URL}?beer_name=${term.replace(" ", "_")}`;
    console.log("url => ", url);
    return this.http.get(url).pipe(map(res => res));
  }*/

}
