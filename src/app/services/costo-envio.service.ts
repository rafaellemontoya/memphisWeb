import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CostoEnvioService {

  envio: Envio;
  costoEnvio = 0.0;
  constructor(private db: AngularFireDatabase) { }

  getEnvio() {

    return  this.db.list('/', ref => ref.orderByKey().equalTo("paqueteria")).valueChanges();
    
  }
  addEnvio(envio: Envio){
    this.envio = envio;
  }
  addCostoEnvio(costo: number){
    this.costoEnvio = costo;
  }
}
