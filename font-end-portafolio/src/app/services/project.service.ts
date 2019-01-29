import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { GlobalService } from './global.service';
@Injectable()
export class ProjectService {
  public url: String;
  constructor(
    private _http: HttpClient
  ){ 
    this.url = GlobalService.url;
  }
  
  testService(){
    return 'Probando el servicio';
  }

  saveProject(project: Project): Observable<any>{
    let params = JSON.stringify(project);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'save',params,{headers: headers});
  }

  getProject(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'projectall',{headers:headers});
  }

}
