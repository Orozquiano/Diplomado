import {Injectable} from '@angular/core'
import { 
    AngularFirestore,
    AngularFirestoreDocument,
    AngularFirestoreCollection
} from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs'

    @Injectable({
    providedIn: 'root'
})
export class basedatosService{

    /**
     * @constructor de la clase
     * @param angularFirestore la cual permite utilizar todos los metodos
     * de la base de datos
     */

    constructor(
        public angularFirestore: AngularFirestore
    ){}

    /**
     * Metodos algo asi como un CRUD
     */


    /**
     * @function createDocument
     * @param data 
     * @param enlace 
     * @returns 
     */
    // createDocument<tipo>(data: tipo, enlace: string){
    //     const itemsCollection: AngularFirestoreCollection<tipo> =
    //                         this.angularFirestore.collection<tipo>(enlace);
    //     return itemsCollection.add(data);                            
    // }


    /**
     * @function getInfo Traera toda la información de la base de datos segun
     * el enlace que se le pase Ejemplo: Procesador/CPU1 
     * Traera toda la info de CPU1
     * @param enlace ruta donde traera toda la infoermación
     * @returns todos lo valores de la BD segun el enlace
     */
    getInfo<tipo>(enlace: string): Observable<tipo[]>{
        const ref = this.angularFirestore.collection<tipo>(enlace);
        return ref.valueChanges();
    }

}