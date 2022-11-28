import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../service/auth.guard";
import { FormularioComponent } from "./formulario/formulario.component";
import { MantenimientoEditarComponent } from "./vehiculos/mantenimiento-editar/mantenimiento-editar.component";
import { MantenimientoFormComponent } from "./vehiculos/mantenimiento-form/mantenimiento-form.component";
import { VehiculosComponent } from "./vehiculos/vehiculos.component";

const routes: Routes = [
//   {
//     path: "administrador/vehiculos",
//     component: VehiculosComponent,
//     canActivate:[AuthGuard],
// data:{role:'ADMIN'}
//   },
  {path:"administrador/vehiculo/formulario",
  component:FormularioComponent,
  canActivate:[AuthGuard],
  data:{role:'ADMIN'}},
  {
    path: "administrador/mantenimientoForm/:id",
    component: MantenimientoFormComponent,
    canActivate:[AuthGuard],
    data:{role:'ADMIN'}
  },
 
  {
    path: "administrador/mantenimientosrealizados/editar/:id",
    component: MantenimientoEditarComponent,
    canActivate:[AuthGuard],
data:{role:'ADMIN'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiculoRoutingModule {}
