export interface Iempleado {
    id: number;
    nombreCompleto: string;
    nombre: string;
    puesto: string;
    salario: number;
    fechaIngreso: string;
    status: string;
    rfc: string;
}

export interface IempleadoInsert{
    nombreCompleto: string,
    puesto: string,
    salario: string,
    fechaIngreso: string,
    status: string,
    rfc: string
}

export interface IbusquedaEmpleado{
    id?: number, 
    nombre?: string, 
    rfc?: string, 
    estatus?: string
}

export interface EmpleadoResponse{
    data: Iempleado[];
    http: string; 
    message: string; 
    status: string; 
}
