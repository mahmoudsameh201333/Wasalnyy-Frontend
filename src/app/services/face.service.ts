import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class FaceService {
 baseUrl=`${environment.apiUrl}/auth`;
  constructor(private http: HttpClient) {}
  // face.service.ts (methods)
uploadDriverFace(userId: string, file: File) {
  const fd = new FormData();
  fd.append("DriverId", userId);
  fd.append("FaceImage", file, file.name);

  // DEBUG → verify the browser actually has the data
  console.log("DriverId:", fd.get("DriverId"));
  console.log("FaceImage:", fd.get("FaceImage"));

  return this.http.post(
    `${this.baseUrl}/register/driver-face`,
    fd
  );
}

loginWithFace(file: File) {
  const fd = new FormData();
  fd.append('FaceImage', file);
  return this.http.post(`${this.baseUrl}/login/driver-face`, fd);
}
  
}
