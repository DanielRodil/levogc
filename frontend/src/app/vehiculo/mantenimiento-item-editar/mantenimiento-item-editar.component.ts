import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { MantenimientoImpl } from '../models/mantenimiento-impl';

@Component({
  selector: 'app-mantenimiento-item-editar',
  templateUrl: './mantenimiento-item-editar.component.html',
  styleUrls: ['./mantenimiento-item-editar.component.css'],
})
export class MantenimientoItemEditarComponent implements OnInit {

  pencil = faPencil;
  trash = faTrashCan;

  @Input() mantenimiento: MantenimientoImpl = new MantenimientoImpl();
  @Output() mantenimientoEliminar = new EventEmitter<MantenimientoImpl>();
  @Output() mantenimientoEditar = new EventEmitter<MantenimientoImpl>();
  @Output() mantenimientoConsultar = new EventEmitter<MantenimientoImpl>();

  ngOnInit(): void {}

  constructor() {}

  borrarMantenimiento(): void {
      this.mantenimientoEliminar.emit(this.mantenimiento);
  }

  editarMantenimiento(): void {
    this.mantenimientoEditar.emit(this.mantenimiento);
  }
}
