import { Component, Input, OnInit } from '@angular/core';
import { Avisomes } from 'src/app/administrador/models/avisomes';

@Component({
  selector: 'app-avisomesusuario',
  templateUrl: './avisomesusuario.component.html',
  styleUrls: ['./avisomesusuario.component.css']
})
export class AvisomesusuarioComponent implements OnInit {

  @Input() avisomes!: Avisomes;

  constructor() { }

  ngOnInit(): void {
  }

}
