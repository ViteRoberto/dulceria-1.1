import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Pinata {
  categoria: string;
  foto: string;
  nombre: string;
  precio: number;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private pinatasColeccion: AngularFirestoreCollection<Pinata>;
  private pinatas: Observable<Pinata[]>;

  constructor(db: AngularFirestore) { 
    this.pinatasColeccion = db.collection<Pinata>('pinatas');
    this.pinatas = this.pinatasColeccion.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data};
        });
      })
    );
   }

   getPinatas(){
      return this.pinatas;
   }
}
