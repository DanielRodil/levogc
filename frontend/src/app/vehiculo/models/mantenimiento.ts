import { Vehiculo } from "./vehiculo";

export interface Mantenimiento {

    id:string;
    fechaMantenimiento:Date;
    kilometrosMantenimiento:number;
	mesesMantenimiento: number;
    observaciones:string;
    liquidoFrenos:boolean;
	operacionesSistematicas:boolean;
	filtroAire:boolean;
	filtroAireHabitaculo:boolean;
	filtroCombustible:boolean;
	filtroAntipolen:boolean;
	correaDistribucion:boolean;
	kitDistribucion:boolean;
	reglajeProyectores:boolean;
	pHLiquidoRefrigeracion:boolean;
	liquidoRefrigeracion:boolean;
	correaArrastreAccesorios:boolean;
	kitCorreaArrastreAccesorios:boolean;
	anticongelante:boolean;
	aceiteTransmision:boolean;
	bujiasEncendido:boolean;
	vehiculo: string;


}
