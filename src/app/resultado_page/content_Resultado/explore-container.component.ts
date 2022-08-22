import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
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
  PSU_Req: number;
  Categories: string[];

  //BD items
  CPU_BD: Procesador[] = [];
  GPU_BD: Grafica[] = [];
  RAM_BD: RAM[] = [];
  SSD_BD: Almacenamiento[] = [];
  Case_BD: Case[] = [];
  MB_BD: TMadre[] = [];
  PSU_BD: FPoder[] = [];
  BD_General: any[] = [];

  constructor(public busquedaService: BusquedaService, public navCtrl: NavController, public bdService: basedatosService) {
  }

  ngOnInit() {
    this.SoftwareSel = this.busquedaService.Obtener_Seleccion();
    if (this.SoftwareSel.length == 0) {
      window.location.assign('/tabs/arma_tu_pc');
    } else {
      this.Requisitos_Max();
      this.getItems();
    }
  }

  ByGpu(a, b) {
    if (a.VRAM < b.VRAM) {
      return -1;
    }
    if (a.VRAM > b.VRAM) {
      return 1;
    }
    if (a.Freq < b.Freq) {
      return -1;
    }
    if (a.Freq > b.Freq) {
      return 1;
    }
    return 0;
  }
  ByCpu(a, b) {
    if (a.Cores < b.Cores) {
      return -1;
    }
    if (a.Cores > b.Cores) {
      return 1;
    }
    if (a.Freq < b.Freq) {
      return -1;
    }
    if (a.Freq > b.Freq) {
      return 1;
    }
    if (a.Threads < b.Threads) {
      return -1;
    }
    if (a.Threads > b.Threads) {
      return 1;
    }
    return 0;
  }
  ByRam(a, b) {
    if (a.Capacity < b.Capacity) {
      return -1;
    }
    if (a.Capacity > b.Capacity) {
      return 1;
    }
    if (a.RamVel < b.RamVel) {
      return -1;
    }
    if (a.RamVel > b.RamVel) {
      return 1;
    }
    return 0;
  }
  BySSD(a, b) {
    if (a.Capacity < b.Capacity) {
      return -1;
    }
    if (a.Capacity > b.Capacity) {
      return 1;
    }
    return 0;
  }
  ByMb(a, b) {
    if (a.Socket < b.Socket) {
      return -1;
    }
    if (a.Socket > b.Socket) {
      return 1;
    }
    if (a.PCIe < b.PCIe) {
      return -1;
    }
    if (a.PCIe > b.PCIe) {
      return 1;
    }
    return 0;
  }
  ByPSU(a, b) {
    if (a.Power < b.Power) {
      return -1;
    }
    if (a.Power > b.Power) {
      return 1;
    }
    return 0;
  }
  ByCase(a, b) {
    if (a.MBFormat.length < b.MBFormat.length) {
      return -1;
    }
    if (a.MBFormat.length > b.MBFormat.length) {
      return 1;
    }
    return 0;
  }

  /**
   * @param Comp es el nombre del componente (Ex. 'CPU') que se va a filtrar
   * @param res la lista de componentes (Ex. CPULista[CPU1,CPU2,...]) de la base de datos para realizar el filtro según los requisitos
   */
  Req(Comp, res) {
    //Filtros anidados...
    console.log(`Requiring ${Comp}`);
    switch (Comp) {
      case 'GPU':
        res = res.sort(this.ByGpu)
        this.GPU_BD = res;
        if (this.GPU_BD.length == 0) {
          console.log("No GPUs in DB");
          alert(`Lo sentimos, en este momento no pudimos generar una recomendación de ${Comp} por falta de stock`);
        } else {
          if (this.GPU_BD.filter(GPU => GPU.Dx >= this.SoftwareReq.GPUReq.Dx).length > 0) {
            this.GPU_BD = this.GPU_BD.filter(GPU => GPU.Dx >= this.SoftwareReq.GPUReq.Dx); //Compare DirectX Versions
            if (this.GPU_BD.filter(GPU => GPU.OGL >= this.SoftwareReq.GPUReq.OGL).length > 0) {
              this.GPU_BD = this.GPU_BD.filter(GPU => GPU.OGL >= this.SoftwareReq.GPUReq.OGL); //Compare OGL Versions
              if (this.GPU_BD.filter(GPU => GPU.VRAM >= this.SoftwareReq.GPUReq.VRAM).length > 0) {
                this.GPU_BD = this.GPU_BD.filter(GPU => GPU.VRAM >= this.SoftwareReq.GPUReq.VRAM+2); //Compare VRAM Versions
              } else {
                console.log("No GPUs VRAM");
              }
            } else {
              console.log("No GPUs OpenGL");
            }
          } else {
            console.log("No GPUs DirectX");
          }
        }
        console.log("Final GPU ", this.GPU_BD[0].Name);
        break;
      case 'CPU':
        res = res.sort(this.ByCpu);
        this.CPU_BD = res;
        if (this.CPU_BD.length == 0) {
          console.log("No CPUs in DB");
          alert(`Lo sentimos, en este momento no pudimos generar una recomendación de ${Comp} por falta de stock`);
        } else {
          if (this.CPU_BD.filter(CPU => CPU.Cores >= this.SoftwareReq.CPUReq.Cores).length > 0) {
            this.CPU_BD = this.CPU_BD.filter(CPU => CPU.Cores >= this.SoftwareReq.CPUReq.Cores); //Compare Number of Cores
            if (this.CPU_BD.filter(CPU => CPU.FreqOC > this.SoftwareReq.CPUReq.Clock).length > 0) {
              this.CPU_BD = this.CPU_BD.filter(CPU => CPU.FreqOC > this.SoftwareReq.CPUReq.Clock); //Compare Frequency of Clock
              if (this.CPU_BD.filter(CPU => CPU.Threads >= this.SoftwareReq.CPUReq.Threads).length > 0) {
                this.CPU_BD = this.CPU_BD.filter(CPU => CPU.Threads >= this.SoftwareReq.CPUReq.Threads); //Compare Number of Threads
                if (this.CPU_BD[0].IGPU) {
                  if (this.CPU_BD[0].Dx >= this.SoftwareReq.GPUReq.Dx) {
                    //si graficos integrados y cumplen requisitos, no need GPUy VRAM needed push into softwareRam needed
                    if (this.CPU_BD[0].OGL >= this.SoftwareReq.GPUReq.OGL) {
                      if (this.SoftwareReq.GPUReq.VRAM <= 2) {
                        console.log("CPU can run the app!, no Needs GPU");
                        this.SoftwareReq.RAM += this.SoftwareReq.GPUReq.VRAM;
                        this.GPU_BD[0].Name = "Tu CPU tiene Gráficos integrados, no necesitas comprar una tarjeta gráfica";
                        this.GPU_BD[0].IMG = "https://www.profesionalreview.com/wp-content/uploads/2020/10/igpu-4.jpg";
                        this.GPU_BD[0].Store = this.CPU_BD[0].Store;
                        this.GPU_BD[0].PCIe = this.CPU_BD[0].PCIe;
                        console.log("PCIe GP CP",this.GPU_BD[0].PCIe, this.CPU_BD[0].PCIe);
                      } else {
                        this.CPU_BD = this.CPU_BD.filter(CPU => CPU.PCIe >= this.GPU_BD[0].PCIe);
                        if (this.CPU_BD.length == 0) {
                          console.log("No CPU-GPU PCIe match");
                        }
                      }
                    } else {
                      console.log("No iGPUs OpenGL, need gpu");
                    }
                  } else {
                    console.log("No iGPUs DirectX, need gpu");
                  }
                }else{
                  console.log("not iGPU in CPU");
                }
              } else {
                console.log("No CPU Threads");
              }
            } else {
              console.log("No CPUs Clock");
            }
          } else {
            console.log("No CPUs Cores");
          }
        }
        console.log("Final CPU ", this.CPU_BD[0].Name);
        break;
      case 'RAM':
        res = res.sort(this.ByRam);
        //a continuación se filtran las RAM para empalmar la generación más alta de ram que acepta el procesador
        if (this.CPU_BD[0].RamVel > 3600) {
          this.RAM_BD = res.filter(rgen => rgen.RamGen == "DDR5");
        } else {
          this.RAM_BD = res.filter(rgen => rgen.RamGen == "DDR4");
        }
        if (this.RAM_BD.length == 0) {
          console.log("No Rams in BD");
        } else {
          this.RAM_BD = this.RAM_BD.filter(fil => fil.Capacity >= this.SoftwareReq.RAM);
          if (this.RAM_BD[0].Capacity < this.SoftwareReq.RAM) {
            if (this.RAM_BD.filter(el => el.Quantity >= 2).length > 0) {
              this.RAM_BD = this.RAM_BD.filter(el => el.Quantity >= 2);
            }
          }
          console.log("final Ram", this.RAM_BD[0].Name);
        }
        break;
      case 'SSD':
        res = res.sort(this.BySSD);
        this.SSD_BD = res;
        if (this.SSD_BD.length == 0) {
          console.log("No SSD in BD");
        } else {
          this.SSD_BD = this.SSD_BD.filter(ssd => ssd.Capacity >= this.SoftwareReq.Storage.Capacity);
          console.log("Final SSD", this.SSD_BD[0].Name);
        }
        break;
      case 'MB':
        res = res.sort(this.ByMb);
        this.MB_BD = res;
        if (this.MB_BD.length == 0) {
          console.log("No MBs in BD");
          alert(`Lo sentimos, en este momento no pudimos generar una recomendación de ${Comp} por falta de stock`);
        } else {
          this.MB_BD = this.MB_BD.filter(mb => mb.Socket == this.CPU_BD[0].Socket);
          if (this.MB_BD.length == 0) {
            console.log("No MBs with Socket");
          } else {
            this.MB_BD = this.MB_BD.filter(p => p.PCIe >= this.GPU_BD[0].PCIe);
            if (this.MB_BD.length == 0) {
              console.log("No MBs with GPUs PCIe", this.GPU_BD[0].PCIe);
            } else {
              this.MB_BD = this.MB_BD.filter(r => r.RamGen == this.RAM_BD[0].RamGen);
              if (this.MB_BD.length == 0) {
                console.log("No MBs with RamGen Match");
              } else {
                console.log("Final MB", this.MB_BD[0].Name);
              }
            }
          }
        }
        break;
      case 'Case':
        res = res.sort(this.ByCase);
        this.Case_BD = res;
        if (this.Case_BD.length == 0) {
          console.log("No Cases in BD");
        } else {
          this.Case_BD = this.Case_BD.filter(cs => cs.MBFormat.includes(this.MB_BD[0].Size));
          console.log("final Case", this.Case_BD[0].Name);
        }
        break;
      case 'PSU':
        res = res.sort(this.ByPSU);
        this.PSU_BD = res;
        if (this.PSU_BD.length == 0) {
          console.log("No PSUs in BD");
          alert(`Lo sentimos, en este momento no pudimos generar una recomendación de ${Comp} por falta de stock`);
        } else {
         this.PSU_Req = 100 + //CPU100
         this.SSD_BD[0].Format=="M.2"?2:5 + //M.2 2 watts/SSD 5w
         this.Case_BD[0].Fans*20 +
         10 + //CPUFan10
         this.RAM_BD[0].Capacity*1.5 +
         50 + //MB50
         this.GPU_BD[0].TDP;
          this.PSU_BD = this.PSU_BD.filter(ps => 0.8*ps.Power > this.PSU_Req+100);
          console.log("Final PSU",this.PSU_Req, this.PSU_BD[0].Name);
        }
        break;
    }
  }

  /**
   * @function getItems Trae la lista de componentes de la base de datos
   * @function Req Realiza la selección y filtro de la lista de componentes según los requisitos
   */
  getItems() {
    this.BD_General = this.busquedaService.Obtener_BD();
    // console.log("Database getting: gpu",this.BD_General[this.BD_General.indexOf("GPU")+1]);
    this.Req("GPU", this.BD_General[this.BD_General.indexOf("GPU") + 1]);
    this.Req("CPU", this.BD_General[this.BD_General.indexOf("CPU") + 1]);
    this.Req("RAM", this.BD_General[this.BD_General.indexOf("RAM") + 1]);
    this.Req("SSD", this.BD_General[this.BD_General.indexOf("SSD") + 1]);
    this.Req("MB", this.BD_General[this.BD_General.indexOf("MB") + 1]);
    this.Req("Case", this.BD_General[this.BD_General.indexOf("Case") + 1]);
    this.Req("PSU", this.BD_General[this.BD_General.indexOf("PSU") + 1]);
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
  }
}
