import {Injectable,EventEmitter,Output} from '@angular/core';
import {HttpService} from '../../../../../core/_http/http.service';
import {Observable} from 'rxjs/Observable';
import {ProfileModel} from '../../../../../model/profile.model';
import {Response} from '@angular/http';


@Injectable()
export class ProfileService {
  @Output() loaderclass: EventEmitter<any> = new EventEmitter();
  constructor(private _http: HttpService){}

  getAllDataKaryawanBy(by: string,param:string) : Observable<ProfileModel[]>{
    return this._http.get('data-karyawan/by-'+by+'/'+param)
      .map((response:Response)=> response.json() as ProfileModel[])
      .catch(this.handleError);
  }


  getAllDataKaryawan(): Observable<ProfileModel[]> {
    return this._http.get('get-data-karyawans')
      .map((response: Response) => response.json() as ProfileModel[])
      .catch(this.handleError);
  }

  /*getAllDataKantor(): Observable<DatakantorModel[]> {
    return this._http.get('datakantors')
      .map((response: Response) => response.json() as DatakantorModel[])
      .catch(this.handleError);
  }*/

  saveDatakaryawan(data: ProfileModel) {

    return this._http.post('add-karyawan', JSON.stringify(data));
    //  .catch(this.handleError);
  }



  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  //event emitter

  public sideOpen(): any {
    return this.loaderclass.emit('page-container');
  }
  public sideclose(): any {
    return this.loaderclass.emit('page-container-full');
  }

  getEmittedValue() {
    return this.loaderclass;
  }

}
