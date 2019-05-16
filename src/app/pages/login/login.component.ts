import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { SessionService } from '../../services/session.service';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { Location } from '@angular/common';
import { AngularFireDatabase } from '@angular/fire/database';
import { AttrAst } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  // tslint:disable-next-line:max-line-length
  constructor(private afAuth: AngularFireAuth, private router: Router, private sessionService: SessionService, private location: Location, private db: AngularFireDatabase) { }

  ngOnInit() {
  }

  iniciarSesion() {

    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then((success) => {
      console.log(success.user.getIdToken);
      this.getClienteInfo(success.user.uid);

    }).catch(function (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/weak-password') {
        alert('La contrasela debe ser de 6 caracteres o más.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  }
  atras() {
    this.location.back();
  }

  getClienteInfo(keyCliente) {
    this.db.list('/clientes', ref => ref.orderByKey().equalTo(keyCliente)).valueChanges().subscribe(clienteFireb => {

      let clienteBD: any;
      clienteBD = clienteFireb;
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
      this.atras();

    }) ;
  }

  revisarUndefined(elemento: any) {
    if ( elemento !== undefined) {
      return elemento;
    } else {
      return '';
    }
  }
}
