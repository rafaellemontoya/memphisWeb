import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.css']
})
export class MisPedidosComponent implements OnInit {

  cliente: Cliente;
  resultados = 0;
  itemsPedidosRef: AngularFireList<any>;
  itemsPedidos: Observable<any[]>;

  constructor(private sessionS: SessionService, private router: Router, private firebaseDB: AngularFireDatabase) { }

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente() {
    if (this.sessionS.cliente === undefined) {
      this.router.navigate(['login']);
    } else {
      console.log(this.sessionS.cliente.key);
      this.cliente = this.sessionS.cliente;
      this.cargarPedidos(this.sessionS.cliente.key);
    }
  }

  cargarPedidos(keyCliente: string) {

    this.itemsPedidos = this.firebaseDB.list('/ventas',
    ref => ref.orderByChild('cliente/keyCliente').equalTo(keyCliente)).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({

          key: c.payload.key, ...c.payload.val() }))
      )
    );

    // subscribe to changes
    this.itemsPedidos.subscribe(queriedItems => {
    this.resultados = queriedItems.length;
});


  }
  getProductos(productos: any) {
    const res = [];
    // tslint:disable-next-line:forin
    for (const x in productos) {
      res.push (productos[x]);
    }
    return res;

  }

}
