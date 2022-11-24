import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
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

@Component({
  selector: "app-formulario",
  templateUrl: "./formulario.component.html",
  styleUrls: ["./formulario.component.css"],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})

export class FormularioComponent implements OnInit {

  vehiculo: Vehiculo = new VehiculoImpl();
  datosTecnicosInteres: DatosTecnicosInteres = new DatosTecnicosInteresImpl();
  mantenimientoPreventivo: MantenimientoPreventivoImpl = new MantenimientoPreventivoImpl();
  tipoVehiculo;

  firstFormGroup = this._formBuilder.group({
    matricula: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern("(PGC|pgc)[0-9]{4}[A-Za-z]")]],
    fechaAlta: ["", Validators.required],
    marca: ["", [Validators.required, Validators.minLength(2)]],
    modelo: ["", Validators.required],
    tipoVehiculo: ["", Validators.required],
    unidadDestino: [""],
    fechaAdjudicacion: [""],
  });

  secondFormGroup = this._formBuilder.group({
    bastidor: ["", [Validators.required,Validators.minLength(17)]],
    color: ["", Validators.required],
    combustible: ["", Validators.required],
    cambio: ["", Validators.required],
    capacidadDeposito: ["", [Validators.required, Validators.min(0)]],
    lubricanteMotor: ["", Validators.required],
    capacidadCarter: ["", Validators.required],
    presionNeumaticosDelanteros: ["", [Validators.required, Validators.min(0)]],
    presionNeumaticosTraseros: ["", [Validators.required, Validators.min(0)]],
    tipoCubiertas: ["", Validators.required],
    numeroBaterias: ["", [Validators.required, Validators.min(0)]],
    voltajeBaterias: ["", [Validators.required, Validators.min(0)]],
    amperajeBaterias: ["", [Validators.required, Validators.min(0)]],
    amperiosHoraBaterias: ["", [Validators.required, Validators.min(0)]],
    clasificacionMedioambiental: ["", Validators.required],
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
    private _formBuilder: FormBuilder,
    private vehiculoService: VehiculoService,
    private avisoKmService: AvisokmService,
    private avisomesService: AvisomesService,
    private datosTecnicosInteresService: DatosTecnicosInteresService,
    private mantenimientoPreventivoService: MantenimientoPreventivoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.tipoVehiculo = ["Turismo", "Todo Terreno", "Motocicleta", "Otros"];
  }

  ngOnInit(): void { }

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
