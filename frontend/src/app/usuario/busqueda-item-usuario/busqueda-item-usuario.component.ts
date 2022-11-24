import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Avisokm } from 'src/app/administrador/models/avisokm';
import { AvisokmImpl } from 'src/app/administrador/models/avisokm-impl';
import { Avisomes } from 'src/app/administrador/models/avisomes';
import { AvisomesImpl } from 'src/app/administrador/models/avisomes-impl';
import { AvisokmService } from 'src/app/administrador/service/avisokm.service';
import { AvisomesService } from 'src/app/administrador/service/avisomes.service';
import { Vehiculo } from 'src/app/vehiculo/models/vehiculo';
import { VehiculoImpl } from 'src/app/vehiculo/models/vehiculo-impl';

@Component({
  selector: 'app-busqueda-item-usuario',
  templateUrl: './busqueda-item-usuario.component.html',
  styleUrls: ['./busqueda-item-usuario.component.css']
})
export class BusquedaItemUsuarioComponent implements OnInit {


  @Input() matricula:string="";
  @Input() vehiculo: Vehiculo = new VehiculoImpl;
  @Output() vehiculoConsultar = new EventEmitter<VehiculoImpl>();

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


}
