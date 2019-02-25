import { Component, OnInit } from "@angular/core";
import { BeerService } from "./beer.service";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "the-beer-bank";
  showFavs: boolean = false;
  term: string;

  constructor(private beerService: BeerService) {}

  ngOnInit() {

  }

  search(term: string) {
    this.term = term;
  }
}
