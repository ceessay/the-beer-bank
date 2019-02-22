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
  searchResults: any;
  private searchTerms$ = new Subject<string>();

  constructor(private beerService: BeerService) {}

  ngOnInit() {
    /*this.searchResults$ = this.searchTerms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((term: string) => {
        const res = this.beerService.searchBeers(term);
        res.subscribe(beers => console.log("term", this.searchResults$));
        return res;
      })
    );*/
  }

  search(term: string): void {
    console.log("search event .....");
    this.beerService.searchBeers(term).subscribe(res => {
      console.log(res);
    });
    // this.searchTerms.next(term);
  }
}
