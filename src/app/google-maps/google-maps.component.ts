import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, Inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GoogleMapsService } from './google-maps.service';
import { Geolocation } from '@capacitor/geolocation';

declare var google: any;

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent implements OnInit {

  @Input() position = {
    lat: -2.898116,
    lng: -78.9995811499999999
  };

  prueba = {
    lat: -2.898116,
    lng: -78.9995811499999999
  };

  label = {
    titulo: 'Ubicacion',
    subTitulo: 'Mi Ubicacion de envio'
  };

  map: any;
  marker: any;
  infoWindow: any;
  positionSet: any;

  @ViewChild('map') divMap: ElementRef;

  constructor(
    private renderer: Renderer2,
    private googleMapsService: GoogleMapsService,
    public modalController: ModalController,
    @Inject(DOCUMENT) private document
  ) { }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.googleMapsService.init(this.renderer, this.document).then(() => {
      this.initMap();
    }).catch((err) => {
      console.log(err);
    });
  }

  initMap() {
    const position = this.prueba;
    let latLng = new google.maps.LatLng(position.lat, position.lng);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      disableDefaultUI: true,
      clickableIcons: true,
    };
    this.map = new google.maps.Map(this.divMap.nativeElement, mapOptions);
    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      draggable: false,
    });
    //marker2
    
    this.clickHandleEvent();//Click Nueva Position
    this.infoWindow = new google.maps.InfoWindow();
    this.addMarker(position);
    this.setInfoWindow(this.marker, this.label.titulo, this.label.subTitulo);
  }

  clickHandleEvent() {
    this.map.addListener('click', (event: any) => {
      const position = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      this.addMarker(position);
    });
  }

  addMarker(position: any): void{
    let latLng = new google.maps.LatLng(position.lat, position.lng);
    this.marker.setPosition(latLng);
    //Centrar
    this.map.panTo(position);
    this.positionSet = position;
  }

  setInfoWindow(marker: any, titulo: any, subtitulo: any) {
    const contentString =
      '<div id="contentInsideMap">' +
      '<div>' + '</div>' +
      '<p style="font-weight: bold; margin-bottom: 5px;">' + titulo + '</p>' +
      '<div id="bodyContent">' +
      '<p class"normal m-8">' + subtitulo + '</p>' +
      '</div>' + '</div>';
    this.infoWindow.setContent(contentString);
    this.infoWindow.open(this.map, marker);
  }

  async mylocation() {
    console.log('Mi Ubicacion() click')
    Geolocation.getCurrentPosition().then((res) => {
      console. log('Mi Ubicacion() get', res);
      const position = {
        lat: res.coords.latitude,
        lng: res.coords.longitude
      }
      this.addMarker(position);
    })
  }

  aceptar(): void {
    console.log('click aceptar -> ', this.positionSet);
    this.modalController.dismiss({ pos: this.positionSet })
  }

}
