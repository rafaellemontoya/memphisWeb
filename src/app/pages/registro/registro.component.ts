import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../interfaces/cliente.interface';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  cliente = new Cliente();
  clientesRef: AngularFireList<any>;
  dbClientes: AngularFireDatabase;

  submitted = false;
  errorNumeroCaracteresPassword = false;
  errorRepetirPassword = false;
  errorCoincidenciaCorreo = false;




  constructor(db: AngularFireDatabase, public afAuth: AngularFireAuth, private router: Router, private sessionServic: SessionService,
    private location: Location) {
    this.dbClientes = db;
    this.clientesRef = db.list('clientes');
   }

  ngOnInit() {

  }

  clienteFB() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.cliente.email, this.cliente.password).then((success) => {

      success.user.getIdToken().then(token => {

      });
      this.nuevoCliente(success.user.uid);
      this.sessionServic.setCurrentUser(success.user.uid, this.cliente);

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

  nuevoCliente(userId: string) {

    const itemsRef = this.dbClientes.list('clientes');
    // to get a key, check the Example app below
    itemsRef.set(userId, this.cliente );

       this.clientesRef.push(this.cliente);
        this.submitted = true;
        // this.authService.getCurrentCliente();
        window.scroll(0, 0);
   }

   minimoCaracteres(event) {
     this.errorNumeroCaracteresPassword = false;
     const pass: string = event.target.value;

     if (pass.length < 6) {
      this.errorNumeroCaracteresPassword = true;
     }

   }
   repetirPassword(event) {
    this.errorRepetirPassword = false;
    const rePass: String = event.target.value;


    if ( rePass.match(this.cliente.password) ) {
      this.errorRepetirPassword = false;
    } else {
      this.errorRepetirPassword = true;
    }
   }

   atras() {
    this.location.back();
  }




}
