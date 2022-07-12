import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GoogleMapsComponent } from 'src/app/google-maps/google-maps.component';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  cliente: any = {
    ubicacion: ''
  }
  
  ngOnInit() {
    console.log('Initializing HomePage');

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      alert('Push registration success, token: ' + token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      },
    );
  }

  items = [
    { nombre: 'Juan Perez', edad: '69', bodyT:'28', oxygenS:'97', heartR:'60', lat:-2.898116, lng:-78.99958149999999},
    { nombre: 'John Cena', edad: '65', bodyT:'29', oxygenS:'97', heartR:'61', lat:-0.222540, lng: -78.511532},
    { nombre: 'Juana Lopez', edad: '72', bodyT:'30', oxygenS:'97', heartR:'62', lat:-0.2661637164355669, lng: -78.55332940083667}
  ];

  constructor(
    private modalController: ModalController,
  ) {}

  async addDirection(item: any) {
    const ubicacion = this.cliente.ubicacion
    let position = {
      lat: item.lat,
      lng: item.lng
    }
  
    /*if (ubicacion !== null) {
      position = ubicacion;
    }*/

    console.log(position)

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
