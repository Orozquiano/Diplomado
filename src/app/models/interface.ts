export interface Item {
    Name: String
}

export interface Almacenamiento{
    Capacity: number,
    Format: string,
    IMG: string,
    Name: string,
    Store: string,
    Vel: number,
    id: string
}
export interface Case{
    Fans: number,
    IMG: string,
    MBFormat: string[],
    Name: string,
    Store: string,
    id: string
}

export interface FPoder{
    Cert: string,
    IMG: string,
    Name: string,
    Power: number,
    Store: string,
    id: string
}

export interface Grafica{
    Dx: number,
    Freq: number,

}