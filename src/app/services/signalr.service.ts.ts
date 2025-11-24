import { Injectable, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { AuthService } from '../auth/auth-service';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { TripInfoService } from './trip-info.service';

@Injectable({
  providedIn: 'root',
})
export class SignalrServiceTs {
  hubUrl: string = environment.hubUrl;
  userRole:string="";
  private hubConnection!: signalR.HubConnection;
  public connectionStarted = false;
  public pendingTripSubject = new BehaviorSubject<any>(null);
  constructor(private authService: AuthService,private tripInfoService:TripInfoService) {
    this.userRole=this.authService.getRole()!;
   }
  
  startConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
     if (this.connectionStarted) {
      return resolve();
     }

      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(this.hubUrl, {
          accessTokenFactory: () => this.authService.getToken()!,
          transport: signalR.HttpTransportType.LongPolling
        })
        .withAutomaticReconnect()
        .build();

      this.hubConnection
        .start()
        .then(() => {

          
          console.log('SignalR Connected');
          this.connectionStarted = true;
          
          
          this.hubConnection.on("pendingTrip", (trip) => {
            this.tripInfoService.updateTrip(trip);
            this.tripInfoService.setInTrip(true);
          });
          this.hubConnection.on('tripStarted', trip => this.tripInfoService.updateTrip(trip));
          this.hubConnection.on('tripEnded', () =>{
            this.tripInfoService.clearTrip();
            this.tripInfoService.setInTrip(false);
            this.tripInfoService.clearDriver();
            this.tripInfoService.clearListOfAvailableTrips();
          });      
          if(this.userRole==="Rider"){
          this. hubConnection.on('tripAccepeted', driver=> this.tripInfoService.updateDriver(driver));
          }
          else if(this.userRole==="Driver"){
         this.hubConnection.on("availableTripsInZone", (trip) =>this.tripInfoService.updateListOfAvailableTrips(trip));
         this.hubConnection.on("tripAccepeted", (trip) => {
          this.tripInfoService.updateTrip(trip)
          this.tripInfoService.setInTrip(true);
         });
          }
          
          
          
          
          
        
        
        
        
        
        
        
        
        
        
        
        
          resolve();
        })
        .catch((err) => {
          console.error('Error while starting SignalR:', err);
          reject(err);
        });
    });
  }
  // getHubConnection(): signalR.HubConnection {
  // return this.hubConnection;
  // }

  endConnection(): Promise<void> {
     return new Promise((resolve, reject) => {
          if (this.hubConnection) {
      this.hubConnection
        .stop()
        .then(() =>{ 
          console.log('SignalR Disconnected');
          this.connectionStarted = false;
          resolve();
        }
      
      )
        .catch((err) => {
          console.log('Error while disconnecting SignalR:', err); 
          reject(err);
        });
    }


     })

  }
}
