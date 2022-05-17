import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { testUserAgent } from '@ionic/core/dist/types/utils/platform';
import { element } from 'protractor';
import { Almacenamiento,Case,FPoder,Grafica,Procesador,RAM,TMadre,software} from 'src/app/models/interface';
import { basedatosService } from 'src/app/service/basedatos.service';
import { BusquedaService } from 'src/app/service/busqueda.service';


@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;

  software: software[]=[];
  results: software[];
  IMG: string;
  Name: string;
  Info_Select_Soft: string[];
  textoBuscar = '';
  DB=[];
  /** 
   * @constructor de la clase 
   * @param navCtrl
   * */
  constructor(
    public navCtrl: NavController,
    public basedatosService: basedatosService,
    public busquedaService: BusquedaService
    ) { }

    /**
     * @function ngOnInit Todo lo que se ponga dentro de esta funcion se cargara al iniciar la pagina.
     */
    
  ngOnInit() {
    this.getItems();
    this.Info_Select_Soft=[];
  }

  /**
   * @function goToResultado la cual nos permite cambiar a la page de resultado
   */
  goToResultado(selected_Software: software[]){
    if(selected_Software.length==0){
      alert("No puedes armar un pc sin seleccionar al menos 1 software.");
    }else{
      this.busquedaService.Seleccionar(selected_Software, this.DB);
      this.navCtrl.navigateRoot(['/tabs/resultado']);
    }
  }

  /**
   * @function getInfo Trae la infor la base de datos (PRUEBA)
   */
  
  getItems(){
    const enlace = 'Software';
    this.basedatosService.getInfo<software>(enlace).subscribe(res =>{
      this.software = res;
      this.IMG = this.software[0].IMG;
      this.Name = this.software[0].Name;
      this.results = res.sort(this.ByName);
    });
    this.basedatosService.getInfo<Grafica>("Grafica").subscribe(res => { this.DB.push("GPU", res); });
    this.basedatosService.getInfo<Procesador>("Procesador").subscribe(res => { this.DB.push("CPU", res); });
    this.basedatosService.getInfo<RAM>("RAM").subscribe(res => { this.DB.push("RAM", res); });
    this.basedatosService.getInfo<Almacenamiento>("Almacenamiento").subscribe(res => { this.DB.push("SSD", res); });
    this.basedatosService.getInfo<TMadre>("TMadre").subscribe(res => { this.DB.push("MB", res); });
    this.basedatosService.getInfo<Case>("Case").subscribe(res => { this.DB.push("Case", res); });
    this.basedatosService.getInfo<FPoder>("FPorder").subscribe(res => { this.DB.push("PSU", res); });
  }
  /**
   * @param a item de comparación 1
   * @param b item de comparación 2
   * @returns sube o baja de posición en el arreglo según el resultado de la comparación
   */
  ByName(a,b){
    if(a.Name < b.Name){
      return -1;
    }
    if(a.Name > b.Name){
      return 1;
    }
    return 0;
  }
  /**
   * @function Info_Software
   * @param software Le paso toda la información de software
   */

  Info_Software(software){
    console.log("Selecting: ", software.Name);
    if(this.Info_Select_Soft.includes(software)){
      this.RemoveS(software);
    }else{
      if(this.Info_Select_Soft.length == 3){
        alert("No puedes seleccionar mas de 3 software");
      }else{
        this.Info_Select_Soft.push(software);
        document.getElementById(software.id).classList.toggle("activable");
      }
    }
  }

  /**
   * @function RemoveS Función que sirve para remover el software que selecciones en la sección de software
   * seleccionado
   * @param software_info 
   */
  RemoveS(software_info){
    // let info = software_info.id;
    this.Info_Select_Soft.splice(this.Info_Select_Soft.indexOf(software_info),1);
    document.getElementById(software_info.id).classList.toggle("activable");
  }

  /**
  * @function buscarFunción que sirve para filtrar los software mediante la barra de búsqueda según un
  * @param event
  * digitado por teclado event.detail.value
  */
  buscar(event){
    this.textoBuscar = event.detail.value.toLowerCase();
    this.results = this.software.filter(sft => sft.Name.toLowerCase().includes(this.textoBuscar)).sort(this.ByName);
  }

}
