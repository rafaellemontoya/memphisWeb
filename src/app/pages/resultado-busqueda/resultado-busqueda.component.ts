import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-resultado-busqueda',
  templateUrl: './resultado-busqueda.component.html',
  styleUrls: ['./resultado-busqueda.component.css']
})
export class ResultadoBusquedaComponent implements OnInit {
  itemVenta: Observable<any>;
  itemsProductosRef: AngularFireList<any>;
  itemsProductos: Observable<any[]>;
  resultados = 0;
  criterioBusqueda: string;
  cargando = true;
  resultadosVacio = false;
  constructor(private route: ActivatedRoute, private firebaseDB: AngularFireDatabase) {}

  ngOnInit() {
    this.route.params.subscribe( parametros => {

      this.criterioBusqueda = parametros.id;
      this.getInfo(parametros.id);
    });
  }

  getInfo(params) {

    this.resultadosVacio = false;
    const first: string = params.toUpperCase();

    this.itemsProductos = this.firebaseDB.list('/productos',
            ref => ref.orderByChild('precioPublico')).snapshotChanges().pipe(
              map(changes =>
                changes.map(c => ({

                  key: c.payload.key, ...c.payload.val() }))
                  .filter( (item: any) => item.nombreBusqueda.includes(first)  )
              )
            );

    // subscribe to changes
    this.itemsProductos.subscribe(queriedItems => {
      this.resultados = queriedItems.length;
      this.cargando = false;
      if (this.resultados === 0) {
        this.resultadosVacio = true;
      }

    });

  }





}
