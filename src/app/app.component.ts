import { Component } from "@angular/core";
import { BeerService } from "./beer.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "the-beer-bank";
  showFavs: boolean = false;

  constructor(private beerService: BeerService) {}

  ngOnInit() {}
}
