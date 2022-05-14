import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { element } from 'protractor';
import { software } from 'src/app/models/interface';
import { basedatosService } from 'src/app/service/basedatos.service';


@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;

  software: software[]=[];
  IMG: string;
  Name: string;
  Info_Select_Soft: string[]=[];

  /** 
   * @constructor de la clase 
   * @param navCtrl
   * */
  constructor(
    public navCtrl: NavController,
    public basedatosService: basedatosService
    ) { }

    /**
     * @function ngOnInit Todo lo que se ponga dentro de esta funcion se cargara al iniciar la pagina.
     */
    
  ngOnInit() {
    this.getItems();
  }

  /**
   * @function goToResultado la cual nos permite cambiar a la page de resultado
   */
  goToResultado(){
    this.navCtrl.navigateForward('/tabs/resultado');
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

    });
  }

  /**
   * @function Info_Software
   * @param software Le paso toda la información de software
   */

  Info_Software(software){
    if(this.Info_Select_Soft.length == 3){
      alert("No puedes seleccionar mas de 3 software");
    }else if(this.Info_Select_Soft.includes(software)){
      alert("No puedes seleccionar el mismos software");

    }else{
      this.Info_Select_Soft.push(software);
    }
    

  }

  RemoveS(software_info){
    let info = software_info.id;
    this.Info_Select_Soft.splice(info,1);
  }

}
