import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPencil, faTrashCan, faEraser, faMagnifyingGlass, faGlasses } from '@fortawesome/free-solid-svg-icons';
import { Vehiculo } from '../models/vehiculo';
import { VehiculoImpl } from '../models/vehiculo-impl';

@Component({
  selector: 'app-vehiculo-item',
  templateUrl: './vehiculo-item.component.html',
  styleUrls: ['./vehiculo-item.component.css']
})
export class VehiculoItemComponent implements OnInit {

  @Input()
  vehiculo: VehiculoImpl= new VehiculoImpl();
  vehiculos: Vehiculo[] = [];
  todosVehiculos: Vehiculo[] = [];
  numeroPaginas: number=0;
  constructor() { }
  @Output() vehiculoEliminar = new EventEmitter<VehiculoImpl>();
  @Output() vehiculoEditar= new EventEmitter<VehiculoImpl>();
  @Output() vehiculoConsultar = new EventEmitter<VehiculoImpl>();

  ngOnInit(): void {
  }

  consultarVehiculo():void{
    this.vehiculoConsultar.emit(this.vehiculo)
  }

  borrarVehiculo(): void {
    if(confirm('Va a eliminar el vehiculo y todos sus datos ¿Desea continuar?'))
    this.vehiculoEliminar.emit(this.vehiculo);
  }

  editarVehiculo():void {
    this.vehiculoEditar.emit(this.vehiculo);
  }

  lupa= faGlasses;
  pencil = faPencil;
  trash = faTrashCan;
  eraser=faEraser;
}
