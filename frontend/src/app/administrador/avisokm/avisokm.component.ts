import { Component, Input, OnInit } from '@angular/core';
import { Avisokm } from '../models/avisokm';
import { AvisokmImpl } from '../models/avisokm-impl';

@Component({
  selector: 'app-avisokm',
  templateUrl: './avisokm.component.html',
  styleUrls: ['./avisokm.component.css']
})
export class AvisokmComponent implements OnInit {

  @Input() avisokm!: Avisokm;

  constructor() { }

  ngOnInit(): void {
  }

}
