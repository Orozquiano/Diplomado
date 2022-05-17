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
    IMG: string,
    Name: string,
    OGL: number,
    PCIe: number,
    RayT: boolean,
    Store: string,
    TDP: number,
    VRAM: number,
    id: string
}

export interface Procesador{
    Cache: number,
    Cores: number,
    Dx: number,
    Freq: number,
    FreqOC: number,
    IGPU: boolean,
    IMG: string,
    Name: string,
    OGL: number,
    PCIe: number,
    RamVel: number,
    Socket: string,
    Store: string,
    Threads: number,
    id: string
}

export interface RAM{
    Capacity: number,
    Freq: number,
    IMG: string,
    Name: string,
    Quantity: number,
    RamGen: string,
    Store: string,
    TDP: number,
    id: string
}

export interface software{
    CPUReq: {
        Architecture: number,
        Clock: number,
        Cores: number,
        Threads: number
    },
    Category: string,
    GPUReq: {
        Dx: number,
        OGL: number,
        VRAM: number
    },
    IMG: string,
    Name: string,
    RAM: number,
    Storage: {
        Capacity: number,
        Format: string
    },
    id: string
}

export interface TMadre{
    IMG: string,
    Name: string,
    PCIe: number,
    RamGen: string,
    Size: string,
    Socket: string,
    Store: string,
    id: string   
}
