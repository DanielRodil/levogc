import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { VehiculoConsultaComponent } from '../vehiculo/vehiculos/vehiculo-consulta/vehiculo-consulta.component';
import { VehiculosComponent } from '../vehiculo/vehiculos/vehiculos.component';
import { AuthGuard } from '../service/auth.guard';

const routes: Routes = [
  {
    path:'',
    component: UsuarioComponent
  },
  {
    path: "usuario/vehiculos",
    component: VehiculosComponent,
    canActivate:[AuthGuard],
data:{role:'USER'}
  },
  {
    path: "usuario/consultar/:id",
    component: VehiculoConsultaComponent,
    canActivate:[AuthGuard],
data:{role:'USER'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
