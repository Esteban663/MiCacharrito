import { Usuario } from "./usuario";
import { Vehiculo } from "./vehiculo";

export class Alquiler {
    numero_alquiler: number;
    usuario: Usuario;
    vehiculo: Vehiculo;
    fecha_inicio: Date;
    fecha_entrega: Date;
    valor_total: number;
    estado: string;
}
