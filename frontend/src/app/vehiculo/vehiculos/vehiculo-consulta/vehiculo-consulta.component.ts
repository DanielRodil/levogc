import { Component, EventEmitter, Input, OnInit, Output, Pipe, PipeTransform } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DatosTecnicosInteres } from "../../models/datos-tecnicos-interes";
import { DatosTecnicosInteresImpl } from "../../models/datos-tecnicos-interes-impl";
import { MantenimientoPreventivoImpl } from "../../models/planes-preventivos-impl";
import { Vehiculo } from "../../models/vehiculo";
import { VehiculoImpl } from "../../models/vehiculo-impl";
import { DatosTecnicosInteresService } from "../../service/datos-tecnicos-interes.service";
import { MantenimientoPreventivoService } from "../../service/mantenimiento-preventivo.service";
import { VehiculoService } from "../../service/vehiculo.service";
import { FormBuilder, Validators } from "@angular/forms";
import { MantenimientoImpl } from "../../models/mantenimiento-impl";
import { Mantenimiento } from "../../models/mantenimiento";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { MantenimientoService } from "../../service/mantenimiento.service";
import { AvisokmService } from "src/app/administrador/service/avisokm.service";
import { AvisomesService } from "src/app/administrador/service/avisomes.service";
import { Avisokm } from "src/app/administrador/models/avisokm";
import { Avisomes } from "src/app/administrador/models/avisomes";

@Component({
  selector: "app-vehiculo-consulta",
  templateUrl: "./vehiculo-consulta.component.html",
  styleUrls: ["./vehiculo-consulta.component.css"],
})

export class VehiculoConsultaComponent implements OnInit {

  vehiculo: Vehiculo = new VehiculoImpl();
  mantenimiento: Mantenimiento = new MantenimientoImpl();
  mantenimientosVerDatos: MantenimientoImpl[] = [];
  avisokm!: Avisokm;
  avisomes!: Avisomes;
  // mantenimientoPreventivoVerDatos: MantenimientoPreventivoImpl = new MantenimientoPreventivoImpl();
  // datosTecnicosInteresVerDatos: DatosTecnicosInteresImpl = new DatosTecnicosInteresImpl();

  @Input() datosTecnicosInteres: DatosTecnicosInteres = new DatosTecnicosInteresImpl();
  @Output() datosTecnicosInteresConsultar = new EventEmitter<DatosTecnicosInteresImpl>();

  @Input() mantenimientoPreventivo: MantenimientoPreventivoImpl = new MantenimientoPreventivoImpl();
  @Output() mantenimientoPreventivoConsultar = new EventEmitter<MantenimientoPreventivoImpl>();

  @Input() mantenimientos: Mantenimiento[] = [];
  @Output() mantenimientoConsultar = new EventEmitter<MantenimientoImpl>();

  firstFormGroup = this._formBuilder.group({
    matricula: [""],
    fechaAlta: [""],
    marca: [""],
    modelo: [""],
    tipoVehiculo: [""],
    unidadDestino: [""],
    fechaAdjudicacion: [""],
  });

  secondFormGroup = this._formBuilder.group({
    bastidor: [""],
    color: [""],
    combustible: [""],
    cambio: [""],
    capacidadDeposito: [""],
    lubricanteMotor: [""],
    capacidadCarter: [""],
    presionNeumaticosDelanteros: [""],
    presionNeumaticosTraseros: [""],
    tipoCubiertas: [""],
    numeroBaterias: [""],
    voltajeBaterias: [""],
    amperajeBaterias: [""],
    amperiosHoraBaterias: [""],
    clasificacionMedioambiental: [""],
  });

  thirdFormGroup = this._formBuilder.group({
    condicionesUso: ["", Validators.required],
    observaciones: [""],
    operacionesSistematicasKm: ["", [Validators.required, Validators.min(0)]],
    operacionesSistematicasMes: ["", [Validators.required, Validators.min(0)]],
    liquidoFrenosKm: ["", [Validators.required, Validators.min(0)]],
    liquidoFrenosMes: ["", [Validators.required, Validators.min(0)]],    
    filtroAireKm: ["", Validators.min(0)],
    filtroAireMes: ["", Validators.min(0)],
    filtroAireHabitaculoKm: ["", Validators.min(0)],
    filtroAireHabitaculoMes: ["", Validators.min(0)],
    filtroCombustibleKm: ["", Validators.min(0)],
    filtroCombustibleMes: ["", Validators.min(0)],
    filtroAntipolenKm: ["", Validators.min(0)],
    filtroAntipolenMes: ["",Validators.min(0)],
    correaDistribucionKm: ["", Validators.min(0)],
    correaDistribucionMes: ["", Validators.min(0)],
    kitDistribucionKm: ["", Validators.min(0)],
    kitDistribucionMes: ["", Validators.min(0)],
    anticongelanteKm: ["", [Validators.required, Validators.min(0)]],
    anticongelanteMes: ["", [Validators.required, Validators.min(0)]],
    liquidoRefrigeracionKm: ["", [Validators.required, Validators.min(0)]],
    liquidoRefrigeracionMes: ["", [Validators.required, Validators.min(0)]],
    pHLiquidoRefrigeracionKm: ["", Validators.min(0)],
    pHLiquidoRefrigeracionMes: [""],
    reglajeProyectoresKm: ["", Validators.min(0)],
    reglajeProyectoresMes: ["", Validators.min(0)],
    correaArrastreAccesoriosKm: ["", Validators.min(0)],
    correaArrastreAccesoriosMes: ["", Validators.min(0)],
    kitCorreaArrastreAccesoriosKm: ["", Validators.min(0)],
    kitCorreaArrastreAccesoriosMes: [""],
    
    aceiteTransmisionKm: ["", Validators.min(0)],
    aceiteTransmisionMes: ["", Validators.min(0)],
    bujiasEncendidoKm: ["", Validators.min(0)],
    bujiasEncendidoMes: ["", Validators.min(0)],
  });
  constructor(
    private vehiculoService: VehiculoService,
    private datosTecnicosInteresService: DatosTecnicosInteresService,
    private mantenimientoPreventivoService: MantenimientoPreventivoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder, private mantenimientoService: MantenimientoService,
    private avisokmService: AvisokmService, private avisomesService: AvisomesService
  ) {}

  ngOnInit(): void {

    let id: string = this.cargarVehiculo();
    this.vehiculoService.getVehiculo(id).subscribe((response) => {
      this.vehiculo = this.vehiculoService.mapearVehiculo(response);
      this.mantenimientoService.getmantenimientoVehiculo(id).subscribe(response => {
        this.mantenimientos = this.mantenimientoService.extraerMantenimientos(response).sort();
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

  }

  cargarVehiculo(): string {
    return this.activatedRoute.snapshot.params["id"];
  }

  consultarMR(): void {
    this.mantenimientoConsultar.emit(this.mantenimiento);
  }

  onMantenimientoConsultar(mantenimientos: MantenimientoImpl[]) {
    this.verDatosMR(mantenimientos);
    let url = `mantenimientosrealizados/consultar/${this.vehiculo.id}`;
    this.router.navigate([url]);
  }

  verDatosMR(mantenimientos: MantenimientoImpl[]): void {
    this.mantenimientosVerDatos = mantenimientos;
  }
  rol:any=sessionStorage.getItem('ROLE');
  
  
  goBack(){
    
    if(this.rol=='ADMIN'){
      this.router.navigate(['/administrador']);
    }
    if(this.rol=='USER'){
      this.router.navigate(['/usuario']);
    }
  }

  volver= faArrowLeft;
}

