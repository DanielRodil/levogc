import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Mantenimiento } from '../models/mantenimiento';
import { MantenimientoImpl } from '../models/mantenimiento-impl';

@Component({
  selector: 'app-mantenimiento-item',
  templateUrl: './mantenimiento-item.component.html',
  styleUrls: ['./mantenimiento-item.component.css'],
})
export class MantenimientoItemComponent implements OnInit {

  @Input() mantenimiento: MantenimientoImpl = new MantenimientoImpl();
  mantenimientos: Mantenimiento[] = [];

  @Output() mantenimientoConsultar = new EventEmitter<MantenimientoImpl[]>();

  constructor() {}

  ngOnInit(): void {
  }

  consultarMantenimiento(): void {
    this.mantenimientoConsultar.emit(this.mantenimientos);
  }
}
