import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { GoogleMapsComponent } from './google-maps.component';


@NgModule({
  declarations: [
    GoogleMapsComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ], exports: [
    GoogleMapsComponent
  ]
})
export class GoogleMapsModule { }
