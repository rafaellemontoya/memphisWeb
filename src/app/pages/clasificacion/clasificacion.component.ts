import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Producto } from 'src/app/interfaces/producto.interface';

@Component({
  selector: 'app-clasificacion',
  templateUrl: './clasificacion.component.html',
  styleUrls: ['./clasificacion.component.css']
})
export class ClasificacionComponent implements OnInit {

  dbProductos: AngularFireDatabase;
  itemsProductos1: Observable <any[]>;
  itemsProductos2:  Observable <any[]>;
  itemsProductos3: Observable <any[]>;
  itemsProductos4: Observable <any[]>;

  filtro1 = '';
  filtro2 = '';
  filtro3 = '';
  filtro4 = '';

  cuatroFiltros = false;
  tresFiltros = false;
  dosFiltros = false;
  unFiltro = false;

  directa = false;

  productoSeleccionado = new Producto();
  nombreClasificacion: string;

  constructor(private route: ActivatedRoute,
              db: AngularFireDatabase) {

                this.dbProductos = db;
  }

  ngOnInit() {

      this.route.params
          .subscribe( parametros => {
            this.filtro1 = parametros.id1;
            this.filtro2 = parametros.id2;
            this.filtro3 = parametros.id3;
            this.filtro4 = parametros.id4;
            console.log(parametros);
            if (parametros.id4 !== '') {
              this.obtenerClasificacion('clasificacion4', parametros.id4);
              this.cuatroFiltros = true;
              this.tresFiltros = false;
              this.dosFiltros = false;
              this.unFiltro = false;
              this.directa = false;
            } else if (parametros.id3 !== '') {
              this.obtenerClasificacion('clasificacion3', parametros.id3);
              this.cuatroFiltros = false;
              this.tresFiltros = true;
              this.dosFiltros = false;
              this.unFiltro = false;
              this.directa = false;
            } else if (parametros.id2 !== '' && parametros.id2 !== '-1') {
              this.obtenerClasificacion('clasificacion2', parametros.id2);
              this.cuatroFiltros = false;
              this.tresFiltros = false;
              this.dosFiltros = true;
              this.unFiltro = false;
              this.directa = false;
            } else if (parametros.id1 !== '' && parametros.id2 !== '-1') {
              this.obtenerClasificacion('clasificacion1', parametros.id1);
              this.cuatroFiltros = false;
              this.tresFiltros = false;
              this.dosFiltros = false;
              this.unFiltro = true;
              this.directa = false;
            } else if (parametros.id2 === '-1') {
              this.obtenerClasificacionUnParams(parametros.id1);
              this.cuatroFiltros = false;
              this.tresFiltros = false;
              this.dosFiltros = false;
              this.unFiltro = false;
              this.directa = true;
            }

          });

  }


   obtenerClasificacion(parametro: string, valor: string ) {

    this.itemsProductos1 = this.dbProductos.list('/productos',
            ref => ref.orderByChild('clasificaciones/' + parametro).equalTo(valor)).snapshotChanges().pipe(
              map(changes =>
                changes.map(c => ({

                  key: c.payload.key, ...c.payload.val() }))
              )
            );
    this.itemsProductos1.subscribe(elements => {
      console.log(elements);
    });
  }
  obtenerClasificacionUnParams(seleccionada: string) {

    this.itemsProductos1 = this.dbProductos.list('/productos',
            ref => ref.orderByChild('clasificaciones/clasificacion1').equalTo(seleccionada)).snapshotChanges().pipe(
              map(changes =>
                changes.map(c => ({

                  key: c.payload.key, ...c.payload.val() }))
              )
            );
    this.itemsProductos1.subscribe(elements => {
      console.log(elements);
    });
    this.itemsProductos2 = this.dbProductos.list('/productos',
    ref => ref.orderByChild('clasificaciones/clasificacion2').equalTo(seleccionada)).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({

          key: c.payload.key, ...c.payload.val() }))
      )
    );
    this.itemsProductos2.subscribe(elements => {
    console.log(elements);
    });
    this.itemsProductos3 = this.dbProductos.list('/productos',
    ref => ref.orderByChild('clasificaciones/clasificacion3').equalTo(seleccionada)).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({

          key: c.payload.key, ...c.payload.val() }))
      )
    );
    this.itemsProductos3.subscribe(elements => {
    console.log(elements);
    });
    this.itemsProductos4 = this.dbProductos.list('/productos',
    ref => ref.orderByChild('clasificaciones/clasificacion4').equalTo(seleccionada)).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({

          key: c.payload.key, ...c.payload.val() }))
      )
    );
    this.itemsProductos4.subscribe(elements => {
    console.log(elements);
    });
      }

}

