import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatosTecnicosInteres } from 'src/app/vehiculo/models/datos-tecnicos-interes';
import { DatosTecnicosInteresImpl } from 'src/app/vehiculo/models/datos-tecnicos-interes-impl';
import { Vehiculo } from 'src/app/vehiculo/models/vehiculo';
import { VehiculoImpl } from 'src/app/vehiculo/models/vehiculo-impl';
import { Avisokm } from '../models/avisokm';
import { AvisokmImpl } from '../models/avisokm-impl';
import { Avisomes } from '../models/avisomes';
import { AvisomesImpl } from '../models/avisomes-impl';
import { AvisokmService } from '../service/avisokm.service';
import { AvisomesService } from '../service/avisomes.service';

@Component({
  selector: 'app-busqueda-item',
  templateUrl: './busqueda-item.component.html',
  styleUrls: ['./busqueda-item.component.css']
})
export class BusquedaItemComponent implements OnInit {

  @Input() vehiculo: Vehiculo = new VehiculoImpl;
  @Input() datoTecnicoInteres: DatosTecnicosInteres = new DatosTecnicosInteresImpl;

  @Output() vehiculoConsultar = new EventEmitter<VehiculoImpl>();
  @Output() vehiculoEliminar = new EventEmitter<VehiculoImpl>();
  @Output() vehiculoEditar = new EventEmitter<Vehiculo>();

  avisokm: Avisokm = new AvisokmImpl;
  avisomes: Avisomes = new AvisomesImpl;

  constructor(private avisokmService: AvisokmService,
              private avisomesService: AvisomesService ) { }
  
  ngOnInit(): void {
    this.avisokmService.getAvisoKmBusqueda(this.vehiculo.avisokms).subscribe(response => {
      this.avisokm = this.avisokmService.extraerAvisoKm(response);

    })
    this.avisomesService.getAvisoMesBusqueda(this.vehiculo.avisomes).subscribe(response => {
      this.avisomes = this.avisomesService.extraerAvisoMes(response);

    })
  }

  consultar(): void{
    this.vehiculoConsultar.emit(this.vehiculo);
  }

  eliminar(): void{
    this.vehiculoEliminar.emit(this.vehiculo);
  }

  editar(): void {
    this.vehiculoEditar.emit(this.vehiculo);
  }

}
