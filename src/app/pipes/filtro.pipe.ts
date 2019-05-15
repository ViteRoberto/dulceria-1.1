import { Pipe, PipeTransform } from '@angular/core';
import { Pinata } from '../service/crud.service';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(pinatas: Pinata[], texto: string): Pinata[] {
    if( texto.length === 0){ return pinatas; }
    
    texto = texto.toLocaleLowerCase();
    
    return pinatas.filter( pinata => {
      return pinata.nombre.toLocaleLowerCase().includes(texto);
    });
  }

}
