import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Rutas
import { AppRoutingModule } from './app-routing.module';

// Componentes
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { IndexComponent } from './pages/index/index.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireDatabase } from '@angular/fire/database';
import { ClasificacionComponent } from './pages/clasificacion/clasificacion.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { VerCarritoComponent } from './pages/ver-carrito/ver-carrito.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { LoginComponent } from './pages/login/login.component';
import { NuevaTarjetaComponent } from './pages/nueva-tarjeta/nueva-tarjeta.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { ResultadoBusquedaComponent } from './pages/resultado-busqueda/resultado-busqueda.component';
import { MiCuentaComponent } from './pages/mi-cuenta/mi-cuenta.component';
import { MisPedidosComponent } from './pages/mis-pedidos/mis-pedidos.component';
import { HistorialPedidosComponent } from './pages/historial-pedidos/historial-pedidos.component';
import { EditarCuentaComponent } from './pages/editar-cuenta/editar-cuenta.component';
import { VerPedidoComponent } from './pages/ver-pedido/ver-pedido.component';
import { RouterModule, Routes } from '@angular/router';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { AvisoPrivacidadComponent } from './pages/aviso-privacidad/aviso-privacidad.component';
import { PagoOxxoService } from './services/pago-oxxo.service';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IndexComponent,
    ClasificacionComponent,
    ProductoComponent,
    VerCarritoComponent,
    CheckoutComponent,
    LoginComponent,
    NuevaTarjetaComponent,
    RegistroComponent,
    ResultadoBusquedaComponent,
    MiCuentaComponent,
    MisPedidosComponent,
    HistorialPedidosComponent,
    EditarCuentaComponent,
    VerPedidoComponent,
    ContactoComponent,
    AvisoPrivacidadComponent,
  ],

  imports: [
    BrowserModule,
    // Rafa
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    // Fin Rafa
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [AngularFireDatabase, PagoOxxoService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
