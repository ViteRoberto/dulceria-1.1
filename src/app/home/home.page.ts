import { Component, OnInit, ViewChild } from '@angular/core';
import { Pinata, CrudService } from '../service/crud.service';

import { PickerController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  
  pinatas: Pinata[] = [];
  textoBuscar = '';

  sliderConfig = {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 1.4
  }

  constructor(private crud: CrudService, private pickerCtrl: PickerController){}

  buscarPinata(event){
    const texto = event.target.value;
    this.textoBuscar = texto;
    console.log(texto);
  }

  async seleccionarCategorias(){
    const picker = await this.pickerCtrl.create({
      buttons: [{
        text: 'listo'
      }],
      columns: [{
        name: 'CATEGORIA',
        options: [
          {
            text: '1',
            value: 1
          },
          {
            text: '2',
            value: 2
          }
        ]
      }]
    });
    await picker.present();
  }

  ngOnInit(){
    this.crud.getPinatas().subscribe(lista => {
      this.pinatas = lista;
    })
  }
}
