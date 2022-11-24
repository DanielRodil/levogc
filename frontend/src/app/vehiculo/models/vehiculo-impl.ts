
import { Avisokm } from "src/app/administrador/models/avisokm";
import { DatosTecnicosInteres } from "./datos-tecnicos-interes";
import { Mantenimiento } from "./mantenimiento";
import { MantenimientoPreventivo } from "./planes-preventivos";

export class VehiculoImpl {

    id!: string;
    datosTecnicosInteres!: DatosTecnicosInteres | string;
    planespreventivos!: MantenimientoPreventivo | string;
    mantenimientos!: Mantenimiento[];
    fechaAlta!: Date;
    kilometrosActuales!: number;
    mesesActuales!: number;
    matricula!: string;
    marca!: string;
    modelo!: string;
    tipo!: string;
    unidadDestino!: string;
    fechaAdjudicacion!: Date;
    avisokms!: string;
    avisomes!: string;


        constructor(){}
}
