import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Producto } from '../../interfaces/producto.interface';
import { Location } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  productoRef: AngularFireList <any []> ;
  productoSeleccionado = new Producto();
  keyRecibido: string;
  dbProductos: AngularFireDatabase;
  itemsProductos: Observable <any[]>;
  itemsProductosOfertas: Observable <any[]>;
  itemsProductosRelacionados: Observable <any[]>;
  cantidad = 1;
  criterioBusqueda = '';
  imagenSeleccionada = '';
  productoAgregado = false;
  resultados = 0;

  constructor( private route: ActivatedRoute,
                private location: Location,
                db: AngularFireDatabase, private carritoS: CarritoService, private router: Router ) {


                  this.dbProductos = db;
                 }

  ngOnInit() {
    window.scroll(0, 0);
    this.route.params
        .subscribe( parametros => {
        this.keyRecibido = parametros['id'];
        console.log(parametros['id']);
        this.obtenerInformacion(parametros['id']);

    });
    this.getInfoOfertas();

  }

  obtenerInformacion(keyRecibido) {
   /*  this.productoRef = this.dbProductos.list('productos/' + this.keyRecibido ).valueChanges();
    this.productoRef.subscribe(producto => {
        console.log(producto);
        this.productoSeleccionado = producto;
    });
    console.log(this.productoRef[0]);*/



    this.itemsProductos = this.dbProductos.list('/productos', ref => ref.orderByKey().equalTo(keyRecibido)).valueChanges();
    this.itemsProductos.subscribe(elements => {
    this.productoSeleccionado.clasificaciones = elements[0].clasificaciones;
    this.productoSeleccionado.key = keyRecibido;
    this.productoSeleccionado.promocion = elements[0].promocion;
    this.productoSeleccionado.descripcion = elements[0].descripcion;
    this.productoSeleccionado.precioPublico = elements[0].precioPublico;
    this.productoSeleccionado.unidades = elements[0].unidades;
    this.productoSeleccionado.descuentoPromocion = elements[0].descuentoPromocion;
    this.productoSeleccionado.fichaTecnica = elements[0].fichaTecnica;
    this.productoSeleccionado.nombre = elements[0].nombre;
    this.productoSeleccionado.imagen1 = elements[0].imagen1;
    this.productoSeleccionado.imagen2 = elements[0].imagen2;
    this.productoSeleccionado.imagen3 = elements[0].imagen3;
    this.productoSeleccionado.imagen4 = elements[0].imagen4;
    this.productoSeleccionado.imagen5 = elements[0].imagen5;
    this.imagenSeleccionada = elements[0].imagen1;
      this.productoSeleccionado.peso = this.revisarUndefined(elements[0].peso);
      // this.getProductosRelacionados();

    });


  }
  revisarUndefined(elemento: any) {
    if (elemento !== undefined) {
      return elemento;
    } else {
      return 0;
    }
  }
  agregarProducto() {
    console.log(this.cantidad);
    this.productoSeleccionado.unidades = this.cantidad;
    this.productoSeleccionado.importe = this.productoSeleccionado.unidades * this.productoSeleccionado.precioPublico;
    console.log(this.productoSeleccionado);
    this.carritoS.addProducto(this.productoSeleccionado);
    this.productoAgregado = true;
  }
  agregarCantidad() {
    this.cantidad += 1;
  }
  disminuirCantidad() {
    if (this.cantidad > 1) {
      this.cantidad -= 1;

    }
  }

  atras() {
    this.location.back();
  }

  search(event) {
    this.criterioBusqueda = event.target.value;


  }
  irABusqueda() {
    console.log('busqueda');
    this.router.navigate(['/resultado-busqueda', this.criterioBusqueda]);
  }

  cambiarImagen(url: string) {
    this.imagenSeleccionada = url;
  }

  getInfoOfertas() {
    this.itemsProductosOfertas = this.dbProductos.list('/productos',
    ref => ref.orderByChild('descuentoPromocion').startAt(1).limitToFirst(3)).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({

          key: c.payload.key, ...c.payload.val() }))
      )
    );

// subscribe to changes
    this.itemsProductosOfertas.subscribe(queriedItems => {
      console.log(queriedItems);
    this.resultados = queriedItems.length;
});
    // trigger the query
// this.size$.next();

  }
  getPrecioDescuento(precioPublico, descuento) {
    const precioDescuento = precioPublico - ( (descuento / 100) * precioPublico);
    console.log(precioDescuento);
    return precioDescuento;
  }

  getProductosRelacionados() {
    console.log(this.productoSeleccionado);
    this.itemsProductosRelacionados = this.dbProductos.list('/productos',
    ref => ref.orderByChild('clasificaciones/clasificacion1')
    .equalTo(this.productoSeleccionado.clasificaciones.clasificacion1)
    .limitToFirst(3)).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({

          key: c.payload.key, ...c.payload.val() }))
      )
    );

// subscribe to changes
    this.itemsProductosRelacionados.subscribe(queriedItems => {
      console.log(queriedItems);
    this.resultados = queriedItems.length;
});
    // trigger the query
// this.size$.next();

  }

}
