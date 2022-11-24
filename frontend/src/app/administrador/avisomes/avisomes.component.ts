import { Component, Input, OnInit } from '@angular/core';
import { Avisomes } from '../models/avisomes';

@Component({
  selector: 'app-avisomes',
  templateUrl: './avisomes.component.html',
  styleUrls: ['./avisomes.component.css']
})
export class AvisomesComponent implements OnInit {

  @Input() avisomes!: Avisomes;

  constructor() { }

  ngOnInit(): void {
  }

}
