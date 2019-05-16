import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/cliente.interface';
import { Observable } from 'rxjs';
// import { of } from 'rxjs/Observable/of';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

   keyCliente: string;
   cliente: Cliente;
  constructor() { }


  getCurrentKey() {
    return this.keyCliente;
  }

  setCurrentUser(keyCliente: string, cliente: Cliente) {
    this.keyCliente = keyCliente;
    this.cliente = cliente;
    this.cliente.key = keyCliente;
  }


  getUserName(): string {

    return this.cliente.nombre as string;
  }



}
