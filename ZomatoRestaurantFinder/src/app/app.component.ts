import { Component } from "@angular/core";
import { DataserviceService } from "./services/dataservice.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "ZomatoRestaurantFinder";
  queryParams: string = "";
  restaurantList = [];
  sortarr = ["One", "Two", "Three", "Four", "Five", "Six"];

  constructor(private ser: DataserviceService) {}

  //checks for keywords in searchbox
  chkSearchBox(event) {
    this.queryParams = this.queryParams + "&q=" + event;
    this.getListOfRestaurants(this.queryParams);
  }

  //pagination data display logic
  setPage(index: number) {
    this.queryParams = this.queryParams + "&start=" + index;
    this.getListOfRestaurants(this.queryParams);
  }
//getting data on page load
  ngOnInit() {
    this.getListOfRestaurants(this.queryParams);
  }
//setting the selected filter color and fetching results from api hit
  setcolor(id: string, value: string) {
    for (let i of this.sortarr) {
      if (i == id) {
        //console.log("hiya");
        document.getElementById(id).style.color = "green";
        this.queryParams = "";
        switch (value) {
          case "Popularity-asc": {
           // console.log(1);
            this.queryParams = "&sort=real_distance&order=asc";
            this.getListOfRestaurants(this.queryParams);
            break;
          }
          case "Popularity-desc": {
           // console.log(2);
            this.queryParams = "&sort=real_distance&order=desc";
            this.getListOfRestaurants(this.queryParams);
            break;
          }
          case "cft-desc": {
            this.queryParams = "&sort=cost&order=desc";
            this.getListOfRestaurants(this.queryParams);
            break;
          }
          case "cft-asc": {
            this.queryParams = "&sort=cost&order=asc";
            this.getListOfRestaurants(this.queryParams);
            break;
          }
          case "rating-desc": {
            this.queryParams = "&sort=rating&order=desc";
            this.getListOfRestaurants(this.queryParams);
            break;
          }
          case "rating-asc": {
            this.queryParams = "&sort=rating&order=asc";
            this.getListOfRestaurants(this.queryParams);
            break;
          }
        }
      } else {
        document.getElementById(i).style.color = "grey";
      }
    }
    
  }
//to get list of restaurants from service
  getListOfRestaurants(qryparam) {
    this.ser.getData(qryparam).subscribe(
      data => {
        this.restaurantList = data["restaurants"];
      },
      err => console.log(err)
    );
  }
}
