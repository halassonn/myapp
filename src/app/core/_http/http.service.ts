import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptionsArgs, XHRBackend} from "@angular/http";
import {LoaderService} from "./loader/loader.service";

import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {EnvConf} from "../../model/env.model";
import {ReduxRequestOptions} from "./redux-request.options";

@Injectable()
export class HttpService extends Http {

  apiUrl:string;
  envConf:EnvConf=new EnvConf();

  constructor(backend: XHRBackend,
              defaultOptions: ReduxRequestOptions,
              private loaderService: LoaderService) {
    super(backend, defaultOptions);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    this.showLoader();
    return super.get(this.getFullUrl(url), this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(res);
      }, (error: any) => {
        this.onError(error);
      })
      .finally(() => {
        this.onEnd();
      });
  }
  post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    this.showLoader();
    return super.post(this.getFullUrl(url), body, this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(res);
      }, (error: any) => {
        this.onError(error)
      })
      .finally(() => {
        this.onEnd()
      })

  }
  put(url: string, body: any, options?: RequestOptionsArgs): Observable<any>{
    this.showLoader();
    return super.put(this.getFullUrl(url), body, this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(res);
      }, (error: any) => {
        this.onError(error)
      })
      .finally(() => {
        this.onEnd()
      })
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<any>{
    this.showLoader();
    return super.delete(this.getFullUrl(url), this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(res);
      }, (error: any) => {
        this.onError(error)
      })
      .finally(() => {
        this.onEnd()
      })
  }

  private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {

    if (options == null) {
      options = new ReduxRequestOptions();
    }

    if (options.headers == null) {
      options.headers = new Headers();
    }

    return options;
  }

  private getFullUrl(url: string): string {
    this.apiUrl=this.envConf.loadUrlServer();
    return this.apiUrl + url;
  }

  private onCatch(error: any, caught: Observable<any>): Observable<any> {
    //noinspection TypeScriptValidateTypes
    return Observable.throw(error);
  }

  private onSuccess(res: Response): void {
    console.log('Request successful');
  }

  private onError(res: Response): void {
    console.log('Error, status code: ' + res.status);
  }

  private onEnd(): void {
    this.hideLoader();
  }

  private showLoader(): void {
    this.loaderService.loaderOpen();
  }

  private hideLoader(): void {
    this.loaderService.loaderclose()
  }
}
