import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { VehiculoConsultaComponent } from "../vehiculo/vehiculos/vehiculo-consulta/vehiculo-consulta.component";
import { VehiculoEditarComponent } from "../vehiculo/vehiculos/vehiculo-editar/vehiculo-editar.component";
import { AdministradorComponent } from "./administrador/administrador.component";

const routes: Routes = [
  {
    path: "",
    component: AdministradorComponent,
  },
   {
    path: "vehiculo",
    loadChildren:()=> import("../vehiculo/vehiculo.module").then(m=> m.VehiculoModule),
  },
  
  {
    path: "administrador/consultar/:id",
    component: VehiculoConsultaComponent,
  },
  {
    path: "administrador/editar/:id",
    component: VehiculoEditarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministradorRoutingModule {}
