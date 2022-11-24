import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { Vehiculo } from "../models/vehiculo";
import { VehiculoImpl } from "../models/vehiculo-impl";

@Injectable({
  providedIn: "root",
})
export class VehiculoService {

  private host: string = environment.host;
  private urlEndPoint: string = `${this.host}vehiculos`;
  private urlEndPointMantenimiento: string=`${this.host}mantenimientosrealizados`

  constructor(private http: HttpClient) {}

  getId(url: string): string {
    let posicionFinal: number = url.lastIndexOf("/");
    let numId: string = url.slice(posicionFinal + 1, url.length);
    return numId;
  }

  getVehiculos(): Observable<any> {
    return this.http.get<any>(this.urlEndPoint);
  }

  extraerVehiculos(respuestaApi: any): Vehiculo[] {
    const vehiculos: Vehiculo[] = [];
    respuestaApi._embedded.vehiculos.forEach((a: Vehiculo) => {
      vehiculos.push(this.mapearVehiculo(a));
    });
    return vehiculos;
  }

  mapearVehiculo(vehiculoApi: any): VehiculoImpl {
    let vehiculo: Vehiculo = new VehiculoImpl();
    vehiculo.id = this.getId(vehiculoApi._links.vehiculo.href);
    vehiculo.matricula = vehiculoApi.matricula;
    vehiculo.modelo = vehiculoApi.modelo;
    vehiculo.marca = vehiculoApi.marca;
    vehiculo.tipo = vehiculoApi.tipo;
    vehiculo.unidadDestino = vehiculoApi.unidadDestino;
    vehiculo.fechaAdjudicacion = vehiculoApi.fechaAdjudicacion;
    vehiculo.mantenimientos = vehiculoApi.mantenimientosRealizados;
    vehiculo.fechaAlta = vehiculoApi.fechaAlta;
    vehiculo.kilometrosActuales = vehiculoApi.kilometrosActuales;
    vehiculo.mesesActuales = vehiculoApi.mesesActuales;
    vehiculo.datosTecnicosInteres = vehiculoApi._links.datosTecnicosInteres.href;
    vehiculo.planespreventivos = vehiculoApi._links.planespreventivos.href;
    vehiculo.avisokms = vehiculoApi._links.avisokms.href;
    vehiculo.avisomes = vehiculoApi._links.avisomes.href;
    return vehiculo;
  }

  crearVehiculo(vehiculo: Vehiculo): Observable<any> {
    return this.http.post(`${this.urlEndPoint}`, vehiculo).pipe(
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

  deleteVehiculo(id: string): Observable<Vehiculo> {
    return this.http.delete<Vehiculo>(`${this.urlEndPoint}/${id}`).pipe(
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

  updateVehiculo(vehiculo: Vehiculo): Observable<any> {
    return this.http
      .patch<any>(`${this.urlEndPoint}/${vehiculo.id}`, vehiculo)
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

  getVehiculo(id: string): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/${id}`).pipe(
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

  getBusquedaPorMatricula(matricula: string): Observable<any> {
    return this.http
      .get<any>(
        `${this.urlEndPoint}/search/por-matricula?matricula=${matricula}`
      )
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

  getVehiculoMantenimiento(id:string): Observable<any> {
    return this.http
      .get<any>(
        `${this.urlEndPointMantenimiento}/${id}/vehiculo`
      )
}
}
