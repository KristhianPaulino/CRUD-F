import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {
  private myAppUrl = 'https://localhost:44376/';
  private MyApiUrl = 'api/usuario/'

  constructor(private http: HttpClient) { }

  ConsultID(id: Number): Observable<any> {
    return this.http.get(this.myAppUrl + this.MyApiUrl + 'GetById/' + id)
    
    
  }

  Consultar(): Observable<any> {
    return this.http.get(this.myAppUrl + this.MyApiUrl + 'Get')
  }

  DeteleID(id: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.MyApiUrl + 'DELETE/' + id)
  }
  
  SaveUser(save: any):Observable<any>{
    return this.http.post(this.myAppUrl + this.MyApiUrl, save);
  }
}
