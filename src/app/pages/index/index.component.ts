import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AngularFireObject, AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable, Subscription } from 'rxjs';
import { SessionService } from '../../services/session.service';
import { PagoOxxoService } from '../../services/pago-oxxo.service';
import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
interface myData {
  message: string;
  success: boolean;
}

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  itemsRef: AngularFireList<any>;
  variableClase = 'img-responsive';
  name: string;
  name2: string;
  name3: string;
  name4: string;
  name5: string;
  name6: string;
  urlBaner: string;
  urlBaner2: string;
  urlBaner3: string;
  urlBaner4: string;
  urlBaner5: string;
  urlBaner6: string;
  banerPrincipal: string;
  banerPrincipal2: string;
  banerPrincipal3: string;
  banerIntermedio: string;
  banerIntermedio2: string;
  banerIntermedio3: string;
  productos: Observable<any[]>;
  items: Subscription;
  constructor(db: AngularFireDatabase, private http: HttpClient) {
    this.itemsRef = db.list('paginas/inicio');
    this.items = this.itemsRef.valueChanges().subscribe(items => {

      this.banerIntermedio = items[0];
      this.banerIntermedio2 = items[1];
      this.banerIntermedio3 = items[2];

      this.urlBaner = items[3];
      this.urlBaner2 = items[4];
      this.urlBaner3 = items[5];
      this.urlBaner4 = items[6];
      this.urlBaner5 = items[7];
      this.urlBaner6 = items[8];

      this.banerPrincipal = items[9];
      this.banerPrincipal2 = items[10];
      this.banerPrincipal3 = items[11];

      this.name = items[12];
      this.name2 = items[13];
      this.name3 = items[14];
      this.name4 = items[15];
      this.name5 = items[16];
      this.name6 = items[17];


    });

    this.productos = db.list('paginas/inicio/productos').valueChanges();
  }

  ngOnInit() {
    this.getData();
  }

  getData(){
    const dataCargo: CargoOxxo = {
      monto: 100,
      concepto: 'cargoPrueba',
      unidades:20,
      nombreCliente: 'Cliente prueba',
      email: 'prueba@prueba.com',
      telefono: '5514900318',
      keyVenta: 'keyVenta'
    };
    
    
      this.http.post('assets/background/cargoOxxo.php', dataCargo ).subscribe( (data) => {
        console.log(data);
      }, (error)=>{
        console.log(error);
      });
  }
  getUser() {

  }

  geturl() {
    // tslint:disable-next-line:quotemark
    return "url('../images/basic_slider_6/level1.jpg')";
  }
}
