import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../interfaces/cliente.interface';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-editar-cuenta',
  templateUrl: './editar-cuenta.component.html',
  styleUrls: ['./editar-cuenta.component.css']
})
export class EditarCuentaComponent implements OnInit {
  cliente = new Cliente();
  clientesRef: AngularFireList<any>;
  dbClientes: AngularFireDatabase;

  submitted = false;
  errorNumeroCaracteresPassword = false;
  errorRepetirPassword = false;
  errorCoincidenciaCorreo = false;




  constructor(db: AngularFireDatabase, public afAuth: AngularFireAuth, private router: Router, private sessionServic: SessionService) {
    this.dbClientes = db;
    this.clientesRef = db.list('clientes');
    this.cargarCliente();
   }

  ngOnInit() {

  }
  cargarCliente() {
    if (this.sessionServic.cliente === undefined) {
      this.router.navigate(['login']);
    } else {
      // console.log(this.sessionServic.cliente.key);
      this.cliente = this.sessionServic.cliente;
    }
  }

  editarCliente() {
    this.clientesRef.update(this.cliente.key , {
      nombre: this.revisarUndefined(this.cliente.nombre),
      apellidos: this.revisarUndefined(this.cliente.apellidos),
      calleNum: this.revisarUndefined(this.cliente.calleNum),
      ciudad: this.revisarUndefined(this.cliente.ciudad),
      cp: this.revisarUndefined(this.cliente.cp),
      empresa: this.revisarUndefined(this.cliente.empresa),
      estado: this.revisarUndefined(this.cliente.estado),
      numeroInterior: this.revisarUndefined(this.cliente.numeroInterior),
      telefono: this.revisarUndefined(this.cliente.telefono),
    });
    this.submitted = true;
    window.scroll(0, 0);
    this.sessionServic.cliente = this.cliente;

  }
  revisarUndefined(elemento: any) {
    if ( elemento !== undefined) {
      return elemento;
    } else {
      return '';
    }
  }








}
