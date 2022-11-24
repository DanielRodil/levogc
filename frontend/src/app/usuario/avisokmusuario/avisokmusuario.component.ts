import { Component, Input, OnInit } from '@angular/core';
import { Avisokm } from 'src/app/administrador/models/avisokm';

@Component({
  selector: 'app-avisokmusuario',
  templateUrl: './avisokmusuario.component.html',
  styleUrls: ['./avisokmusuario.component.css']
})
export class AvisokmusuarioComponent implements OnInit {

  @Input() avisokm!: Avisokm;

  constructor() { }

  ngOnInit(): void {
  }

}
