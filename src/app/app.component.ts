import { Component } from "@angular/core";
import { BeerService } from "./beer.service";
import { Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "the-beer-bank";
  showFavs: boolean = false;
  searchResults$: Observable<any>;
  private searchTerms = new Subject<string>();

  constructor(private beerService: BeerService) {}

  ngOnInit() {
    this.searchResults$ = this.searchTerms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((term: string) => {
        let res = this.beerService.searchBeers(term);
        res.subscribe(beers => console.log("term", this.searchResults$));
      })
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
