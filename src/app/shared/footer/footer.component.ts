import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireList, AngularFireDatabase, AngularFireAction } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  itemVenta: Observable<any>;
  itemsProductosRef: AngularFireList<any>;
  itemsProductos: Observable<any[]>;
  itemsDestacados: Observable<any[]>;
  resultados = 0;
  criterioBusqueda: string;
  productos: Observable<any[]>;



  constructor(private firebaseDB: AngularFireDatabase) {
    this.productos = firebaseDB.list('paginas/inicio/productos').snapshotChanges();

   }

  ngOnInit() {
    this.getInfo();
    this.getDestacados();
  }

  getInfo() {
    this.itemsProductos = this.firebaseDB.list('/productos',
    ref => ref.orderByChild('descuentoPromocion').startAt(1).limitToFirst(12)).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({

          key: c.payload.key, ...c.payload.val() }))
      )
    );

// subscribe to changes
this.itemsProductos.subscribe(queriedItems => {
this.resultados = queriedItems.length;
});
    // trigger the query
// this.size$.next();

  }

  getDestacados() {
    this.itemsDestacados = this.firebaseDB.list('paginas/inicio/productos',
    ref => ref.limitToFirst(5)).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({

          key: c.payload.key, ...c.payload.val() }))
      )
    );

// subscribe to changes
this.itemsDestacados.subscribe(queriedItems => {
this.resultados = queriedItems.length;
});


  }
}
