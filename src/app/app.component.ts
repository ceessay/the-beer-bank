import {Component, OnInit} from "@angular/core";
import { BeerService } from "./beer.service";
import {Subject} from "rxjs";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit{
  title = "the-beer-bank";
  // showFavs: boolean = false;
  // term: string;
  beers: any;
  searchTerm$ = new Subject<string>();
  favourites: Array<any>;

  constructor(private beerService: BeerService) {
    this.beerService.search(this.searchTerm$)
      .subscribe(data => {
        console.log(data);
        this.beers = data;
      });
  }

  ngOnInit(): void {
    this.beerService.getBeers().subscribe(results => this.beers = results);
    const favs = localStorage.getItem("favs");
    this.favourites = JSON.parse(favs ? favs : "[]");
  }
}
