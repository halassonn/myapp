
import {Injectable} from "@angular/core";
import {HttpService} from "../../../core/_http/http.service";
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {Router} from "@angular/router";
import { Users } from "../../../model/users.model";

@Injectable()
export class AuthService {
user_role: any;
token: any;

constructor(private _http: HttpService, private router: Router) {

}

on_login(username: string, password: string): Observable<any> {
  return this._http.post('auth', JSON.stringify({username: username, password: password}
  )).map((response: Response) => {
    console.log(response);
    const token = response.json() && response.json().token;
    this.token = token;
    localStorage.setItem('currentUser', JSON.stringify({username: username, token: this.token}));
    localStorage.setItem('isLoggin', 'true');
    localStorage.setItem('kodekantor', response.json().kodekantor);
  }).catch(this.handleError);
}




  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;

    if (error instanceof Response) {
      if (error.status !== 0) {
        const errbody = error.json() || '';
        errMsg = `${errbody.message}`;
      } else {
        errMsg = 'Connection Error';
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);

    return Observable.throw(errMsg);
  }
}
