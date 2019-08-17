import { Component, OnInit } from "@angular/core";
import { ChartDataSets, ChartOptions } from "chart.js";
import { Color, Label } from "ng2-charts";
import { DashboardService } from "./dashboard.service";
import _ from "lodash";
import { subHours, isAfter, getDay } from "date-fns";
import { elementAt } from "rxjs/operators";

const CITY1 = "Foster Weather Station";
const CITY2 = "Oak Street Weather Station";
@Component({
  selector: "ngx-dashboard",
  templateUrl: "./dashboard.component.html"
})
export class DashboardComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [
    { data: [], label: "Foster Weather Station" },
    { data: [], label: "Oak Street Weather Station" }
  ];

  public lineChartLabel: Label[] = [];

  public lineChartOptions: ChartOptions = {
    responsive: true
  };

  public lineChartColors: Color[] = [
    {
      borderColor: "black",
      backgroundColor: "rgba(255, 0, 0, 0.3)"
    },
    {
      borderColor: "blue",
      backgroundColor: "rgba(0,255,255, 0.3)"
    }
  ];

  public lineChartLegend = true;
  public lineChartType = "line";
  public lineChartPlugins = [];

  weather: any = [];
  requiredWeatherDetails: any = [];
  lastSixHours: any = [];
  // currentDate = new Date().get
  currentTime = new Date();
  selected: string = "Air Temperature";
  city1: any = [];
  city2: any = [];
  humidity = {
    city1: [],
    city2: []
  };
  windSpeed = {
    city1: [],
    city2: []
  };
  airTemprature = {
    city1: [],
    city2: []
  };

  avgAirTemp = {
    city1: [],
    city2: []
  };

  constructor(private weatherService: DashboardService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    console.log("current time =", this.currentTime);
    this.getCityData();
  }

  getCityData() {
    console.log("City data called");
    this.weatherService.getAllCityData().subscribe(data => {
      // console.log("City Data Recived in component ==>", data);
      this.weather = data;
      this.filterData(this.weather);
    });
  }

  getlastSixHours(sortedData) {
    console.log("Sorted Data is ==> ", sortedData);
    let lastDataTime = sortedData[0].measurement_timestamp;

    let requiredTime = subHours(lastDataTime, 6);
    console.log("Required Time ===>", requiredTime);

    for (let i = 0; i < sortedData.length; i++) {
      if (
        isAfter(new Date(sortedData[i].measurement_timestamp), requiredTime)
      ) {
        if (sortedData[i].station_name == CITY1) {
          // console.log(new Date(sortedData[i].measurement_timestamp));
          this.city1.push(sortedData[i]);
          this.humidity.city1.push(sortedData[i].humidity);
          this.airTemprature.city1.push(sortedData[i].air_temperature);
          this.windSpeed.city1.push(sortedData[i].wind_speed);
          this.lineChartData[0].data = this.airTemprature.city1;
        }
        if (sortedData[i].station_name == CITY2) {
          this.city2.push(sortedData[i]);
          this.humidity.city2.push(sortedData[i].humidity);
          this.airTemprature.city2.push(sortedData[i].air_temperature);
          this.windSpeed.city2.push(sortedData[i].wind_speed);
          this.lineChartData[1].data = this.airTemprature.city2;
        }

        console.log("Data  humidity ==>", this.humidity);
        console.log("Data  airTemprature ===>", this.airTemprature);
        console.log("Data  windSpeed ===>", this.windSpeed);
        let index = _.indexOf(
          this.lineChartLabel,
          sortedData[i].measurement_timestamp_label
        );

        if (index == -1) {
          this.lineChartLabel.push(sortedData[i].measurement_timestamp_label);
        }
      }
    }
  }

  filterData(allweather) {
    allweather.forEach(element => {
      if (element.station_name == CITY1) {
        this.requiredWeatherDetails.push(element);
      }
      if (element.station_name == CITY2) {
        this.requiredWeatherDetails.push(element);
      }
    });
    this.getlastSixHours(this.requiredWeatherDetails);
  }

  changeDataSet(event) {
    console.log(event);
    if (event == "Air Temperature") {
      this.lineChartData[0].data = this.airTemprature.city1;
      this.lineChartData[1].data = this.airTemprature.city2;
    }
    if (event == "Humidity") {
      this.lineChartData[0].data = this.humidity.city1;
      this.lineChartData[1].data = this.humidity.city2;
    }
    if (event == "Wind Speed") {
      this.lineChartData[0].data = this.windSpeed.city1;
      this.lineChartData[1].data = this.windSpeed.city2;
    }
  }
}
