import { Component, OnInit } from "@angular/core";
import { BeerService } from "./beer.service";
import { Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "the-beer-bank";
  showFavs: boolean = false;

  beers$: Observable<any>;
  private searchTerms = new Subject<string>();

  constructor(private beerService: BeerService) {}

  ngOnInit() {
    this.beers$ = this.searchTerms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((term: string) => this.beerService.searchBeers(term))
    );
  }

  search(term: string) {
    console.log("search event .....");
    this.searchTerms.next(term);
  }
}
