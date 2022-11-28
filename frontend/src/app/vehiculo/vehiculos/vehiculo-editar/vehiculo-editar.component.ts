import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Avisokm } from 'src/app/administrador/models/avisokm';
import { AvisokmImpl } from 'src/app/administrador/models/avisokm-impl';
import { Avisomes } from 'src/app/administrador/models/avisomes';
import { AvisomesImpl } from 'src/app/administrador/models/avisomes-impl';
import { AvisokmService } from 'src/app/administrador/service/avisokm.service';
import { AvisomesService } from 'src/app/administrador/service/avisomes.service';
import { environment } from 'src/environments/environment.prod';
import { DatosTecnicosInteres } from '../../models/datos-tecnicos-interes';
import { DatosTecnicosInteresImpl } from '../../models/datos-tecnicos-interes-impl';
import { Mantenimiento } from '../../models/mantenimiento';
import { MantenimientoImpl } from '../../models/mantenimiento-impl';
import { MantenimientoPreventivo } from '../../models/planes-preventivos';
import { MantenimientoPreventivoImpl } from '../../models/planes-preventivos-impl';
import { Vehiculo } from '../../models/vehiculo';
import { VehiculoImpl } from '../../models/vehiculo-impl';
import { DatosTecnicosInteresService } from '../../service/datos-tecnicos-interes.service';
import { MantenimientoPreventivoService } from '../../service/mantenimiento-preventivo.service';
import { MantenimientoService } from '../../service/mantenimiento.service';
import { VehiculoService } from '../../service/vehiculo.service';

@Component({
  selector: 'app-vehiculo-editar',
  templateUrl: './vehiculo-editar.component.html',
  styleUrls: ['./vehiculo-editar.component.css'],
})
export class VehiculoEditarComponent implements OnInit {

  urlEndpoint = environment.host;

  vehiculo: Vehiculo = new VehiculoImpl();
  datosTecnicosInteres: DatosTecnicosInteres = new DatosTecnicosInteresImpl();
  mantenimientoPreventivo: MantenimientoPreventivo = new MantenimientoPreventivoImpl();
  avisokm: Avisokm = new AvisokmImpl();
  avisomes: Avisomes = new AvisomesImpl();
  mantenimientoPreventivoVerDatos: MantenimientoPreventivoImpl = new MantenimientoPreventivoImpl();
  datosTecnicosInteresVerDatos: DatosTecnicosInteresImpl = new DatosTecnicosInteresImpl();
  mantenimientoVerDatos: Mantenimiento = new MantenimientoImpl();
  mantenimientos: Mantenimiento[] = [];

  fechaMaxima!:Date;
  fechaBuena!:string|null;

  @Input() mantenimiento: Mantenimiento = new MantenimientoImpl();
  @Output() mantenimientoConsultar = new EventEmitter<MantenimientoImpl>();
  @Output() mantenimientoEditar = new EventEmitter<MantenimientoImpl>();
  @Output() mantenimientoEliminar = new EventEmitter<MantenimientoImpl>();

