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

  chkSearchBox(event) {
    this.queryParams = this.queryParams + "&q=" + event;
    this.getListOfRestaurants(this.queryParams);
  }

  setPage(index: number) {
    this.queryParams = this.queryParams + "&start=" + index;
    this.getListOfRestaurants(this.queryParams);
  }

  ngOnInit() {
    this.getListOfRestaurants(this.queryParams);
  }

  setcolor(id: string, value: string) {
    for (let i of this.sortarr) {
      if (i == id) {
        console.log("hiya");
        document.getElementById(id).style.color = "green";
        this.queryParams = "";
        switch (value) {
          case "Popularity-asc": {
            console.log(1);
            this.queryParams = "&sort=real_distance&order=asc";
            this.getListOfRestaurants(this.queryParams);
            break;
          }
          case "Popularity-desc": {
            console.log(2);
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
    console.log(id, value);
  }

  // getrestaurantlist(qryparam)
  // {
  //   let url='https://developers.zomato.com/api/v2.1/search?entity_id=7&entity_type=city&q=test&start=1&count=100'+qryparam;
  //   console.log(url);
  //   const headers=new HttpHeaders({'Content-Type':'application/json','user-key':'0c92ea2bca09cf5fd1cef920e0d7651b'});
  //   return this.http.get(url,{headers:headers})

  // }

  getListOfRestaurants(qryparam) {
    this.ser.getData(qryparam).subscribe(
      data => {
        this.restaurantList = data["restaurants"];
      },
      err => console.log(err)
    );
  }
}
