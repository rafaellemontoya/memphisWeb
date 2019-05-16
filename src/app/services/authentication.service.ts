import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireAction} from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { SessionService } from './session.service';
import { Cliente } from '../interfaces/cliente.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  db;

  constructor(db: AngularFireDatabase, public afAuth: AngularFireAuth, private sessionService: SessionService) {
    this.db = db;
   }

  getCurrentCliente() {
    // this.afAuth.authState.subscribe(cliente => {
    //   if (cliente.uid != null) {
    //     console.log(cliente.uid);
    //     this.getClienteInfo(cliente.uid);
    //   }
    // });
  }
  getClienteInfo(keyCliente): Cliente {
    return this.db.list('/clientes', ref => ref.orderByKey().equalTo(keyCliente)).valueChanges().subscribe(clienteBD => {

      const cliente = new Cliente();
      cliente.key = keyCliente;
      cliente.nombre = clienteBD[0].nombre;
      cliente.apellidos = clienteBD[0].apellidos;
      cliente.ciudad = clienteBD[0].ciudad;
      cliente.cp = clienteBD[0].cp;
      cliente.email = clienteBD[0].email;
      cliente.numeroInterior = clienteBD[0].numeroInterior;
      cliente.telefono = clienteBD[0].telefono;

      return cliente;

    }) ;

  }


}
