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

  items = [
    { nombre: 'Juan Perez', edad: '69', bodyT:'28', oxygenS:'97', heartR:'60'},
    { nombre: 'John Cena', edad: '65', bodyT:'29', oxygenS:'97', heartR:'61'},
    { nombre: 'Juana Lopez', edad: '72', bodyT:'30', oxygenS:'97', heartR:'62'}
  ];

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

  viewItem(item: any): void{
    console.log(item);
  }

}
