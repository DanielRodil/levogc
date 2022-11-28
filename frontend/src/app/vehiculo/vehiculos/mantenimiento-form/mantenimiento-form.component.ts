import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Avisokm } from "src/app/administrador/models/avisokm";
import { Avisomes } from "src/app/administrador/models/avisomes";
import { AvisokmService } from "src/app/administrador/service/avisokm.service";
import { AvisomesService } from "src/app/administrador/service/avisomes.service";
import { environment } from "src/environments/environment";
import { DatosTecnicosInteres } from "../../models/datos-tecnicos-interes";
import { Mantenimiento } from "../../models/mantenimiento";
import { MantenimientoImpl } from "../../models/mantenimiento-impl";
import { MantenimientoPreventivo } from "../../models/planes-preventivos";
import { Vehiculo } from "../../models/vehiculo";
import { DatosTecnicosInteresService } from "../../service/datos-tecnicos-interes.service";
import { MantenimientoPreventivoService } from "../../service/mantenimiento-preventivo.service";
import { MantenimientoService } from "../../service/mantenimiento.service";
import { VehiculoService } from "../../service/vehiculo.service";

@Component({
  selector: "app-mantenimiento-form",
  templateUrl: "./mantenimiento-form.component.html",
  styleUrls: ["./mantenimiento-form.component.css"],
})
export class MantenimientoFormComponent implements OnInit {

  private host: string = environment.host;
  private urlEndPoint: string = `${this.host}vehiculos`;

  volver= faArrowLeft;

  mantenimiento: Mantenimiento = new MantenimientoImpl();
  vehiculo!: Vehiculo;
  datosTecnicosInteres!: DatosTecnicosInteres;
  mantenimientoPreventivo!: MantenimientoPreventivo;
  avisokm!: Avisokm;
  avisomes!: Avisomes;

  fechaMaxima!:Date;
  fechaBuena!:string|null;

  constructor(
    private vehiculoService: VehiculoService,
    private mantenimientoService: MantenimientoService,
    private mantenimientoPreventivoService: MantenimientoPreventivoService,
    private datosTecnicosInteresService: DatosTecnicosInteresService,
    private avisokmService: AvisokmService,
    private avisomesService: AvisomesService,
    private activatedRoute: ActivatedRoute,
    private router: Router, private date:DatePipe 
  ) {}

  ngOnInit(): void {
    let id: string = this.cargarId();
   
    this.vehiculoService.getVehiculo(id).subscribe((response) => {
      this.vehiculo = this.vehiculoService.mapearVehiculo(response);
      this.datosTecnicosInteresService.getDatosTecnicosInteresVehiculo(id).subscribe(response => {
        this.datosTecnicosInteres = this.datosTecnicosInteresService.mapearDatosTecnicosInteres(response);})
      this.mantenimientoPreventivoService.getPP(id).subscribe(response => {
        this.mantenimientoPreventivo = this.mantenimientoPreventivoService.mapearMantenimientoPreventivo(response);})
      this.avisokmService.getAvisoKm(id).subscribe(response => {
        this.avisokm = this.avisokmService.mapearAvisokm(response)})
      this.avisomesService.getAvisoMes(id).subscribe(response => {
        this.avisomes = this.avisomesService.mapearAvisoMes(response)})
 

    });

    this.fechaMaxima=new Date();
    this.fechaBuena=this.date.transform(this.fechaMaxima,"yyyy-MM-dd");
  }

  cargarId(): string {
    return this.activatedRoute.snapshot.params["id"];
  }

