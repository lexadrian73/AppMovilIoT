import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GoogleMapsComponent } from 'src/app/google-maps/google-maps.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  cliente: any = {
    ubicacion: ''
  }

  constructor(
    private modalController: ModalController
  ) {}

  async addDirection() {
    const ubicacion = this.cliente.ubicacion
    let position = {
      lat: -2.898116,
      lng: -78.99958149999999
    };
    if (ubicacion !== null) {
      position = ubicacion;
    }
    const modalAdd = await this.modalController.create({
      component: GoogleMapsComponent,
      mode: 'ios',
      swipeToClose: true,
      componentProps: {position}
    });
    await modalAdd.present();
    const {data} = await modalAdd.onWillDismiss();
    if (data) {
      console. log('data -> ', data);
      this.cliente.ubicacion = data.pos;
      console.log('this.cliente -> ', this.cliente);
    }
  }

}
