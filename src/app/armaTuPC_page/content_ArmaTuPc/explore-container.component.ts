import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
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
      console.log(res);
      this.software = res; //this.items.push(res[0]);
      console.log(this.software[0].Name); 
      this.IMG = this.software[0].IMG;
      this.Name = this.software[0].Name;

    });
  }

  TomarIMG(){
    console.log("HOLA")
  }

}
