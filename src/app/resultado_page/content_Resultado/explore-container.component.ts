import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { software } from 'src/app/models/interface';
import { BusquedaService } from 'src/app/service/busqueda.service';
@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent{
  @Input() name: string;
  SoftwareSel: software[]=[];
  SoftwareReq: software;
  CPUReq: string;
  GPUReq: string;
  RAMReq: string;
  StorageReq: string;
  Categories: string[];

  constructor(public busquedaService:BusquedaService, public navCtrl:NavController) {
  }

  ngOnInit() {
    this.SoftwareSel = this.busquedaService.Obtener_Seleccion();
    if(this.SoftwareSel.length == 0){
      window.location.assign('/tabs/arma_tu_pc');
    }else{
      this.Requisitos_Max();
    }
  }

/**
 * @function Requisitos_Max es una función que permite calcular los requisitos máximos entre los software a utilizar
 * @var Requisitos es el parámetro donde se almacenarán los requisitos máximos para buscar los componentes requeridos
 * @var SoftwareSel es la variable que tiene todos los requisitos de cada software para extraer el valor más alto y así recomendar según el software de mayor exigencia en cada componente
 */
  Requisitos_Max(){
    //inicializar SoftwareRequerido con el primer software para realizar las comparaciones posteriores
    this.SoftwareReq = this.SoftwareSel[0];
    this.Categories=[];
    this.SoftwareSel.forEach(element => {
      //Requisitos de CPU
      if(element.CPUReq.Architecture > this.SoftwareReq.CPUReq.Architecture)
        this.SoftwareReq.CPUReq.Architecture = element.CPUReq.Architecture;
      if(element.CPUReq.Cores > this.SoftwareReq.CPUReq.Cores)
        this.SoftwareReq.CPUReq.Cores = element.CPUReq.Cores;
      if(element.CPUReq.Threads > this.SoftwareReq.CPUReq.Threads)
        this.SoftwareReq.CPUReq.Threads = element.CPUReq.Threads;
      if(element.CPUReq.Clock > this.SoftwareReq.CPUReq.Clock)
        this.SoftwareReq.CPUReq.Clock = element.CPUReq.Clock;
      
      //Requisitos GPU
      if(element.GPUReq.Dx > this.SoftwareReq.GPUReq.Dx)
        this.SoftwareReq.GPUReq.Dx = element.GPUReq.Dx;
      if(element.GPUReq.OGL > this.SoftwareReq.GPUReq.OGL)
        this.SoftwareReq.GPUReq.OGL = element.GPUReq.OGL;
      if(element.GPUReq.VRAM > this.SoftwareReq.GPUReq.VRAM)
        this.SoftwareReq.GPUReq.VRAM = element.GPUReq.VRAM;

      //Requisitos RAM
      if(element.RAM > this.SoftwareReq.RAM)
        this.SoftwareReq.RAM = element.RAM;

      //Requisitos de Storage
      if(element.Storage.Capacity > this.SoftwareReq.Storage.Capacity)
        this.SoftwareReq.Storage = element.Storage;

      if(!this.Categories.includes(element.Category))
        this.Categories.push(element.Category);
    });
    this.CPUReq = JSON.stringify(this.SoftwareReq.CPUReq);
    this.GPUReq = JSON.stringify(this.SoftwareReq.GPUReq);
    this.RAMReq = JSON.stringify(this.SoftwareReq.RAM);
    this.StorageReq = JSON.stringify(this.SoftwareReq.Storage);
  }
}
