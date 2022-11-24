import { Avisokm } from "src/app/administrador/models/avisokm";
import { DatosTecnicosInteres } from "./datos-tecnicos-interes";
import { Mantenimiento } from "./mantenimiento";
import { MantenimientoPreventivo } from "./planes-preventivos";

export interface Vehiculo {

    id: string;
    fechaAlta:Date;
    matricula:string;
    marca:string;
    modelo:string;
    tipo:string;
    unidadDestino:string;
    fechaAdjudicacion:Date;
    datosTecnicosInteres:DatosTecnicosInteres|string;
    planespreventivos:MantenimientoPreventivo|string;
    mantenimientos:Mantenimiento[];
    kilometrosActuales: number;
    mesesActuales:number;
    avisokms:string;
    avisomes:string;

}
