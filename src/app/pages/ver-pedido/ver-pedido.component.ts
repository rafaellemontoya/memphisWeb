import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Pedido } from 'src/app/interfaces/pedido.interface';

@Component({
  selector: 'app-ver-pedido',
  templateUrl: './ver-pedido.component.html',
  styleUrls: ['./ver-pedido.component.css']
})
export class VerPedidoComponent implements OnInit {

  itemPedido: Observable<any[]>;
  pedido: Pedido;
  constructor(private firebaseDB: AngularFireDatabase, private route: ActivatedRoute) {
    this.pedido = new Pedido();
   }

  ngOnInit() {
    window.scroll(0, 0);
    this.route.params
        .subscribe( parametros => {
        this.cargarPedido(parametros['id']);
    });
  }

  cargarPedido(keyPedido) {

    this.itemPedido = this.firebaseDB.list('/ventas',
    ref => ref.orderByKey().equalTo(keyPedido)).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({

          key: c.payload.key, ...c.payload.val() }))
      )
    );

    // subscribe to changes
    this.itemPedido.subscribe(queriedItems => {
      this.pedido = queriedItems[0];
      console.log(this.pedido);
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
        getPagado(pagado: Boolean) {
          let respuesta = 'En espera de pago';
          if (pagado === true) {
            respuesta = 'pagado';
          }
          return respuesta;
        }


}
