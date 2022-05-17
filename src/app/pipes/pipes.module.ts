import { NgModule } from '@angular/core';
import { FiltroPipe } from './filtro.pipes';

@NgModule({
  declarations: [FiltroPipe],
  exports:[ FiltroPipe ]

})
export class PipesModule { }
