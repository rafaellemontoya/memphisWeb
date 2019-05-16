import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-nueva-tarjeta',
  templateUrl: './nueva-tarjeta.component.html',
  styleUrls: ['./nueva-tarjeta.component.css']
})
export class NuevaTarjetaComponent implements OnInit {


  constructor() { }

  ngOnInit() {

  }

  tokenizar() {
    console.log('funcion submit');
      
  }
}
