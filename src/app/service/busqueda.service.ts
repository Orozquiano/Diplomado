import { Injectable } from '@angular/core';
import { software } from '../models/interface';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {
  public SoftwareSeleccionado = [];
  public BD = [];
  constructor() { }

  Seleccionar(Software: software[], db: any[]){
    this.SoftwareSeleccionado=[];
    this.SoftwareSeleccionado = Software;
    this.BD = db;
  }
  Obtener_Seleccion(){
    return this.SoftwareSeleccionado;
  }
  Obtener_BD(){
    return this.BD;
  }
}