  firstFormGroup = this._formBuilder.group({
    matricula: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern("(PGC|pgc)[0-9]{4}[A-Za-z]"),]],
    fechaAlta: ["", [Validators.required, isValidDateAlta]],
    marca: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    modelo: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    tipoVehiculo: ["", Validators.required],
    unidadDestino: [""],
    fechaAdjudicacion: [""],
  });

  secondFormGroup = this._formBuilder.group({
    bastidor: ["", [Validators.required,Validators.minLength(17)]],
    color: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    combustible: ["", Validators.required],
    cambio: ["", Validators.required],
    capacidadDeposito: ["", [Validators.required, Validators.min(0), Validators.max(1000), invalidCapacidadDeposito]],
    lubricanteMotor: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    capacidadCarter: ["", [Validators.required, Validators.min(0), Validators.max(50),invalidCapacidadCarter ]],
    presionNeumaticosDelanteros: ["", [Validators.required, Validators.min(0), Validators.max(10), invalidDiez]],
    presionNeumaticosTraseros: ["", [Validators.required, Validators.min(0), Validators.max(10), invalidDiez]],
    tipoCubiertas: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    numeroBaterias: ["", [Validators.required, Validators.min(0), Validators.max(10), invalidDiez]],
    voltajeBaterias: ["", [Validators.required]],
    amperajeBaterias: ["", [Validators.required, Validators.min(0), Validators.max(600), invalid600]],
    amperiosHoraBaterias: ["", [Validators.required, Validators.min(0), Validators.max(150), invalid150]],
    clasificacionMedioambiental: ["", Validators.required],
  });

  thirdFormGroup = this._formBuilder.group({
    condicionesUso: ["", Validators.required],
    operacionesSistematicasKm: ["", [Validators.required, Validators.min(0), Validators.max(1000000), invalid1000000]],
    operacionesSistematicasMes: ["", [Validators.required, Validators.min(0), Validators.max(200), invalid200]],
    liquidoFrenosKm: ["", [Validators.required, Validators.min(0),Validators.max(1000000), invalid1000000]],
    liquidoFrenosMes: ["", [Validators.required, Validators.min(0), Validators.max(200), invalid200]],    
    filtroAireKm: ["", [Validators.min(0), Validators.max(1000000), invalid1000000]],
    filtroAireMes: ["", [Validators.min(0), Validators.max(200), invalid200]],
    filtroAireHabitaculoKm: ["", [Validators.min(0), Validators.max(1000000), invalid1000000]],
    filtroAireHabitaculoMes: ["", [Validators.min(0), Validators.max(200), invalid200]],
    filtroCombustibleKm: ["", [Validators.min(0), Validators.max(1000000), invalid1000000]],
    filtroCombustibleMes: ["", [Validators.min(0), Validators.max(200), invalid200]],
    filtroAntipolenKm: ["", [Validators.min(0), Validators.max(1000000), invalid1000000]],
    filtroAntipolenMes: ["",[Validators.min(0), Validators.max(200), invalid200]],
    correaDistribucionKm: ["", [Validators.min(0), Validators.max(1000000), invalid1000000]],
    correaDistribucionMes: ["", Validators.min(0)],
    kitDistribucionKm: ["", [Validators.min(0), Validators.max(1000000), invalid1000000]],
    kitDistribucionMes: ["", [Validators.min(0), Validators.max(200), invalid200]],
    anticongelanteKm: ["", [Validators.required, Validators.min(0),Validators.max(1000000), invalid1000000]],
    anticongelanteMes: ["", [Validators.required, Validators.min(0), Validators.max(200), invalid200]],
    liquidoRefrigeracionKm: ["", [Validators.required, Validators.min(0), Validators.max(1000000), invalid1000000]],
    liquidoRefrigeracionMes: ["", [Validators.required, Validators.min(0), Validators.max(200), invalid200]],
    pHLiquidoRefrigeracionKm: ["", [Validators.min(0), Validators.max(1000000), invalid1000000]],
    pHLiquidoRefrigeracionMes: ["",[Validators.min(0), Validators.max(200), invalid200]],
    reglajeProyectoresKm: ["", [Validators.min(0), Validators.max(1000000), invalid1000000]],
    reglajeProyectoresMes: ["", [Validators.min(0), Validators.max(200), invalid200]],
    correaArrastreAccesoriosKm: ["", [Validators.min(0), Validators.max(1000000), invalid1000000]],
    correaArrastreAccesoriosMes: ["", [Validators.min(0), Validators.max(200), invalid200]],
    kitCorreaArrastreAccesoriosKm: ["", [Validators.min(0), Validators.max(1000000), invalid1000000]],
    kitCorreaArrastreAccesoriosMes: ["",[Validators.min(0), Validators.max(200), invalid200]],
    aceiteTransmisionKm: ["", [Validators.min(0), Validators.max(1000000), invalid1000000]],
    aceiteTransmisionMes: ["", [Validators.min(0), Validators.max(200), invalid200]],
    bujiasEncendidoKm: ["", [Validators.min(0), Validators.max(1000000), invalid1000000]],
    bujiasEncendidoMes: ["", [Validators.min(0), Validators.max(200), invalid200]],
  });
  
  constructor(
    private vehiculoService: VehiculoService,
    private datosTecnicosInteresService: DatosTecnicosInteresService,
    private mantenimientoPreventivoService: MantenimientoPreventivoService,
    private avisokmService: AvisokmService,
    private avisomesService: AvisomesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private mantenimientoService: MantenimientoService,
    private date:DatePipe
  ) {}

  ngOnInit(): void {
    let id: string = this.cargarVehiculo();
    this.vehiculoService.getVehiculo(id).subscribe((response) => {
      this.vehiculo = this.vehiculoService.mapearVehiculo(response);
      this.mantenimientoService.getmantenimientoVehiculo(id).subscribe(response => {
        this.mantenimientos = this.mantenimientoService.extraerMantenimientos(response);
        this.vehiculo.mantenimientos=this.mantenimientos;
        this.datosTecnicosInteresService.getDatosTecnicosInteresVehiculo(id).subscribe(response => {
          this.datosTecnicosInteres = this.datosTecnicosInteresService.mapearDatosTecnicosInteres(response);
        this.mantenimientoPreventivoService.getPP(id).subscribe(response => {
          this.mantenimientoPreventivo = this.mantenimientoPreventivoService.mapearMantenimientoPreventivo(response);
        this.avisokmService.getAvisoKm(id).subscribe(response => {
          
          this.avisokm = this.avisokmService.mapearAvisokm(response)
          })
        this.avisomesService.getAvisoMes(id).subscribe(response => {
         
          this.avisomes = this.avisomesService.mapearAvisoMes(response)
          })
        })
      })
    })
  });
  this.fechaMaxima=new Date();
    this.fechaBuena=this.date.transform(this.fechaMaxima,"yyyy-MM-dd");
}


  cargarVehiculo(): string {
    return this.activatedRoute.snapshot.params['id'];
  }

  onEditarVehiculo(): void {
    this.vehiculo.datosTecnicosInteres = `${this.urlEndpoint}datostecnicosinteres/${this.datosTecnicosInteres.id}`;
    this.vehiculo.planespreventivos = `${this.urlEndpoint}planespreventivos/${this.mantenimientoPreventivo.id}`;
    this.vehiculo.avisokms = `${this.urlEndpoint}avisokms/${this.avisokm.id}`;
    this.vehiculo.avisomes = `${this.urlEndpoint}avisomeses/${this.avisomes.id}`;

 

    this.vehiculoService.updateVehiculo(this.vehiculo).subscribe();

    this.datosTecnicosInteresService
      .updateDatosTecnicosInteres(this.datosTecnicosInteres)
      .subscribe();

    this.mantenimientoPreventivoService
      .updateMantenimmientoPreventivo(this.mantenimientoPreventivo)
      .subscribe();

    this.avisokmService
      .updateAvisokm(this.avisokm, this.mantenimientoPreventivo, this.vehiculo.kilometrosActuales)
      .subscribe();

    this.avisomesService
      .updateAvisoMes(this.avisomes, this.mantenimientoPreventivo, this.vehiculo.mesesActuales)
      .subscribe();

    this.router.navigate([`administrador`]);
  }

  onEditarVehiculo1(): void {
    this.vehiculo.datosTecnicosInteres = `${this.urlEndpoint}datostecnicosinteres/${this.datosTecnicosInteres.id}`;
    this.vehiculo.planespreventivos = `${this.urlEndpoint}planespreventivos/${this.mantenimientoPreventivo.id}`;
    this.vehiculo.avisokms = `${this.urlEndpoint}avisokms/${this.avisokm.id}`;
    this.vehiculo.avisomes = `${this.urlEndpoint}avisomeses/${this.avisomes.id}`;

   

    this.vehiculoService.updateVehiculo(this.vehiculo).subscribe();

    this.datosTecnicosInteresService
      .updateDatosTecnicosInteres(this.datosTecnicosInteres)
      .subscribe();

    this.mantenimientoPreventivoService
      .updateMantenimmientoPreventivo(this.mantenimientoPreventivo)
      .subscribe();

    this.avisokmService
      .updateAvisokm(this.avisokm, this.mantenimientoPreventivo, this.vehiculo.kilometrosActuales)
      .subscribe();

    this.router.navigate([`administrador/editar/${this.vehiculo.id}`]);
  }

  verDatosVehiculo(vehiculo: Vehiculo): void {
    this.vehiculo = vehiculo;
  }

  verDatosMR(mantenimiento: MantenimientoImpl): void {
    this.mantenimientoVerDatos = mantenimiento;
  }

  onMantenimientoEditar(mantenimiento: MantenimientoImpl) {
    this.verDatosMR(mantenimiento);
   
    let url = `administrador/mantenimientosrealizados/editar/${mantenimiento.id}`;
    this.router.navigate([url]);
  }

  consultarMR(): void {
    this.mantenimientoConsultar.emit(this.mantenimiento);
  }

  onMantenimientoEliminar(mantenimiento: MantenimientoImpl) {
    this.mantenimientoService.deleteMantenimiento(mantenimiento.id).subscribe();
  }

  volver= faArrowLeft;
  
  rol:any=sessionStorage.getItem('ROLE');
  
