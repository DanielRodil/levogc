import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdministradorComponent } from "../administrador/administrador/administrador.component";
import { AppComponent } from "../app.component";
import { AuthGuard } from "../service/auth.guard";
import { UsuarioComponent } from "../usuario/usuario/usuario.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {path:"administrador",
  loadChildren:()=> import("../administrador/administrador.module").then(m=> m.AdministradorModule),
  canActivate:[AuthGuard],
  data:{role:'ADMIN'}},
  
  {path:"usuario",
  loadChildren:()=> import("../usuario/usuario.module").then(m=> m.UsuarioModule),
  canActivate:[AuthGuard],
    data:{role:'USER'}
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
