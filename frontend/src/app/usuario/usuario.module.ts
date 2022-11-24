import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario/usuario.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BusquedaItemUsuarioComponent } from './busqueda-item-usuario/busqueda-item-usuario.component';
import { VehiculoModule } from '../vehiculo/vehiculo.module';
import { FormsModule } from '@angular/forms';
import { AvisokmusuarioComponent } from './avisokmusuario/avisokmusuario.component';
import { AvisomesusuarioComponent } from './avisomesusuario/avisomesusuario.component';


@NgModule({
  declarations: [
    UsuarioComponent,
    BusquedaItemUsuarioComponent,
    AvisokmusuarioComponent,
    AvisomesusuarioComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule, FontAwesomeModule,VehiculoModule,FormsModule
  ],
  exports:[UsuarioComponent]
})
export class UsuarioModule { }
