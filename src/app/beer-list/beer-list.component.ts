import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  SimpleChange
} from "@angular/core";
import { BeerService } from "../beer.service";

import { Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

@Component({
  selector: "app-beer-list",
  templateUrl: "./beer-list.component.html",
  styleUrls: ["./beer-list.component.css"]
})
export class BeerListComponent implements OnInit {
  @Input() beers: any;
  favourites: Array<any>;

  ngOnInit(): void {
    const favs = localStorage.getItem("favs");
    this.favourites = JSON.parse(favs ? favs : "[]");
  }

  /*beers: Array<any>;
  allBeers: Array<any>;
  similarBeers: Array<any> = [];
  favourites: Array<any>;
  isModalActive = false;
  selectedBeer = null;
  beers$: Observable<any>;

  private searchTerms = new Subject<string>();

  constructor(private beerService: BeerService) {}

  @Input() showFavs: boolean;
  @Input() searchTerm: string;
  @Input() term: string;

  ngOnChanges(changes: SimpleChanges) {
    // console.log("onchanges", changes);
    if (changes.showFavs) {
      this.toggleShowFavs();
    }

    if (changes.term) {
      this.search(changes.term.currentValue);
    }
  }

  ngOnInit() {
    this.beerService.getBeers().subscribe(beers => {
      this.beers = beers;
      this.allBeers = beers;
    });
    let favs = localStorage.getItem("favs");
    this.favourites = JSON.parse(favs ? favs : "[]");

    this.beers$ = this.searchTerms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((term: string) => this.beerService.searchBeers(term))
    );
  }

  search(term: string) {
    console.log("search event .....", term);
    this.searchTerms.next(term);
  }

  toggleModal(beer: any = null) {
    if (beer) {
      this.selectedBeer = beer;
      this.similarBeers = this.getSimilarsBeers();
    } else {
      this.selectedBeer = null;
      this.similarBeers = [];
    }
    console.log("Selected beer = ", this.similarBeers);
  }

  toggleFavourite(beerId: number) {
    if (this.favourites.includes(beerId)) {
      this.favourites = this.favourites.filter(id => id !== beerId);
    } else {
      this.favourites.push(beerId);
    }
    localStorage.setItem("favs", JSON.stringify(this.favourites));

    this.toggleShowFavs();

    console.log("favourites", this.favourites);
  }

  toggleShowFavs() {
    if (this.showFavs) {
      this.beers = <[Object]>(
        this.allBeers.filter(beer => this.favourites.includes(beer.id))
      );
    } else {
      this.beers = this.allBeers;
    }
  }

  getSimilarsBeers() {
    let similarBeers = [];
    while (similarBeers.length < 3) {
      let item = this.beers[Math.floor(Math.random() * this.beers.length)];
      if (!similarBeers.includes(item)) {
        similarBeers.push(item);
      }
    }
    return similarBeers;
  }
  */
}
