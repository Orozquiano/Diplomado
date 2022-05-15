import { Injectable } from '@angular/core';
import { software } from '../models/interface';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {
  public SoftwareSeleccionado = [];

  constructor() { }

  Seleccionar(Software: software[]){
    this.SoftwareSeleccionado=[];
    this.SoftwareSeleccionado = Software;
  }
  Obtener_Seleccion(){
    return this.SoftwareSeleccionado;
  }
}
