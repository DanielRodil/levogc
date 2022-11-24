import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { MantenimientoPreventivo } from "../models/planes-preventivos";
import { MantenimientoPreventivoImpl } from "../models/planes-preventivos-impl";

@Injectable({
  providedIn: "root",
})
export class MantenimientoPreventivoService {

  private host: string = environment.host;
  private urlEndPoint: string = `${this.host}planespreventivos`;
  private urlEndPointPP: string = `${this.host}vehiculos`;

  constructor(private http: HttpClient) {}

  getId(url: string): string {
    let posicionFinal: number = url.lastIndexOf("/");
    let numId: string = url.slice(posicionFinal + 1, url.length);
    return numId;
  }

  getMantenimientoPreventivos(): Observable<any> {
    return this.http.get<any>(this.urlEndPoint);
  }

  extraerMantenimientosPreventivos(respuestaApi: any): MantenimientoPreventivo[] {
    const mantenimientosPreventivos: MantenimientoPreventivo[] = [];
    respuestaApi._embedded.planespreventivos.forEach((a: any) => {
      mantenimientosPreventivos.push(this.mapearMantenimientoPreventivo(a));
    });
    return mantenimientosPreventivos;
  }

  mapearMantenimientoPreventivo(mantenimientoPreventivoApi: any): MantenimientoPreventivoImpl {
    let mantenimientoPreventivo: MantenimientoPreventivo = new MantenimientoPreventivoImpl();
    mantenimientoPreventivo.id = this.getId(mantenimientoPreventivoApi._links.planpreventivo.href);
    mantenimientoPreventivo.condicionesUso = mantenimientoPreventivoApi.condicionesUso;
    mantenimientoPreventivo.observaciones = mantenimientoPreventivoApi.comentarios;
    mantenimientoPreventivo.aceiteTransmisionKm = mantenimientoPreventivoApi.aceiteTransmisionKm;
    mantenimientoPreventivo.aceiteTransmisionMes = mantenimientoPreventivoApi.aceiteTransmisionMes;
    mantenimientoPreventivo.anticongelanteKm = mantenimientoPreventivoApi.anticongelanteKm;
    mantenimientoPreventivo.anticongelanteMes = mantenimientoPreventivoApi.anticongelanteMes;
    mantenimientoPreventivo.bujiasEncendidoKm = mantenimientoPreventivoApi.bujiasEncendidoKm;
    mantenimientoPreventivo.bujiasEncendidoMes = mantenimientoPreventivoApi.bujiasEncendidoMes;
    mantenimientoPreventivo.correaArrastreAccesoriosKm = mantenimientoPreventivoApi.correaArrastreAccesoriosKm;
    mantenimientoPreventivo.correaArrastreAccesoriosMes = mantenimientoPreventivoApi.correaArrastreAccesoriosMes;
    mantenimientoPreventivo.correaDistribucionKm = mantenimientoPreventivoApi.correaDistribucionKm;
    mantenimientoPreventivo.correaDistribucionMes = mantenimientoPreventivoApi.correaDistribucionMes;
    mantenimientoPreventivo.filtroAireHabitaculoKm = mantenimientoPreventivoApi.filtroAireHabitaculoKm;
    mantenimientoPreventivo.filtroAireHabitaculoMes = mantenimientoPreventivoApi.filtroAireHabitaculoMes;
    mantenimientoPreventivo.filtroAireKm = mantenimientoPreventivoApi.filtroAireKm;
    mantenimientoPreventivo.filtroAireMes = mantenimientoPreventivoApi.filtroAireMes;
    mantenimientoPreventivo.filtroAntipolenKm = mantenimientoPreventivoApi.filtroAntipolenKm;
    mantenimientoPreventivo.filtroAntipolenMes = mantenimientoPreventivoApi.filtroAntipolenMes;
    mantenimientoPreventivo.filtroCombustibleKm = mantenimientoPreventivoApi.filtroCombustibleKm;
    mantenimientoPreventivo.filtroCombustibleMes = mantenimientoPreventivoApi.filtroCombustibleMes;
    mantenimientoPreventivo.kitCorreaArrastreAccesoriosKm = mantenimientoPreventivoApi.kitCorreaArrastreAccesoriosKm;
    mantenimientoPreventivo.kitCorreaArrastreAccesoriosMes = mantenimientoPreventivoApi.kitCorreaArrastreAccesoriosMes;
    mantenimientoPreventivo.kitDistribucionKm = mantenimientoPreventivoApi.kitDistribucionKm;
    mantenimientoPreventivo.kitDistribucionMes = mantenimientoPreventivoApi.kitDistribucionMes;
    mantenimientoPreventivo.liquidoFrenosKm = mantenimientoPreventivoApi.liquidoFrenosKm;
    mantenimientoPreventivo.liquidoFrenosMes = mantenimientoPreventivoApi.liquidoFrenosMes;
    mantenimientoPreventivo.liquidoRefrigeracionKm = mantenimientoPreventivoApi.liquidoRefrigeracionKm;
    mantenimientoPreventivo.liquidoRefrigeracionMes = mantenimientoPreventivoApi.liquidoRefrigeracionMes;
    mantenimientoPreventivo.operacionesSistematicasKm = mantenimientoPreventivoApi.operacionesSistematicasKm;
    mantenimientoPreventivo.operacionesSistematicasMes = mantenimientoPreventivoApi.operacionesSistematicasMes;
    mantenimientoPreventivo.pHLiquidoRefrigeracionKm = mantenimientoPreventivoApi.pHLiquidoRefrigeracionKm;
    mantenimientoPreventivo.pHLiquidoRefrigeracionMes = mantenimientoPreventivoApi.pHLiquidoRefrigeracionMes;
    mantenimientoPreventivo.reglajeProyectoresKm = mantenimientoPreventivoApi.reglajeProyectoresKm;
    mantenimientoPreventivo.reglajeProyectoresMes = mantenimientoPreventivoApi.reglajeProyectoresMes;
    // mantenimientoPreventivo.urlMantenimientoPreventivo=mantenimientoPreventivoApi._links.planpreventivo.href;
    // mantenimientoPreventivo.vehiculo=mantenimientoPreventivoApi._links.vehiculo.href;
    return mantenimientoPreventivo;
  }

  crearMantenimientoPreventivo(mantenimientoPreventivo: MantenimientoPreventivo): Observable<any> {
    return this.http
    .post(`${this.urlEndPoint}`, mantenimientoPreventivo)
    .pipe(
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

  deleteMantenimientoPreventivo(id: string): Observable<MantenimientoPreventivo> {
    return this.http
      .delete<MantenimientoPreventivo>(`${this.urlEndPoint}/${id}`)
      .pipe(
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

  updateMantenimmientoPreventivo(mantenimientoPreventivo: MantenimientoPreventivo): Observable<any> {
    return this.http
      .patch<any>(`${this.urlEndPoint}/${mantenimientoPreventivo.id}`, mantenimientoPreventivo)
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

  getmantenimientoPreventivoVehiculo(id: string): Observable<any> {
    return this.http
    .get<any>(`${this.urlEndPoint}/${id}`)
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

  getPP(id: string): Observable<any> {
    return this.http.get<any>(`${this.urlEndPointPP}/${id}/planespreventivos`);
  }

}
