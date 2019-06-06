import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { Location } from '@angular/common';
import { SessionService } from '../../services/session.service';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { Pedido } from 'src/app/interfaces/pedido.interface';
import { AngularFireDatabase } from '@angular/fire/database';
import { element } from 'protractor';
import { PagoOxxoService } from '../../services/pago-oxxo.service';
import { CostoEnvioService } from 'src/app/services/costo-envio.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['../../../assets/css/portfolio_grid_style_3.css']
})
export class CheckoutComponent implements OnInit {
  totalCostoEnvio = 0.0;
  cliente: Cliente;
  itemsRef: any;
  pedidoFinalizado = false;
  keyPublico = '';

  // tslint:disable-next-line:max-line-length
  constructor(public carritoService: CarritoService, private location: Location, public sesionService: SessionService, db: AngularFireDatabase, private pago: PagoOxxoService,
    private costoEnvio: CostoEnvioService, private pagoOxxoService: PagoOxxoService) {
    
    this.cliente = this.sesionService.cliente;
    this.itemsRef = db.list('ventas');
    this.totalCostoEnvio = this.costoEnvio.costoEnvio;
   }

  ngOnInit() {
    
    
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
      //generar pago oxxo
      this.pagoOxxoService.generatePagoOxxo(this.carritoService.getTotal(),
      'Compra en memphis.com', 1, this.cliente.nombre + ' ' + this.cliente.apellidos,
      this.cliente.email,this.cliente.telefono,'NULL',this.costoEnvio.costoEnvio,this.costoEnvio.envio.nombre,
      this.cliente.calleNum, this.cliente.cp).subscribe((respuestaConekta)=>{
        if (respuestaConekta['status'] === 1) {
          pedido.idOrdenConekta = respuestaConekta['idOrden'];
          pedido.referenciaOxxo = respuestaConekta['referencia'];
          pedido.formaPago = 'OxxoPay';
          const respuesta = this.itemsRef.push(pedido);
    
          this.updateKeyPublico(respuesta['key']);
          this.updateProductos(respuesta['key']);
          this.updateCliente(respuesta['key']);
          this.updateEnvio(respuesta['key']);
          this.pagoOxxoService.fichaOxxoCreada(this.cliente.nombre + ' ' + this.cliente.apellidos, this.cliente.email,
           respuestaConekta['referencia'], respuestaConekta['monto']).subscribe((respuestaMail)=>{
             console.log(respuestaMail);
           });
        }
      });
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
  getSubTotal(): number {
    return this.carritoService.getTotal();
  }
  getTotal(): number {
    const envio = this.totalCostoEnvio;
    const subtotal = this.getSubTotal();
    const total = (+envio) + (+subtotal);
    return total;
  }
}
