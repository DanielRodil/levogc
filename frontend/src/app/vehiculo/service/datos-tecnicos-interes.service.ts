import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { DatosTecnicosInteres } from "../models/datos-tecnicos-interes";
import { DatosTecnicosInteresImpl } from "../models/datos-tecnicos-interes-impl";

@Injectable({
  providedIn: "root",
})
export class DatosTecnicosInteresService {

  private host: string = environment.host;
  private urlEndPoint: string = `${this.host}datostecnicosinteres`;
  private urlEndPointDTI: string = `${this.host}vehiculos`;

  constructor(private http: HttpClient) {}

  getId(url: string): string {
    let posicionFinal: number = url.lastIndexOf("/");
    let numId: string = url.slice(posicionFinal + 1, url.length);
    return numId;
  }

  getDatosTecnicosInteres(): Observable<any> {
    return this.http.get<any>(this.urlEndPoint);
  }

  extraerDatosTecnicosInteres(respuestaApi: any): DatosTecnicosInteres[] {
    const datosTecnicosInteres: DatosTecnicosInteres[] = [];
    respuestaApi._embedded.datostecnicosinteres.forEach((a: any) => {
      datosTecnicosInteres.push(this.mapearDatosTecnicosInteres(a));
    });
    return datosTecnicosInteres;
  }

  mapearDatosTecnicosInteres(datosTecnicosInteresApi: any): DatosTecnicosInteresImpl {
    let datosTecnicosInteres: DatosTecnicosInteres = new DatosTecnicosInteresImpl();
    datosTecnicosInteres.id = this.getId(datosTecnicosInteresApi._links.datotecnicointeres.href);
    datosTecnicosInteres.bastidor = datosTecnicosInteresApi.bastidor;
    datosTecnicosInteres.color = datosTecnicosInteresApi.color;
    datosTecnicosInteres.combustible = datosTecnicosInteresApi.combustible;
    datosTecnicosInteres.cambio = datosTecnicosInteresApi.cambio;
    datosTecnicosInteres.capacidadDeposito = datosTecnicosInteresApi.capacidadDeposito;
    datosTecnicosInteres.lubricanteMotor = datosTecnicosInteresApi.lubricanteMotor;
    datosTecnicosInteres.capacidadCarter = datosTecnicosInteresApi.capacidadCarter;
    datosTecnicosInteres.presionNeumaticosDelanteros = datosTecnicosInteresApi.presionNeumaticosDelanteros;
    datosTecnicosInteres.presionNeumaticosTraseros = datosTecnicosInteresApi.presionNeumaticosTraseros;
    datosTecnicosInteres.tipoCubiertas = datosTecnicosInteresApi.tipoCubiertas;
    datosTecnicosInteres.numeroBaterias = datosTecnicosInteresApi.numeroBaterias;
    datosTecnicosInteres.voltajeBaterias = datosTecnicosInteresApi.voltajeBaterias;
    datosTecnicosInteres.amperiosHoraBaterias = datosTecnicosInteresApi.amperiosHoraBaterias;
    datosTecnicosInteres.amperajeBaterias = datosTecnicosInteresApi.amperajeBaterias;
    datosTecnicosInteres.clasificacionMedioambiental = datosTecnicosInteresApi.clasificacionMedioambiental;
    //datosTecnicosInteres.vehiculo=datosTecnicosInteresApi._links.vehiculo.href;
    return datosTecnicosInteres;
  }

  creardatosTecnicosInteres(datosTecnicosInteres: DatosTecnicosInteres): Observable<any> {
    return this.http
      .post(`${this.urlEndPoint}`, datosTecnicosInteres)
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

  deleteDatosTecnicosInteres(id: string): Observable<DatosTecnicosInteres> {
    return this.http
      .delete<DatosTecnicosInteres>(`${this.urlEndPoint}/${id}`)
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

  updateDatosTecnicosInteres(datosTecnicosInteres: DatosTecnicosInteres): Observable<any> {
    return this.http
      .patch<any>(`${this.urlEndPoint}/${datosTecnicosInteres.id}`, datosTecnicosInteres)
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

  getDatosTecnicosInteresVehiculo(id: string): Observable<any> {
    return this.http.get<any>(
      `${this.urlEndPointDTI}/${id}/datosTecnicosInteres`
    );
  }
}
