import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HttpClientModule } from "@angular/common/http";
import { AdministradorModule } from "./administrador/administrador.module";
import { UsuarioModule } from "./usuario/usuario.module";
import { VehiculoModule } from "./vehiculo/vehiculo.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSliderModule } from "@angular/material/slider";
import { MatStepperModule } from "@angular/material/stepper";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    FontAwesomeModule,
    AdministradorModule,
    UsuarioModule,
    VehiculoModule,
    BrowserAnimationsModule,
    MatSliderModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatStepperModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
