import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../interfaces/producto.interface';
import { Location } from '@angular/common';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-carrito',
  templateUrl: './ver-carrito.component.html',
  styleUrls: ['./ver-carrito.component.css']
})
export class VerCarritoComponent implements OnInit {


  // tslint:disable-next-line:max-line-length
  constructor(public carritoService: CarritoService, private location: Location, private sessionService: SessionService, private router: Router) { }

  ngOnInit() {
    this.getTotal();
  }
  actualizarUnidades(event, producto: Producto) {
    this.carritoService.actualizarUnidades(event.target.value, producto);
    this.getTotal();

  }

  siguiente() {
    if (this.sessionService.keyCliente === undefined) {
      console.log('entro if');
      this.router.navigate(['login']);
    } else {
      this.router.navigate(['checkout']);
    }

  }
  getTotal(): number {
    return this.carritoService.getTotal();
  }
  eliminarProducto(producto: Producto) {
    this.carritoService.eliminarProducto(producto);
    this.getTotal();
  }
  atras() {
    this.location.back();
  }

}
