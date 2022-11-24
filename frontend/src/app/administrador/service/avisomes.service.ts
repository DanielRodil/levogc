import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { MantenimientoPreventivo } from 'src/app/vehiculo/models/planes-preventivos';
import { environment } from 'src/environments/environment.prod';
import { Avisomes } from '../models/avisomes';
import { AvisomesImpl } from '../models/avisomes-impl';

@Injectable({
  providedIn: 'root'
})
export class AvisomesService {

  private host: string = environment.host;
  private urlEndPoint: string = `${this.host}avisomeses`;
  private urlEndPointPP: string = `${this.host}vehiculos`;

  constructor(private http: HttpClient) { }

  extraerAvisoMes(respuestaApi: any): Avisomes {
    let avisomes: Avisomes;
    avisomes = this.mapearAvisoMes(respuestaApi);
    return avisomes;
  }

  mapearAvisoMes(avisoMesApi: any): AvisomesImpl {
    let avisomes: Avisomes = new AvisomesImpl();
    avisomes.id = this.getId(avisoMesApi._links.avisomes.href);
    avisomes.mensajeMes = avisoMesApi.mensajeMes;
    avisomes.avisoLiquidoFrenosMes = avisoMesApi.avisoLiquidoFrenosMes ;
    avisomes.avisoOperacionesSistematicasMes = avisoMesApi.avisoOperacionesSistematicasMes;
    avisomes.avisoFiltroAireMes =  avisoMesApi.avisoFiltroAireMes;
    avisomes.avisoFiltroAireHabitaculoMes = avisoMesApi.avisoFiltroAireHabitaculoMes;
    avisomes.avisoFiltroCombustibleMes = avisoMesApi.avisoFiltroCombustibleMes;
    avisomes.avisoFiltroAntipolenMes = avisoMesApi.avisoFiltroAntipolenMes;
    avisomes.avisoCorreaDistribucionMes = avisoMesApi.avisoCorreaDistribucionMes ;
    avisomes.avisoKitDistribucionMes = avisoMesApi.avisoKitDistribucionMes;
    avisomes.avisoReglajeProyectoresMes = avisoMesApi.avisoReglajeProyectoresMes;
    avisomes.avisoPhLiquidoRefrigeracionMes = avisoMesApi.avisoPhLiquidoRefrigeracionMes;
    avisomes.avisoLiquidoRefrigeracionMes = avisoMesApi.avisoLiquidoRefrigeracionMes;
    avisomes.avisoCorreaArrastreAccesoriosMes = avisoMesApi.avisoCorreaArrastreAccesoriosMes;
    avisomes.avisoKitCorreaArrastreAccesoriosMes = avisoMesApi.avisoKitCorreaArrastreAccesoriosMes;
    avisomes.avisoAnticongelanteMes = avisoMesApi.avisoAnticongelanteMes;
    avisomes.avisoAceiteTransimisionMes = avisoMesApi.avisoAceiteTransimisionMes;
    avisomes.avisoBujiasEncendidoMes = avisoMesApi.avisoBujiasEncendidoMes;
    return avisomes;
  }

  getId(url: string): string {
    let posicionFinal: number = url.lastIndexOf("/");
    let numId: string = url.slice(posicionFinal + 1, url.length);
    return numId;
  }

