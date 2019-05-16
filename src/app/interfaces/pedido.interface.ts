import { Producto } from './producto.interface';

export class Pedido {
    key: string;
    keyCliente: string;
    fecha: number;
    pagado: Boolean;
    tienda: string;
    vendedor: string;
    total: number;
    estado: string;
    calleNum: string;
    numeroInterior?: string;
    ciudad: number;
    cp: number;
    fechaEnvio: number;
    fechaPago: number;
    fechaEntrega: number;
    keyPublico: string;
    telefono: string;
    envio = {
        costo: 0,
        numeroGuia: '',
        paqueteria: '',
        tipo: ''
    };
    cliente = {
        calleNum: '',
        numeroInterior: '',
        ciudad: '',
        cp: '',
        estado: '',
        telefono: ''
    };
    productos: Producto[];



}
