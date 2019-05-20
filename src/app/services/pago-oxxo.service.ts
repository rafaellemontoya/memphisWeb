import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



interface myData {
  message: string;
  success: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class PagoOxxoService {

  constructor(private http: HttpClient) { }

  getSomeData() {
    return this.http.get<myData>('assets/background/prueba.php');
  }

  pushData(){
    this.http.post('http://localhost/script.php', 'hola desde angular').subscribe( (data) => {
      console.log(data);
    });
  }
}
