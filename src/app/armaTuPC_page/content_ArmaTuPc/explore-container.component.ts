import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;

  /** 
   * @constructor de la clase 
   * */
  constructor(
    public navCtrl: NavController
    ) { }

  ngOnInit() {}

  goToResultado(){
    this.navCtrl.navigateForward('/tabs/resultado');
  }

}
