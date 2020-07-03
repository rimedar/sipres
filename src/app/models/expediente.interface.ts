export interface Expediente {
    id_expediente: string;
    cc_solocitante: string;
    nombre_predio: string;
    nombre_solicitante?: string;
    tomos?: number;
    prestado?: boolean;
    _id?: string;
}


