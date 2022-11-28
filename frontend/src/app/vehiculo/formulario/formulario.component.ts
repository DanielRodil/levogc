import { Component, Injectable, Injector, OnInit } from "@angular/core";
import { AbstractControl, AsyncValidator, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { Router, ActivatedRoute } from "@angular/router";
import { DatosTecnicosInteresService } from "../service/datos-tecnicos-interes.service";
import { MantenimientoPreventivoService } from "../service/mantenimiento-preventivo.service";
import { VehiculoService } from "../service/vehiculo.service";
import { DatosTecnicosInteres } from "../models/datos-tecnicos-interes";
import { DatosTecnicosInteresImpl } from "../models/datos-tecnicos-interes-impl";
import { MantenimientoPreventivoImpl } from "../models/planes-preventivos-impl";
import { Vehiculo } from "../models/vehiculo";
import { VehiculoImpl } from "../models/vehiculo-impl";
import { faArrowLeft, faBackwardStep } from "@fortawesome/free-solid-svg-icons";
import { AvisokmService } from "src/app/administrador/service/avisokm.service";
import { AvisomesService } from "src/app/administrador/service/avisomes.service";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";
import { firstValueFrom, Observable, Subject } from "rxjs";
import { DatePipe } from "@angular/common";

@Injectable()
  export class ValidateMatricula {

    constructor(private vehiculoService: VehiculoService){}

  // validate(c: AbstractControl<any, any>): any {
  //   var subject=new Subject();
  //     this.vehiculoService
  //     .getBusquedaPorMatricula(c.value)
  //     .subscribe((response) => { 
  //       let vehiculos = this.vehiculoService.extraerVehiculos(response);
  //       if(vehiculos.length!=0){

  //         subject.next({validateDate:true});
             
  //       }else{
  //         subject.next(null)
  //         };
  //      });
  //      return subject.asObservable();
  // }
  // registerOnValidatorChange?(fn: () => void): void {
  //   throw new Error("Method not implemented.");
  // }

   isValidateMatricula(c: FormControl):any{
      
      let resultado=false;
      let vehiculos:VehiculoImpl[]=[];
      this.vehiculoService
      .getBusquedaPorMatricula(c.value)
      .subscribe((response) => { 
       vehiculos = this.vehiculoService.extraerVehiculos(response);
        if(vehiculos.length!=0){
          resultado=true
          
        }else{
          resultado = false;
          };
       });
           return resultado;
      

      //  if(resultado==true){
      //   return {
      //   validateDate:true
      //  };
      //  }else{
      //   return null;
      //  }
    }
}
@Component({
  selector: "app-formulario",
  templateUrl: "./formulario.component.html",
  styleUrls: ["./formulario.component.css"],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
    ValidateMatricula
  ],
})

export class FormularioComponent implements OnInit {

  vehiculo: Vehiculo = new VehiculoImpl();
  datosTecnicosInteres: DatosTecnicosInteres = new DatosTecnicosInteresImpl();
  mantenimientoPreventivo: MantenimientoPreventivoImpl = new MantenimientoPreventivoImpl();
  tipoVehiculo;

  maxDate:Date=new Date();
  
  fechaMaxima!:Date;
  fechaBuena!:string|null;

  firstFormGroup = this._formBuilder.group({
    matricula: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern("(PGC|pgc)[0-9]{4}[A-Za-z]"), this.validateMatricula.isValidateMatricula.bind(this.validateMatricula)]],
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
    private _formBuilder: FormBuilder,
    private vehiculoService: VehiculoService,
    private avisoKmService: AvisokmService,
    private avisomesService: AvisomesService,
    private datosTecnicosInteresService: DatosTecnicosInteresService,
    private mantenimientoPreventivoService: MantenimientoPreventivoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private validateMatricula: ValidateMatricula, private date:DatePipe
  ) {
    this.tipoVehiculo = ["Turismo", "Todo Terreno", "Motocicleta", "Otros"];
  }

  ngOnInit(): void {
    this.fechaMaxima=new Date();
    this.fechaBuena=this.date.transform(this.fechaMaxima,"yyyy-MM-dd");
  }

  cargarId(): string {
    return this.activatedRoute.snapshot.params["id"];
  }

  create(): void {
    this.vehiculoService.crearVehiculo(this.vehiculo);
    this.datosTecnicosInteresService.creardatosTecnicosInteres(this.datosTecnicosInteres);
    this.mantenimientoPreventivoService.crearMantenimientoPreventivo(this.mantenimientoPreventivo);
  }

  onAddVehiculo(): void {
    this.datosTecnicosInteresService
      .creardatosTecnicosInteres(this.datosTecnicosInteres)
      .subscribe((datosTecnicos) => {

        this.vehiculo.datosTecnicosInteres =
          datosTecnicos._links.datotecnicointeres.href;

        this.mantenimientoPreventivoService
          .crearMantenimientoPreventivo(this.mantenimientoPreventivo)
          .subscribe((planPreventivo) => {
            this.vehiculo.planespreventivos = planPreventivo._links.planpreventivo.href;
           
            this.vehiculo.kilometrosActuales = 0; //para editar se omite esta linea
            this.vehiculo.mesesActuales = 0; //para editar se omite esta linea
            this.avisoKmService.crearAvisoKm(this.mantenimientoPreventivo, this.vehiculo.kilometrosActuales ).subscribe(response => {
              this.vehiculo.avisokms = response._links.avisokm.href;
                            this.avisomesService.crearAvisoMes(this.mantenimientoPreventivo, this.vehiculo.mesesActuales ).subscribe(response => {
                this.vehiculo.avisomes = response._links.avisomes.href;
                
                this.vehiculoService.crearVehiculo(this.vehiculo).subscribe();
            })

            })
          });
      });       

    // let id: string = this.cargarId();
    // this.router.navigate([`/vehiculos/consultar/${id}`]);
  }

  onAddDatosTecnicosInteres(): void {
    let id: string = this.cargarId();
    this.router.navigate([`/datostecnicosinteres/editar/${id}`]);
  }

  onAddMantenimientoPreventivo(): void {
    let id: string = this.cargarId();
    this.router.navigate([`/planespreventivos/editar/${id}`]);
  }

  volver= faArrowLeft;

  goBack(){
    this.router.navigate(['/administrador'])
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