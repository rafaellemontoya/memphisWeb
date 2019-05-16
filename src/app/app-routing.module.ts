import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { ClasificacionComponent } from './pages/clasificacion/clasificacion.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { VerCarritoComponent } from './pages/ver-carrito/ver-carrito.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { NuevaTarjetaComponent } from './pages/nueva-tarjeta/nueva-tarjeta.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { ResultadoBusquedaComponent } from './pages/resultado-busqueda/resultado-busqueda.component';
import { MiCuentaComponent } from './pages/mi-cuenta/mi-cuenta.component';
import { MisPedidosComponent } from './pages/mis-pedidos/mis-pedidos.component';
import { HistorialPedidosComponent } from './pages/historial-pedidos/historial-pedidos.component';
import { EditarCuentaComponent } from './pages/editar-cuenta/editar-cuenta.component';
import { VerPedidoComponent } from './pages/ver-pedido/ver-pedido.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { AvisoPrivacidadComponent } from './pages/aviso-privacidad/aviso-privacidad.component';


const app_routes: Routes = [

  { path: '', component: IndexComponent },
  { path: 'inicio', component: IndexComponent },
  { path: 'clasificacion/:id1/:id2/:id3/:id4', component: ClasificacionComponent },
  { path: 'producto/:id', component: ProductoComponent},
  // { path: 'contacto/', component: Contacto},
  // rafa
  { path: 'verCarrito', component: VerCarritoComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'nuevaTarjeta', component: NuevaTarjetaComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'login', component: LoginComponent},
  { path: 'mi-cuenta', component: MiCuentaComponent},
  { path: 'mis-pedidos', component: MisPedidosComponent},
  { path: 'historial-pedidos', component: HistorialPedidosComponent},
  { path: 'editar-cuenta', component: EditarCuentaComponent},
  { path: 'resultado-busqueda/:id', component: ResultadoBusquedaComponent},
  { path: 'ver-pedido/:id', component: VerPedidoComponent},
  { path: 'contacto', component: ContactoComponent},
  { path: 'aviso-privacidad', component: AvisoPrivacidadComponent},

  // fin rafa

  { path: '**', pathMatch: 'full', redirectTo: ''}
];
@NgModule({
  imports: [
      RouterModule.forRoot( app_routes )
  ],
  exports: [
        RouterModule
  ]

})

export class AppRoutingModule {


}
