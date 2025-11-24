import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TripInfoService {
  trip: any = null;
  listofAvailableTrips: any[] = [];
  driver: any = null;
  Intrip: boolean = false;

  updateTrip(tripData: any) {
    this.trip = tripData;
    console.log("Trip data updated:", this.trip);
  }
  updateDriver(driverData: any) {
    this.driver = driverData;
    console.log("Driver data updated:", this.driver);
  }
  clearTrip() {
    this.trip = null;
  }
  clearDriver() {
    this.driver = null;
  }
  setInTrip(status: boolean) {
    this.Intrip = status;
    console.log("InTrip status updated:", this.Intrip);
  }
  getTrip() {
    return this.trip;
  }
  getDriver() {
    return this.driver;
  }
  isInTrip() {
    return this.Intrip;
  }
  getListOfAvailableTrips() {
    return this.listofAvailableTrips;
  }
  updateListOfAvailableTrips(trip: any) {
    this.listofAvailableTrips.push(trip);
    console.log("Available trips updated:", this.listofAvailableTrips);
  }
  clearListOfAvailableTrips() {
    this.listofAvailableTrips = [];
  }
}