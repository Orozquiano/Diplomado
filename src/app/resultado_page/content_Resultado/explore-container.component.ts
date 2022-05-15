import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { software, Procesador, Almacenamiento, Case, FPoder, Grafica, RAM, TMadre } from 'src/app/models/interface';
import { basedatosService } from 'src/app/service/basedatos.service';
import { BusquedaService } from 'src/app/service/busqueda.service';
@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent {
  @Input() name: string;
  SoftwareSel: software[] = [];
  SoftwareReq: software;
  CPUReq: string;
  GPUReq: string;
  RAMReq: string;
  StorageReq: string;
  Categories: string[];

  //BD items
  CPU_BD: Procesador[] = [];
  GPU_BD: Grafica[] = [];
  RAM_BD: RAM[] = [];
  SSD_BD: Almacenamiento[] = [];
  Case_BD: Case[] = [];
  MB_BD: TMadre[] = [];
  PSU_BD: FPoder[] = [];

  constructor(public busquedaService: BusquedaService, public navCtrl: NavController, public bdService: basedatosService) {
  }

  ngOnInit() {
    this.SoftwareSel = this.busquedaService.Obtener_Seleccion();
    if (this.SoftwareSel.length == 0) {
      window.location.assign('/tabs/arma_tu_pc');
    } else {
      this.getItems();
      this.Requisitos_Max();
    }
  }
  /**
   * @param Comp es el nombre del componente (Ex. 'CPU') que se va a filtrar
   * @param res la lista de componentes (Ex. CPULista[CPU1,CPU2,...]) de la base de datos para realizar el filtro según los requisitos
   */
  Req(Comp, res) {
    //Filtros anidados...
    //Compare req var = SoftwareReq
    console.log(`Requiring ${Comp}`);
    switch (Comp) {
      case 'GPU':
        this.GPU_BD = res;
        if (this.GPU_BD.length == 0) {
          console.log("No GPUs in DB");
        } else {
          console.log("Registering ", this.GPU_BD[0].id, " in results");
          this.GPU_BD = res.filter(GPU => GPU.Dx >= this.SoftwareReq.GPUReq.Dx); //Compare DirectX Versions
          if (this.GPU_BD.length == 0) {
            console.log("No GPUs DirectX");
          } else {
            this.GPU_BD = this.GPU_BD.filter(GPU => GPU.OGL >= this.SoftwareReq.GPUReq.OGL); //Compare OGL Versions
            if (this.GPU_BD.length == 0) {
              console.log("No GPUs OpenGL");
            } else {
              this.GPU_BD = this.GPU_BD.filter(GPU => GPU.VRAM >= this.SoftwareReq.GPUReq.VRAM); //Compare VRAM Versions
              if (this.GPU_BD.length == 0) {
                console.log("No GPUs VRAM");
              } else {
                console.log("Final GPU ", this.GPU_BD[0].Name);
              }
            }
          }
        }
        break;
      case 'CPU':
        this.CPU_BD = res;
        if (this.CPU_BD.length == 0) {
          console.log("No CPUs in DB");
        } else {
          this.CPU_BD = this.CPU_BD.filter(CPU => CPU.Cores >= this.SoftwareReq.CPUReq.Cores); //Compare Number of Cores
          if (this.CPU_BD.length == 0) {
            console.log("No CPUs Cores");
          } else {
            this.CPU_BD = this.CPU_BD.filter(CPU => CPU.Freq >= this.SoftwareReq.CPUReq.Clock); //Compare Frequency of Clock
            if (this.CPU_BD.length == 0) {
              console.log("No CPUs Clock");
            } else {
              this.CPU_BD = this.CPU_BD.filter(CPU => CPU.Threads >= this.SoftwareReq.CPUReq.Threads); //Compare Number of Threads
              if (this.CPU_BD.length == 0)
                console.log("No CPU Threads");
              else{
                console.log("Final CPU ", this.CPU_BD[0].Name);
              }
            }
          }
        }
        break;
      case 'RAM':
        this.RAM_BD = res;
        if(this.RAM_BD.length == 0){
          console.log("No Rams in BD");
        }else{
        }
        break;
      case 'SSD':
        this.SSD_BD = res;
        if(this.SSD_BD.length == 0){
          console.log("No SSD in BD");
        }else{
        }
        break;
      case 'MB':
        this.MB_BD = res;
        if(this.MB_BD.length == 0){
          console.log("No MBs in BD");
        }else{
        }
        break;
      case 'Case':
        this.Case_BD = res;
        if(this.Case_BD.length == 0){
          console.log("No Cases in BD");
        }else{
        }
        break;
      case 'PSU':
        this.PSU_BD = res;
        if(this.PSU_BD.length == 0){
          console.log("No PSUs in BD");
        }else{
        }
        break;
    }
  }

  /**
   * @function getItems Trae la lista de componentes de la base de datos
   * @function Req Realiza la selección y filtro de la lista de componentes según los requisitos
   */
  getItems() {
    this.bdService.getInfo<Grafica>("Grafica").subscribe(res => { this.Req("GPU", res);});
    this.bdService.getInfo<Procesador>("Procesador").subscribe(res => { this.Req("CPU", res);});
    this.bdService.getInfo<RAM>("RAM").subscribe(res => { this.Req("RAM", res);});
    this.bdService.getInfo<Almacenamiento>("Almacenamiento").subscribe(res => { this.Req("SSD", res);});
    this.bdService.getInfo<TMadre>("TMadre").subscribe(res => { this.Req("MB", res);});
    this.bdService.getInfo<Case>("Case").subscribe(res => { this.Req("Case", res);});
    this.bdService.getInfo<FPoder>("FPorder").subscribe(res => { this.Req("PSU", res);});
  }
  /**
   * @function Requisitos_Max es una función que permite calcular los requisitos máximos entre los software a utilizar
   * @var Requisitos es el parámetro donde se almacenarán los requisitos máximos para buscar los componentes requeridos
   * @var SoftwareSel es la variable que tiene todos los requisitos de cada software para extraer el valor más alto y así recomendar según el software de mayor exigencia en cada componente
   */
  Requisitos_Max() {
    //inicializar SoftwareRequerido con el primer software para realizar las comparaciones posteriores
    this.SoftwareReq = this.SoftwareSel[0];
    this.Categories = [];
    this.SoftwareSel.forEach(element => {
      //Requisitos de CPU
      if (element.CPUReq.Architecture > this.SoftwareReq.CPUReq.Architecture)
        this.SoftwareReq.CPUReq.Architecture = element.CPUReq.Architecture;
      if (element.CPUReq.Cores > this.SoftwareReq.CPUReq.Cores)
        this.SoftwareReq.CPUReq.Cores = element.CPUReq.Cores;
      if (element.CPUReq.Threads > this.SoftwareReq.CPUReq.Threads)
        this.SoftwareReq.CPUReq.Threads = element.CPUReq.Threads;
      if (element.CPUReq.Clock > this.SoftwareReq.CPUReq.Clock)
        this.SoftwareReq.CPUReq.Clock = element.CPUReq.Clock;

      //Requisitos GPU
      if (element.GPUReq.Dx > this.SoftwareReq.GPUReq.Dx)
        this.SoftwareReq.GPUReq.Dx = element.GPUReq.Dx;
      if (element.GPUReq.OGL > this.SoftwareReq.GPUReq.OGL)
        this.SoftwareReq.GPUReq.OGL = element.GPUReq.OGL;
      if (element.GPUReq.VRAM > this.SoftwareReq.GPUReq.VRAM)
        this.SoftwareReq.GPUReq.VRAM = element.GPUReq.VRAM;

      //Requisitos RAM
      if (element.RAM > this.SoftwareReq.RAM)
        this.SoftwareReq.RAM = element.RAM;

      //Requisitos de Storage
      if (element.Storage.Capacity > this.SoftwareReq.Storage.Capacity)
        this.SoftwareReq.Storage = element.Storage;

      if (!this.Categories.includes(element.Category))
        this.Categories.push(element.Category);
    });
    this.CPUReq = JSON.stringify(this.SoftwareReq.CPUReq);
    this.GPUReq = JSON.stringify(this.SoftwareReq.GPUReq);
    this.RAMReq = JSON.stringify(this.SoftwareReq.RAM);
    this.StorageReq = JSON.stringify(this.SoftwareReq.Storage);
  }
}
