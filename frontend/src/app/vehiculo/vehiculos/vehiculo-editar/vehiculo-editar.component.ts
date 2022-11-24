import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  @Input() mantenimiento: Mantenimiento = new MantenimientoImpl();
  @Output() mantenimientoConsultar = new EventEmitter<MantenimientoImpl>();
  @Output() mantenimientoEditar = new EventEmitter<MantenimientoImpl>();
  @Output() mantenimientoEliminar = new EventEmitter<MantenimientoImpl>();

  firstFormGroup = this._formBuilder.group({
    matricula: [''],
    fechaAlta: [''],
    marca: [''],
    modelo: [''],
    tipoVehiculo: [''],
    unidadDestino: [''],
    fechaAdjudicacion: [''],
  });

  secondFormGroup = this._formBuilder.group({
    bastidor: [''],
    color: [''],
    combustible: [''],
    cambio: [''],
    capacidadDeposito: [''],
    lubricanteMotor: [''],
    capacidadCarter: [''],
    presionNeumaticosDelanteros: [''],
    presionNeumaticosTraseros: [''],
    tipoCubiertas: [''],
    numeroBaterias: [''],
    voltajeBaterias: [''],
    amperajeBaterias: [''],
    amperiosHoraBaterias: [''],
    clasificacionMedioambiental: [''],
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
    private avisokmService: AvisokmService,
    private avisomesService: AvisomesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private mantenimientoService: MantenimientoService
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
  })
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

    this.router.navigate([`administrador/consultar/${this.vehiculo.id}`]);
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
