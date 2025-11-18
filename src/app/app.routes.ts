import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterDriverComponent } from './components/register/register';
import { RegisterRider } from './components/register-rider/register-rider';
import { ChooseRegisterComponent } from './components/reg-option/reg-option';
import { FaceScan } from './components/face-scan/face-scan';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: ChooseRegisterComponent },
  { path: 'register-driver', component: RegisterDriverComponent },
  { path: 'register-rider', component: RegisterRider },
  { path: 'face-scan/register/:userId', component: FaceScan },
  { path: 'face-scan/login', component: FaceScan },
];
