import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { faBroom, faPaintBrush } from "@fortawesome/free-solid-svg-icons";
import { DatosTecnicosInteresImpl } from "src/app/vehiculo/models/datos-tecnicos-interes-impl";
import { MantenimientoPreventivoImpl } from "src/app/vehiculo/models/planes-preventivos-impl";
import { Vehiculo } from "src/app/vehiculo/models/vehiculo";
import { VehiculoImpl } from "src/app/vehiculo/models/vehiculo-impl";
import { VehiculoService } from "src/app/vehiculo/service/vehiculo.service";

@Component({
  selector: "app-administrador",
  templateUrl: "./administrador.component.html",
  styleUrls: ["./administrador.component.css"],
})
export class AdministradorComponent implements OnInit {
  matricula: string = "";
  vehiculo:Vehiculo=new VehiculoImpl();
  vehiculos: Vehiculo[] = [];
  vehiculoVerDatos: Vehiculo = new VehiculoImpl();
  datosTecnicosInteres!: DatosTecnicosInteresImpl;
  mantenimientoPreventivo!: MantenimientoPreventivoImpl;

  vehiculoIncorrecto: string='';
  
  user:any=sessionStorage.getItem('usuario');
  

  constructor(
    private vehiculoService: VehiculoService,
    private router: Router
  ) {this.router.routeReuseStrategy.shouldReuseRoute = function () {
    return false;}
  }

  ngOnInit(): void {}

  onVehiculoConsultar(vehiculo: Vehiculo) {

    this.verDatos(vehiculo);
    let url = `administrador/consultar/${vehiculo.id}`;
    this.router.navigate([url]);
  }

  verDatos(vehiculo: Vehiculo): void {
    this.vehiculoVerDatos = vehiculo;
  }

  vehiculoBuscado(matricula: string) {       
    this.vehiculoService
      .getBusquedaPorMatricula(matricula)
      .subscribe((response) => {
        this.vehiculos = this.vehiculoService.extraerVehiculos(response);
        if(this.vehiculos.length==0){
          this.vehiculoIncorrecto="El vehiculo no se encuentra en el sistema"
        };
      });
  
  }

  onVehiculoEliminar(vehiculo: Vehiculo) {
    this.vehiculoService.deleteVehiculo(vehiculo.id).subscribe();
    let url = `administrador`;
    this.router.navigate([url]);
  }

  onVehiculoEditar(vehiculo: Vehiculo) {
    this.verDatos(vehiculo);
    let url = `administrador/editar/${vehiculo.id}`;
    this.router.navigate([url]);
  }

  clear(){
    this.matricula='';
    this.vehiculoIncorrecto='';
    location.reload();
  }

  limpiar=faBroom
}
