import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {
  nombreCliente = '';
  cliente: Cliente;
  constructor(private sessionS: SessionService, private router: Router) {
    this.cargarCliente();
   }

  ngOnInit() {

  }
  cargarCliente() {
    if (this.sessionS.cliente === undefined) {
      this.router.navigate(['login']);
    } else {
      console.log(this.sessionS.cliente.key);
      this.cliente = this.sessionS.cliente;
    }
  }
}
