import { Component, OnInit, Input } from '@angular/core';
import { software } from 'src/app/models/interface';
import { BusquedaService } from 'src/app/service/busqueda.service';
@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;
  SoftwareSel: software[];
  constructor(public busquedaService:BusquedaService) { }

  ngOnInit() {
    this.SoftwareSel = this.busquedaService.Obtener_Seleccion();
  }

}
