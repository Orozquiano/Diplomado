import { Injectable } from '@angular/core';
import { software } from '../models/interface';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {
  private SoftwareSeleccionado = [];

  constructor() { }

  Seleccionar(Software: software[]){
    this.SoftwareSeleccionado = Software;
  }
  Obtener_Seleccion(){
    return this.SoftwareSeleccionado;
  }
}
