import {Injectable, EventEmitter, Output} from '@angular/core';
import {Response} from '@angular/http';
import {DatakantorModel} from '../../../../../model/datakantor.model';
import {HttpService} from '../../../../../core/_http/http.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DatakantorService {

  @Output() loaderclass: EventEmitter<any> = new EventEmitter();
  constructor(private _http: HttpService) {
  }

  addDataKantor(data: DatakantorModel) {
    return this._http.post('add-data-kantor', JSON.stringify(data));
  }
  updateDataKantor(data: DatakantorModel) {
    return this._http.put('update-data-kantor/kodekantor/' + data.kodekantor, JSON.stringify(data));
  }

  deleteDataKantor(id: string) {
      return this._http.delete('deletekantor/' + id);
  }


  getAllDataKantorBy(by: string, param: string): Observable<DatakantorModel[]> {
    return this._http.get('datakantor-by-' + by + '/' + param)
      .map((response: Response) => response.json() as DatakantorModel[])
      .catch(this.handleError);
  }
  getDataKantorBy(param: string): Observable<DatakantorModel> {
    return this._http.get('get-Datakantor/' + param)
      .map((response: Response) => response.json() as DatakantorModel)
      .catch(this.handleError);
  }


  getAllDataKantor(): Observable<DatakantorModel[]> {
    return this._http.get('datakantors')
      .map((response: Response) => response.json() as DatakantorModel[])
      .catch(this.handleError);
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
