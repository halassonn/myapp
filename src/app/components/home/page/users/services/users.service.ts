import {Injectable, EventEmitter, Output} from '@angular/core';
import {HttpService} from '../../../../../core/_http/http.service';
import {Observable} from 'rxjs/Observable';
import {Response} from '@angular/http';
import { Users } from '../../../../../model/users.model';


@Injectable()
export class UsersService {
  @Output() loaderclass: EventEmitter<any> = new EventEmitter();
  constructor(private _http: HttpService){}

  getAllDataUsersBy(by: string,param:string) : Observable<Users[]>{
    return this._http.get('data-users/by-'+by+'/'+param)
      .map((response:Response)=> response.json() as Users[])
      .catch(this.handleError);
  }


  getAllDataUsers(): Observable<Users[]> {
    return this._http.get('get-data-users')
      .map((response: Response) => response.json() as Users[])
      .catch(this.handleError);
  }



  save(data: Users) {
    return this._http.post('add-user', JSON.stringify(data));
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
