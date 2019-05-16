import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { Location } from '@angular/common';
import { SessionService } from '../../services/session.service';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { Pedido } from 'src/app/interfaces/pedido.interface';
import { AngularFireDatabase } from '@angular/fire/database';
import { element } from 'protractor';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['../../../assets/css/portfolio_grid_style_3.css']
})
export class CheckoutComponent implements OnInit {

  cliente: Cliente;
  itemsRef: any;
  pedidoFinalizado = false;
  keyPublico = '';

  // tslint:disable-next-line:max-line-length
  constructor(public carritoService: CarritoService, private location: Location, public sesionService: SessionService, db: AngularFireDatabase) {
    console.log(this.sesionService.cliente);
    this.cliente = this.sesionService.cliente;
    this.itemsRef = db.list('ventas');
   }

  ngOnInit() {
    console.log(this.sesionService.getCurrentKey());
  }
  getTotal(): number {
    return this.carritoService.getTotal();
  }


  atras() {
    this.location.back();
  }

  finalizarCompra() {

    const pedido = new Pedido();
    pedido.total = this.carritoService.getTotal();
    pedido.fecha = new Date().getTime();
    pedido.pagado = false;
    pedido.estado = 'En espera';
    pedido.tienda = 'En línea';
    pedido.vendedor = 'En línea';
    pedido.fechaEntrega = 0;
    pedido.fechaEnvio = 0;
    pedido.fechaPago = 0;


    this.generarVenta(pedido);
  }
    generarVenta(pedido) {

      const respuesta = this.itemsRef.push(pedido);

      this.updateKeyPublico(respuesta['key']);
      this.updateProductos(respuesta['key']);
      this.updateCliente(respuesta['key']);
      this.updateEnvio(respuesta['key']);
      this.pedidoFinalizado = true;
      window.scroll(0, 0);
  }
  updateProductos(keyVenta) {

    // tslint:disable-next-line:no-shadowed-variable
    this.carritoService.carrito.forEach(element => {
      console.log(element);
      let descuento = 0;

      if (element.descuentoPromocion !== undefined) {
        descuento = element.descuentoPromocion;
      }
      this.itemsRef.update(keyVenta + '/productos/' + element.key, {
        nombre: element.nombre,
        imagen1: element.imagen1,
        precioPublico: element.precioPublico,
        unidades: element.unidades,
        importe: element.importe,
        descuento: descuento});

    });
  }
  updateCliente(keyVenta) {


    // tslint:disable-next-line:no-shadowed-variable
    this.carritoService.carrito.forEach(element => {

      let descuento = 0;

      if (element.descuentoPromocion !== undefined) {
        descuento = element.descuentoPromocion;
      }
      this.itemsRef.update(keyVenta + '/cliente', {

        keyCliente: this.cliente.key,
        nombre: this.cliente.nombre + ' ' + this.cliente.apellidos,
        email: this.cliente.email,
        calleNum: this.cliente.calleNum,
        ciudad: this.cliente.ciudad,
        cp: this.cliente.cp,
        estado: this.cliente.estado,
        numeroInterior: this.revisarUndefined(this.cliente.numeroInterior),
        telefono: this.cliente.telefono,
      });

    });
  }
  updateEnvio(keyVenta) {
    this.itemsRef.update(keyVenta + '/envio', {

      costo: 0,
      tipo: 'Por definir',
      paqueteria: '-',
      numeroGuia: '-'
    });
  }

  updateKeyPublico(keyVenta) {
    this.itemsRef.set(keyVenta + '/keyPublico', keyVenta.substr(keyVenta.length - 4));
    this.keyPublico = keyVenta.substr(keyVenta.length - 4);
  }

  revisarUndefined(elemento: any) {
    if ( elemento !== undefined) {
      return elemento;
    } else {
      return '';
    }
  }
}
