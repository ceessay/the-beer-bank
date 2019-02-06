import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  SimpleChange
} from "@angular/core";
import { BeerService } from "../beer.service";

@Component({
  selector: "app-beer-list",
  templateUrl: "./beer-list.component.html",
  styleUrls: ["./beer-list.component.css"]
})
export class BeerListComponent implements OnInit {
  beers: [Object];
  allBeers: [Object];
  similarBeers = [];
  favourites = [];
  isModalActive = false;
  selectedBeer = null;
  constructor(private beerService: BeerService) {}

  @Input()
  showFavs: boolean;

  ngOnChanges(changes: SimpleChanges) {
    console.log("onchanges", changes);
    // if (changes.showFavs.previousValue !== changes.showFavs.currentValue) {
    this.toggleShowFavs();
    // }
  }
  ngOnInit() {
    this.beerService.getBeers().subscribe(beers => {
      this.beers = beers;
      this.allBeers = beers;
    });
    let favs = localStorage.getItem("favs");
    this.favourites = JSON.parse(favs ? favs : "[]");
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
}
