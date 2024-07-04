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

export interface EmpleadoResponse{
    data: Iempleado[];
    http: string; 
    message: string; 
    status: string; 
}
