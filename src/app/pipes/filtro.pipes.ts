import { Pipe, PipeTransform } from '@angular/core'
import { software } from '../models/interface';

@Pipe({
    name: 'filtro'
})

export class FiltroPipe implements PipeTransform{
    transform(arreglo: software[], texto: string): any[] {
        
        if( texto === ''){
            return arreglo;
        }


        texto = texto.toLowerCase();

        arreglo.filter( item=>{
            // console.log(texto)
            return item.Name.includes(texto)
        })
        return arreglo;
    }
}