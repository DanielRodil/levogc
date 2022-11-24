import { Vehiculo } from "./vehiculo";

export class MantenimientoPreventivoImpl {

    id!: string;
    condicionesUso!: string;
    observaciones!: string;
    liquidoFrenosKm!: number;
	liquidoFrenosMes!: number;
	operacionesSistematicasKm!: number;
	operacionesSistematicasMes!: number;
	filtroAireKm!: number;
	filtroAireMes!: number;
	filtroAireHabitaculoKm!: number;
	filtroAireHabitaculoMes!: number;
	filtroCombustibleKm!: number;
	filtroCombustibleMes!: number;
	filtroAntipolenKm!: number;
	filtroAntipolenMes!: number;
	correaDistribucionKm!: number;
	correaDistribucionMes!: number;
	kitDistribucionKm!: number;
	kitDistribucionMes!: number;
	reglajeProyectoresKm!: number;
	reglajeProyectoresMes!: number;
	pHLiquidoRefrigeracionKm!: number;
	pHLiquidoRefrigeracionMes!: number;
	liquidoRefrigeracionKm!: number;
	liquidoRefrigeracionMes!: number;
	correaArrastreAccesoriosKm!: number;
	correaArrastreAccesoriosMes!: number;
	kitCorreaArrastreAccesoriosKm!: number;
	kitCorreaArrastreAccesoriosMes!: number;
	anticongelanteKm!: number;
	anticongelanteMes!: number;
	aceiteTransmisionKm!: number;
	aceiteTransmisionMes!: number;
	bujiasEncendidoKm!: number;
    bujiasEncendidoMes!: number;
	urlMantenimientoPreventivo!:string;

    constructor(){}
}