  crearAvisoMes(mantenimientoPreventivo: MantenimientoPreventivo, mesesActuales: number): Observable<any> {
    let avisomes: Avisomes = new AvisomesImpl();

    avisomes.avisoLiquidoFrenosMes = this.actualizarMeses(mantenimientoPreventivo.liquidoFrenosMes, mesesActuales);
    avisomes.avisoOperacionesSistematicasMes = this.actualizarMeses(mantenimientoPreventivo.operacionesSistematicasMes, mesesActuales);
    avisomes.avisoFiltroAireMes = this.actualizarMeses(mantenimientoPreventivo.filtroAireMes, mesesActuales);
    avisomes.avisoFiltroAireHabitaculoMes = this.actualizarMeses(mantenimientoPreventivo.filtroAireHabitaculoMes, mesesActuales);
    avisomes.avisoFiltroCombustibleMes = this.actualizarMeses(mantenimientoPreventivo.filtroCombustibleMes, mesesActuales);
    avisomes.avisoFiltroAntipolenMes = this.actualizarMeses(mantenimientoPreventivo.filtroAntipolenMes, mesesActuales);
    avisomes.avisoCorreaDistribucionMes = this.actualizarMeses(mantenimientoPreventivo.correaDistribucionMes, mesesActuales);
    avisomes.avisoKitDistribucionMes = this.actualizarMeses(mantenimientoPreventivo.kitDistribucionMes, mesesActuales);
    avisomes.avisoReglajeProyectoresMes = this.actualizarMeses(mantenimientoPreventivo.reglajeProyectoresMes, mesesActuales);
    avisomes.avisoPhLiquidoRefrigeracionMes = this.actualizarMeses(mantenimientoPreventivo.pHLiquidoRefrigeracionMes, mesesActuales);
    avisomes.avisoLiquidoRefrigeracionMes = this.actualizarMeses(mantenimientoPreventivo.liquidoRefrigeracionMes, mesesActuales);
    avisomes.avisoCorreaArrastreAccesoriosMes = this.actualizarMeses(mantenimientoPreventivo.correaArrastreAccesoriosMes, mesesActuales);
    avisomes.avisoKitCorreaArrastreAccesoriosMes = this.actualizarMeses(mantenimientoPreventivo.kitCorreaArrastreAccesoriosMes, mesesActuales);
    avisomes.avisoAnticongelanteMes = this.actualizarMeses(mantenimientoPreventivo.anticongelanteMes, mesesActuales);
    avisomes.avisoAceiteTransimisionMes = this.actualizarMeses(mantenimientoPreventivo.aceiteTransmisionMes, mesesActuales);
    avisomes.avisoBujiasEncendidoMes = this.actualizarMeses(mantenimientoPreventivo.bujiasEncendidoMes, mesesActuales);

  

    return this.http.post(`${this.urlEndPoint}`, avisomes).pipe(
      catchError((e) => {
        if (e.status === 400) {
          return throwError(() => new Error(e));
        }
        if (e.roor.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(() => new Error(e));
      })
    );
  }

  updateAvisoMes(avisomes: Avisomes, mantenimientoPreventivo: MantenimientoPreventivo, mesesActuales: number): Observable<any> {

    console.log(mantenimientoPreventivo);
    console.log(mesesActuales);

    avisomes.avisoLiquidoFrenosMes = this.actualizarMeses(mantenimientoPreventivo.liquidoFrenosMes, mesesActuales);
    avisomes.avisoOperacionesSistematicasMes = this.actualizarMeses(mantenimientoPreventivo.operacionesSistematicasMes, mesesActuales);
    avisomes.avisoFiltroAireMes = this.actualizarMeses(mantenimientoPreventivo.filtroAireMes, mesesActuales);
    avisomes.avisoFiltroAireHabitaculoMes = this.actualizarMeses(mantenimientoPreventivo.filtroAireHabitaculoMes, mesesActuales);
    avisomes.avisoFiltroCombustibleMes = this.actualizarMeses(mantenimientoPreventivo.filtroCombustibleMes, mesesActuales);
    avisomes.avisoFiltroAntipolenMes = this.actualizarMeses(mantenimientoPreventivo.filtroAntipolenMes, mesesActuales);
    avisomes.avisoCorreaDistribucionMes = this.actualizarMeses(mantenimientoPreventivo.correaDistribucionMes, mesesActuales);
    avisomes.avisoKitDistribucionMes = this.actualizarMeses(mantenimientoPreventivo.kitDistribucionMes, mesesActuales);
    avisomes.avisoReglajeProyectoresMes = this.actualizarMeses(mantenimientoPreventivo.reglajeProyectoresMes, mesesActuales);
    avisomes.avisoPhLiquidoRefrigeracionMes = this.actualizarMeses(mantenimientoPreventivo.pHLiquidoRefrigeracionMes, mesesActuales);
    avisomes.avisoLiquidoRefrigeracionMes = this.actualizarMeses(mantenimientoPreventivo.liquidoRefrigeracionMes, mesesActuales);
    avisomes.avisoCorreaArrastreAccesoriosMes = this.actualizarMeses(mantenimientoPreventivo.correaArrastreAccesoriosMes, mesesActuales);
    avisomes.avisoKitCorreaArrastreAccesoriosMes = this.actualizarMeses(mantenimientoPreventivo.kitCorreaArrastreAccesoriosMes, mesesActuales);
    avisomes.avisoAnticongelanteMes = this.actualizarMeses(mantenimientoPreventivo.anticongelanteMes, mesesActuales);
    avisomes.avisoAceiteTransimisionMes = this.actualizarMeses(mantenimientoPreventivo.aceiteTransmisionMes, mesesActuales);
    avisomes.avisoBujiasEncendidoMes = this.actualizarMeses(mantenimientoPreventivo.bujiasEncendidoMes, mesesActuales);
    avisomes.mensajeMes = "";

    return this.http
      .patch<any>(`${this.urlEndPoint}/${avisomes.id}`, avisomes)
      .pipe(
        catchError((e) => {
          if (e.status === 400) {
            return throwError(() => new Error(e));
          }
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(() => new Error(e));
        })
      );
  }

  actualizarMeses(propiedad: any, meses: number){

    if (propiedad != 0) {
      console.log(propiedad);
      console.log(meses);
      return (propiedad - meses);
    } else {
      return 0;
    }
  }

  getAvisoMes(id: string): Observable<any> {
    return this.http.get<any>(`${this.urlEndPointPP}/${id}/avisomes`);
  }

  getAvisoMesBusqueda(id: string): Observable<any> {
    
    return this.http.get<any>(id);
  }

  monthDiff(d1: any, d2: any) { 
    var months;
    let fecha2 = new Date(d2);
    let fecha1 = new Date(d1);
    console.log(fecha1); 
    console.log(fecha2); 
    months = (fecha2.getFullYear() - fecha1.getFullYear()) * 12; 
    months -= fecha1.getMonth(); 
    months += fecha2.getMonth(); 
    return months <= 0 ? 0 : months;
  }


}
