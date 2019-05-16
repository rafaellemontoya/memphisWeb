import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto.interface';
import { CarritoService } from '../../services/carrito.service';
import { SessionService } from '../../services/session.service';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  carrito: Array<Producto> = [];
  total: number;
  hayUser = false;
  email: string;
  password: string;

  criterioBusqueda = '';
  // tslint:disable-next-line:max-line-length
  constructor(private carritoService: CarritoService, private sessionService: SessionService, private db: AngularFireDatabase, private afAuth: AngularFireAuth, private router: Router) {
    this.email = '';
    this.password = '';
   }

  ngOnInit() {

    this.getProductos();
    this.getTotal();
    this.getNombreCliente();
  }
  getProductos() {
    this.carrito = this.carritoService.getProductos();
  }
  getTotal(): number {
    return this.carritoService.getTotal();
  }
  eliminarProducto(producto) {
    this.carritoService.eliminarProducto(producto);
    this.getTotal();

  }
  getNombreCliente() {
    if (this.sessionService.keyCliente !== undefined) {
      this.hayUser = true;
      return this.sessionService.cliente.nombre;


    } else {

      return 'Login / Registro';
    }
  }

  login() {

    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then((success) => {

      this.getClienteInfo(success.user.uid);

    }).catch(function (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  }
  getClienteInfo(keyCliente) {
    this.db.list('/clientes', ref => ref.orderByKey().equalTo(keyCliente)).valueChanges().subscribe(clienteFireBD => {
      let clienteBD: any;
      clienteBD = clienteFireBD;
      const cliente = new Cliente();
      cliente.key = keyCliente;
      cliente.nombre = clienteBD[0].nombre;
      cliente.apellidos = clienteBD[0].apellidos;
      cliente.calleNum = clienteBD[0].calleNum;
      cliente.ciudad = clienteBD[0].ciudad;
      cliente.estado = clienteBD[0].estado;
      cliente.cp = clienteBD[0].cp;
      cliente.email = clienteBD[0].email;
      cliente.numeroInterior = this.revisarUndefined(clienteBD[0].numeroInterior);
      cliente.telefono = clienteBD[0].telefono;
      cliente.empresa = clienteBD[0].empresa;
      this.sessionService.setCurrentUser(keyCliente, cliente);

    }) ;
  }
  revisarUndefined(elemento: any) {
    if ( elemento !== undefined) {
      return elemento;
    } else {
      return '';
    }
  }
  search(event) {
    this.criterioBusqueda = event.target.value;


  }
  irABusqueda() {
    console.log('busqueda');
    this.router.navigate(['/resultado-busqueda', this.criterioBusqueda]);
  }
  logout() {
    this.afAuth.auth.signOut();
    this.sessionService.setCurrentUser('', new Cliente);
    this.hayUser = false;
    this.router.navigate(['/inicio']);
    this.getNombreCliente();
    window.location.reload();
  }


}
