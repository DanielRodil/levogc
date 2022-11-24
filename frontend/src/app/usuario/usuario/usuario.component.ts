import { Component, OnInit } from '@angular/core';
import { Router, UrlSerializer } from '@angular/router';
import { faBroom } from '@fortawesome/free-solid-svg-icons';
import { DatosTecnicosInteresImpl } from 'src/app/vehiculo/models/datos-tecnicos-interes-impl';
import { MantenimientoPreventivoImpl } from 'src/app/vehiculo/models/planes-preventivos-impl';
import { Vehiculo } from 'src/app/vehiculo/models/vehiculo';
import { VehiculoImpl } from 'src/app/vehiculo/models/vehiculo-impl';
import { VehiculoService } from 'src/app/vehiculo/service/vehiculo.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  matricula: string="";
  vehiculos: Vehiculo[] = [];
  vehiculoVerDatos: Vehiculo = new VehiculoImpl();
  datosTecnicosInteres!: DatosTecnicosInteresImpl;
  mantenimientoPreventivo!: MantenimientoPreventivoImpl;

  vehiculoIncorrecto: string='';

  user:any=localStorage.getItem('usuario');
  constructor( 
    private vehiculoService: VehiculoService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }


  onVehiculoConsultar(vehiculo: Vehiculo) {
    this.verDatos(vehiculo);
    let url = `usuario/consultar/${vehiculo.id}`;
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
      }
      });
      
  }

  clear(){
    this.matricula='';
    this.vehiculoIncorrecto='';
    location.reload();
  }

  limpiar=faBroom
}
