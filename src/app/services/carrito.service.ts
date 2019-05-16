import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  carrito: Array<Producto> = [];
  total: number;
  constructor() { }
  addProducto(producto: Producto) {
    this.carrito.push(producto);
  }
  getProductos() {
    return this.carrito;
  }
  getTotal(): number {
     this.total = 0.0;
    this.carrito.forEach(element => {
      this.total += element.importe;
    });
    return this.total;
  }

  eliminarProducto(producto: Producto) {

    this.carrito.splice(this.carrito.indexOf(producto), 1);

  }
  actualizarUnidades(unidades: number, producto: Producto) {

    const productoSeleccionado: Producto[] = this.carrito.filter(item => item.key === producto.key);
    productoSeleccionado[0].unidades = unidades;
    productoSeleccionado[0].importe = (unidades * producto.precioPublico);

  }
}
