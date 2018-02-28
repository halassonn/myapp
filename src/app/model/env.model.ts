import {Injectable, OnInit} from "@angular/core";

@Injectable()
export class EnvConf {
  public URL_SERVER = this.loadUrlServer();



  loadUrlServer(): string {

    /*var alamat = localStorage.getItem('server');
    if (alamat !== null) {

      if (!JSON.parse(alamat).alamat.endsWith('/')) {
        return JSON.parse(alamat).alamat + '/';
      } else {
        return JSON.parse(alamat).alamat;
      }
    }*/
    return 'http://localhost:8080/api/';
    //return 'http://192.168.88.52:8080/cvsatya-Adm-App/api/';
  }


}
