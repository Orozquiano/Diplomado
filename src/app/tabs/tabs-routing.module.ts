import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'arma_tu_pc',
        loadChildren: () => import('../armaTuPC_page/Arma_Tu_PC/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'informacion',
        loadChildren: () => import('../informacion_page/Informacion/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'resultado',
        loadChildren: () => import('../resultado_page/resultado/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/arma_tu_pc',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/arma_tu_pc',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
