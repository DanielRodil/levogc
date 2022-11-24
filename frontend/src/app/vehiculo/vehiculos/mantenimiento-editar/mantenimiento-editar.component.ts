import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment.prod';
import { DatosTecnicosInteres } from '../../models/datos-tecnicos-interes';
import { Mantenimiento } from '../../models/mantenimiento';
import { MantenimientoImpl } from '../../models/mantenimiento-impl';
import { MantenimientoPreventivo } from '../../models/planes-preventivos';
import { Vehiculo } from '../../models/vehiculo';
import { VehiculoImpl } from '../../models/vehiculo-impl';
import { MantenimientoService } from '../../service/mantenimiento.service';
import { VehiculoService } from '../../service/vehiculo.service';

@Component({
  selector: 'app-mantenimiento-editar',
  templateUrl: './mantenimiento-editar.component.html',
  styleUrls: ['./mantenimiento-editar.component.css'],
})
export class MantenimientoEditarComponent implements OnInit {

  mantenimiento: Mantenimiento = new MantenimientoImpl();
  vehiculo: Vehiculo = new VehiculoImpl();
  vehiculos: Vehiculo[] = [];
  datosTecnicosInteres!: DatosTecnicosInteres;
  mantenimientoPreventivo!: MantenimientoPreventivo;

  private host=environment.host

  volver= faArrowLeft;

  constructor(
    private vehiculoService: VehiculoService,
    private mantenimientoService: MantenimientoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let id: string = this.cargarMantenimiento();
    
    this.mantenimientoService
      .getMantenimientoVehiculo(id)
      .subscribe((response) => {
        this.mantenimiento =
          this.mantenimientoService.mapearMantenimiento(response);
        this.vehiculoService
          .getVehiculoMantenimiento(id)
          .subscribe((response) => {
            this.vehiculo = this.vehiculoService.mapearVehiculo(response);
          });
      });
  }

  cargarMantenimiento(): string {
    return this.activatedRoute.snapshot.params['id'];
  }

  cargarVehiculo(): string {
    return this.activatedRoute.snapshot.params['id'];
  }

  onMantenimientoEditar(): void {
    this.mantenimientoService
      .updateMantenimmiento(this.mantenimiento)
      .subscribe();
      this.router.navigate([`administrador/editar/${this.vehiculo.id}`]);
  }

  onMantenimientoBorrar(): void {
    this.mantenimientoService
      .deleteMantenimiento(this.mantenimiento.id)
      .subscribe();
      this.router.navigate([`administrador/editar/${this.vehiculo.id}`]);
      location.reload();
  }

  goBack(){
    let url = `administrador`;
    
    this.router.navigate([url]);
  }

  


}
