import {Component, OnInit} from "@angular/core";
import { BeerService } from "./beer.service";
import {Subject} from "rxjs";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit{
  beers: any;
  searchTerm$ = new Subject<string>();

  constructor(private beerService: BeerService) {
    this.beerService.search(this.searchTerm$)
      .subscribe(data => {
        console.log(data);
        this.beers = data;
      });
  }

  ngOnInit(): void {
    this.beerService.getBeers().subscribe(results => this.beers = results);
  }
}