  onAddMantenimiento(): void {
    this.mantenimiento.vehiculo = `${this.urlEndPoint}/${this.vehiculo.id}`;
    this.mantenimientoService.crearMantenimiento(this.mantenimiento).subscribe(response =>{
      this.vehiculo.kilometrosActuales = response.kilometrosMantenimiento;

      response.mesesMantenimiento = this.avisomesService.monthDiff(this.vehiculo.fechaAlta, response.fechaMantenimiento);
      this.vehiculo.mesesActuales = response.mesesMantenimiento;

     

      // this.vehiculo.mesesActuales = 6;

      if (response.liquidoFrenos === true) {
        this.mantenimientoPreventivo.liquidoFrenosKm += response.kilometrosMantenimiento;
        this.mantenimientoPreventivo.liquidoFrenosMes += response.mesesMantenimiento;
      } else if (response.liquidoFrenos === false) {
        this.mantenimientoPreventivo.liquidoFrenosKm = this.mantenimientoPreventivo.liquidoFrenosKm;
        this.mantenimientoPreventivo.liquidoFrenosMes = this.mantenimientoPreventivo.liquidoFrenosMes;
      }
      
      if (response.operacionesSistematicas === true) {
        this.mantenimientoPreventivo.operacionesSistematicasKm += response.kilometrosMantenimiento;
        this.mantenimientoPreventivo.operacionesSistematicasMes += response.mesesMantenimiento;
      } else if (response.operacionesSistematicas === false) {
        this.mantenimientoPreventivo.operacionesSistematicasMes = this.mantenimientoPreventivo.operacionesSistematicasMes;
      } 

      if (response.filtroAire === true) {
        this.mantenimientoPreventivo.filtroAireKm += response.kilometrosMantenimiento;
        this.mantenimientoPreventivo.filtroAireMes += response.mesesMantenimiento;
      } else if (response.filtroAire === false) {
        this.mantenimientoPreventivo.filtroAireKm = this.mantenimientoPreventivo.filtroAireKm;
        this.mantenimientoPreventivo.filtroAireMes = this.mantenimientoPreventivo.filtroAireMes;
      } 

      if (response.filtroAireHabitaculo === true) {
        this.mantenimientoPreventivo.filtroAireHabitaculoKm += response.kilometrosMantenimiento;
        this.mantenimientoPreventivo.filtroAireHabitaculoMes += response.mesesMantenimiento;
      } else if (response.filtroAireHabitaculo === false) {
        this.mantenimientoPreventivo.filtroAireHabitaculoKm = this.mantenimientoPreventivo.filtroAireHabitaculoKm;
        this.mantenimientoPreventivo.filtroAireHabitaculoMes = this.mantenimientoPreventivo.filtroAireHabitaculoMes;
      } 

      if (response.filtroCombustible === true) {
        this.mantenimientoPreventivo.filtroCombustibleKm += response.kilometrosMantenimiento;
        this.mantenimientoPreventivo.filtroCombustibleMes += response.mesesMantenimiento;
      } else if (response.filtroCombustible === false) {
        this.mantenimientoPreventivo.filtroCombustibleKm = this.mantenimientoPreventivo.filtroCombustibleKm;
        this.mantenimientoPreventivo.filtroCombustibleMes = this.mantenimientoPreventivo.filtroCombustibleMes;
      }
      
      if (response.filtroAntipolen === true) {
        this.mantenimientoPreventivo.filtroAntipolenKm += response.kilometrosMantenimiento;
        this.mantenimientoPreventivo.filtroAntipolenMes += response.mesesMantenimiento;
      } else if (response.filtroAntipolen === false) {
        this.mantenimientoPreventivo.filtroAntipolenKm = this.mantenimientoPreventivo.filtroAntipolenKm;
        this.mantenimientoPreventivo.filtroAntipolenMes = this.mantenimientoPreventivo.filtroAntipolenMes;
      }
      
      if (response.correaDistribucion === true) {
        this.mantenimientoPreventivo.correaDistribucionKm += response.kilometrosMantenimiento;
        this.mantenimientoPreventivo.correaDistribucionMes += response.mesesMantenimiento;
      } else if (response.correaDistribucion === false) {
        this.mantenimientoPreventivo.correaDistribucionKm = this.mantenimientoPreventivo.correaDistribucionKm;
        this.mantenimientoPreventivo.correaDistribucionMes = this.mantenimientoPreventivo.correaDistribucionMes;
      }
      
      if (response.kitDistribucion === true) {
        this.mantenimientoPreventivo.kitDistribucionKm += response.kilometrosMantenimiento;
        this.mantenimientoPreventivo.kitDistribucionMes += response.mesesMantenimiento;
      } else if (response.kitDistribucion === false) {
        this.mantenimientoPreventivo.kitDistribucionKm = this.mantenimientoPreventivo.kitDistribucionKm;
        this.mantenimientoPreventivo.kitDistribucionMes = this.mantenimientoPreventivo.kitDistribucionMes;
      }
      
      if (response.reglajeProyectores === true) {
        this.mantenimientoPreventivo.reglajeProyectoresKm += response.kilometrosMantenimiento;
        this.mantenimientoPreventivo.reglajeProyectoresMes += response.mesesMantenimiento;
      } else if (response.reglajeProyectores === false) {
        this.mantenimientoPreventivo.reglajeProyectoresKm = this.mantenimientoPreventivo.reglajeProyectoresKm;
        this.mantenimientoPreventivo.reglajeProyectoresMes = this.mantenimientoPreventivo.reglajeProyectoresMes;
      }

      if (response.pHLiquidoRefrigeracion === true) {
        this.mantenimientoPreventivo.pHLiquidoRefrigeracionKm += response.kilometrosMantenimiento;
        this.mantenimientoPreventivo.pHLiquidoRefrigeracionMes += response.mesesMantenimiento;
      } else if (response.pHLiquidoRefrigeracion === false) {
        this.mantenimientoPreventivo.pHLiquidoRefrigeracionKm = this.mantenimientoPreventivo.pHLiquidoRefrigeracionKm;
        this.mantenimientoPreventivo.pHLiquidoRefrigeracionMes = this.mantenimientoPreventivo.pHLiquidoRefrigeracionMes;
      }

      if (response.liquidoRefrigeracion === true) {
        this.mantenimientoPreventivo.liquidoRefrigeracionKm += response.kilometrosMantenimiento;
        this.mantenimientoPreventivo.liquidoRefrigeracionMes += response.mesesMantenimiento;
      } else if (response.liquidoRefrigeracion === false) {
        this.mantenimientoPreventivo.liquidoRefrigeracionKm = this.mantenimientoPreventivo.liquidoRefrigeracionKm;
        this.mantenimientoPreventivo.liquidoRefrigeracionMes = this.mantenimientoPreventivo.liquidoRefrigeracionMes;
      }

      if (response.correaArrastreAccesorios === true) {
        this.mantenimientoPreventivo.correaArrastreAccesoriosKm += response.kilometrosMantenimiento;
        this.mantenimientoPreventivo.correaArrastreAccesoriosMes += response.mesesMantenimiento;
      } else if (response.correaArrastreAccesorios === false) {
        this.mantenimientoPreventivo.correaArrastreAccesoriosKm = this.mantenimientoPreventivo.correaArrastreAccesoriosKm;
        this.mantenimientoPreventivo.correaArrastreAccesoriosMes = this.mantenimientoPreventivo.correaArrastreAccesoriosMes;
      }

      if (response.kitCorreaArrastreAccesorios === true) {
        this.mantenimientoPreventivo.kitCorreaArrastreAccesoriosKm += response.kilometrosMantenimiento;
        this.mantenimientoPreventivo.kitCorreaArrastreAccesoriosMes += response.mesesMantenimiento;
      } else if (response.kitCorreaArrastreAccesorios === false) {
        this.mantenimientoPreventivo.kitCorreaArrastreAccesoriosKm = this.mantenimientoPreventivo.kitCorreaArrastreAccesoriosKm;
        this.mantenimientoPreventivo.kitCorreaArrastreAccesoriosMes = this.mantenimientoPreventivo.kitCorreaArrastreAccesoriosMes;
      }

      if (response.anticongelante === true) {
        this.mantenimientoPreventivo.anticongelanteKm += response.kilometrosMantenimiento;
        this.mantenimientoPreventivo.anticongelanteMes += response.mesesMantenimiento;
      } else if (response.anticongelante === false) {
        this.mantenimientoPreventivo.anticongelanteKm = this.mantenimientoPreventivo.anticongelanteKm;
        this.mantenimientoPreventivo.anticongelanteMes = this.mantenimientoPreventivo.anticongelanteMes;
      }

      if (response.aceiteTransmision === true) {
        this.mantenimientoPreventivo.aceiteTransmisionKm += response.kilometrosMantenimiento;
        this.mantenimientoPreventivo.aceiteTransmisionMes += response.mesesMantenimiento;
      } else if (response.aceiteTransmision === false) {
        this.mantenimientoPreventivo.aceiteTransmisionKm = this.mantenimientoPreventivo.aceiteTransmisionKm;
        this.mantenimientoPreventivo.aceiteTransmisionMes = this.mantenimientoPreventivo.aceiteTransmisionMes;
      }

      if (response.bujiasEncendido === true) {
        this.mantenimientoPreventivo.bujiasEncendidoKm += response.kilometrosMantenimiento;
        this.mantenimientoPreventivo.bujiasEncendidoMes += response.mesesMantenimiento;
      } else if (response.bujiasEncendido === false) {
        this.mantenimientoPreventivo.bujiasEncendidoKm = this.mantenimientoPreventivo.bujiasEncendidoKm;
        this.mantenimientoPreventivo.bujiasEncendidoMes = this.mantenimientoPreventivo.bujiasEncendidoMes;
      }
      
      this.vehiculo.datosTecnicosInteres = `${this.host}datostecnicosinteres/${this.datosTecnicosInteres.id}`;
      this.vehiculo.planespreventivos = `${this.host}planespreventivos/${this.mantenimientoPreventivo.id}`;
      this.vehiculo.avisokms = `${this.host}avisokms/${this.avisokm.id}`;
      this.vehiculo.avisomes = `${this.host}avisomeses/${this.avisomes.id}`;

      this.mantenimientoPreventivoService.updateMantenimmientoPreventivo(this.mantenimientoPreventivo).subscribe();

      this.vehiculoService.updateVehiculo(this.vehiculo).subscribe(response => {
        this.avisokmService.updateAvisokm(this.avisokm, this.mantenimientoPreventivo, response.kilometrosActuales).subscribe(response => {
          this.avisomesService.updateAvisoMes(this.avisomes,this.mantenimientoPreventivo, this.vehiculo.mesesActuales).subscribe();
        });
      });

    });

    // this.router.navigate([`administrador/consultar/${this.vehiculo.id}`]);
    this.router.navigate([`administrador`]);
  }

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