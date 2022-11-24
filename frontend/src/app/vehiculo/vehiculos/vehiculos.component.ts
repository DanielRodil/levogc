import { LOCATION_INITIALIZED } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { faArrowLeft, faMagnifyingGlass, faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { DatosTecnicosInteresImpl } from "../models/datos-tecnicos-interes-impl";
import { Mantenimiento } from "../models/mantenimiento";
import { MantenimientoImpl } from "../models/mantenimiento-impl";
import { Vehiculo } from "../models/vehiculo";
import { VehiculoImpl } from "../models/vehiculo-impl";
import { DatosTecnicosInteresService } from "../service/datos-tecnicos-interes.service";
import { MantenimientoPreventivoService } from "../service/mantenimiento-preventivo.service";
import { VehiculoService } from "../service/vehiculo.service";

@Component({
  selector: "app-vehiculos",
  templateUrl: "./vehiculos.component.html",
  styleUrls: ["./vehiculos.component.css"],
})
export class VehiculosComponent implements OnInit {
  vehiculo!: VehiculoImpl;
  datosTecnicosInteres!: DatosTecnicosInteresImpl;
  mantenimientoPreventivo!: MantenimientoImpl;
  vehiculos: Vehiculo[] = [];
  vehiculoVerDatos: Vehiculo = new VehiculoImpl();

  constructor(
    private vehiculoService: VehiculoService,
    private datosTecnicosInteresService: DatosTecnicosInteresService,
    private mantenimientoPreventivoService: MantenimientoPreventivoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    this.vehiculoService
      .getVehiculos()
      .subscribe(
        (response) =>
          (this.vehiculos = this.vehiculoService.extraerVehiculos(response))
      );

      
  }

  onVehiculoEliminar(vehiculo: Vehiculo) {
    this.datosTecnicosInteresService
      .deleteDatosTecnicosInteres(this.datosTecnicosInteres.id)
      .subscribe((data) => {
        this.mantenimientoPreventivoService
          .deleteMantenimientoPreventivo(this.mantenimientoPreventivo.id)
          .subscribe((data2) => {
            this.vehiculoService.deleteVehiculo(vehiculo.id).subscribe();
          });
      });

    this.router.navigate(["administrador/vehiculos"]);
    location.reload();


  }

  onVehiculoConsultar(vehiculo: Vehiculo) {
    this.verDatos(vehiculo);
    let url = `consultar/${vehiculo.id}`;
    this.router.navigate([url]);
  }
  
  onVehiculoEditar(vehiculo: Vehiculo) {
    this.verDatos(vehiculo);
    let url = `vehiculos/editar/${vehiculo.id}`;
    this.router.navigate([url]);
  }

  verDatos(vehiculo: Vehiculo): void {
    this.vehiculoVerDatos = vehiculo;
  }

  faMagnifyingGlass = faMagnifyingGlass;
  faPencil = faPencil;
  faTrashCan = faTrashCan;
  volver= faArrowLeft;
}
