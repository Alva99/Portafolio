import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { GlobalService } from './global.service';
@Injectable({
  providedIn: 'root'
})
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
}
