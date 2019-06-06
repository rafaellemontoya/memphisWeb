import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../interfaces/producto.interface';
import { Location } from '@angular/common';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { CostoEnvioService } from '../../services/costo-envio.service';

@Component({
  selector: 'app-ver-carrito',
  templateUrl: './ver-carrito.component.html',
  styleUrls: ['./ver-carrito.component.css']
})
export class VerCarritoComponent implements OnInit {

  totalCostoEnvio = 0;
  envio: Envio = {
    costo5kg: 0,
    costo10kg: 0,
    costo15kg: 0,
    costo20kg: 0,
    costo25kg: 0,
    nombre: ''

  };

  // tslint:disable-next-line:max-line-length
  constructor(public carritoService: CarritoService, private location: Location, private sessionService: SessionService, private router: Router,
    private costoEnvio: CostoEnvioService) { }

  ngOnInit() {
    this.getTotal();
    this.getEnvio();
  }
  actualizarUnidades(event, producto: Producto) {
    this.carritoService.actualizarUnidades(event.target.value, producto);
    this.getCostoEnvio();
    this.getTotal();

  }

  siguiente() {
    if (this.sessionService.keyCliente === undefined) {
      
      this.router.navigate(['login']);
    } else {
      this.router.navigate(['checkout']);
    }

  }
  getSubTotal(): number {
    return this.carritoService.getTotal();
  }
  getTotal(): number {
    const envio = this.totalCostoEnvio;
    const subtotal = this.getSubTotal();
    const total = (+envio) + (+subtotal);
    return total;
  }

  getEnvio() {

    this.costoEnvio.getEnvio().subscribe(elements=>{
      console.log(elements)
      const element: any = elements[0];
      this.envio.costo5kg = element.costo5kg;
      this.envio.costo10kg = element.costo10kg;
      this.envio.costo15kg = element.costo15kg;
      this.envio.costo20kg = element.costo20kg;
      this.envio.costo25kg = element.costo25kg;
      this.envio.nombre = element.nombre;

      this.getCostoEnvio();
      this.costoEnvio.addEnvio(this.envio);
    });

  }
  getCostoEnvio(){
    console.log('entro if');
    let peso :number= this.carritoService.getPesoTotal();
    let total=0.0;
    if(peso <= 5.0){
      total = this.envio.costo5kg;
    } else if (peso <= 10.0 ) {
      total = this.envio.costo10kg;
    } else if (peso <= 15.0){
      total = this.envio.costo15kg;
    } else if (peso <= 20.0) {
      total = this.envio.costo20kg;
    } else if (peso <= 25.0) {
      total = this.envio.costo25kg;
    }
    this.totalCostoEnvio = total;
    this.costoEnvio.addCostoEnvio(total);
  }
  eliminarProducto(producto: Producto) {
    this.carritoService.eliminarProducto(producto);
    this.getTotal();
  }
  atras() {
    this.location.back();
  }

}
