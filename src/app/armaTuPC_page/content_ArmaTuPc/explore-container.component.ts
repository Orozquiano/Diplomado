import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Item } from 'src/app/models/interface';
import { basedatosService } from 'src/app/service/basedatos.service';


@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;

  items: Item[]=[];

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
    const enlace = 'Case';
    this.basedatosService.getInfo<Item>(enlace).subscribe(res =>{
      console.log(res);
      this.items = res; //this.items.push(res[0]);
      console.log(this.items[0].Name);
    });
  }

}