goBack(){
  
  if(this.rol=='ADMIN'){
    this.router.navigate(['/administrador']);
  }
  if(this.rol=='USER'){
    this.router.navigate(['/usuario']);
  }
}

 
}

export const isValidDateAlta=(c:FormControl)=>{
  let hoy:Date= new Date();
  let fecha:Date=new Date(c.value);
  if(fecha>hoy){
   return {
    validateDate:true
  };
  }else{
      return null;
  }
  }

  export const invalidCapacidadDeposito=(c:FormControl)=>{
    let max:number=1000;
    let min:number=0;
    if(c.value<min||c.value>max){
      return{
        number:true
      };
    }else{
      return null;
    }
  }
  
  export const invalidCapacidadCarter=(c:FormControl)=>{
    let max:number=50;
    let min:number=0;
    if(c.value<min||c.value>max){
      return{
        number:true
      };
    }else{
      return null;
    }
  }
  
  export const invalidDiez=(c:FormControl)=>{
    let max:number=10;
    let min:number=0;
    if(c.value<min||c.value>max){
      return{
        number:true
      };
    }else{
      return null;
    }
  }
  
  export const invalid150=(c:FormControl)=>{
    let max:number=150;
    let min:number=0;
    if(c.value<min||c.value>max){
      return{
        number:true
      };
    }else{
      return null;
    }
  }
  
  export const invalid600=(c:FormControl)=>{
    let max:number=600;
    let min:number=0;
    if(c.value<min||c.value>max){
      return{
        number:true
      };
    }else{
      return null;
    }
  }
  
  export const invalid1000000=(c:FormControl)=>{
    let max:number=1000000;
    let min:number=0;
    if(c.value<min||c.value>max){
      return{
        number:true
      };
    }else{
      return null;
    }
  }
  
  export const invalid200=(c:FormControl)=>{
    let max:number=200;
    let min:number=0;
    if(c.value<min||c.value>max){
      return{
        number:true
      };
    }else{
      return null;
    }
  }
