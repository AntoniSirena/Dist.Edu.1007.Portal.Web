import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IidentificationData } from '../../../interfaces/domain/IccompanimentInstrument/iaccompaniment-instrument';
import { strict } from 'assert';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { VariableResponse } from '../../../models/domain/accompanimentInstrument/accompaniment-instrument';

@Injectable({
  providedIn: 'root'
})
export class AccompanimentInstrumentService {

  apiURL;

  constructor(private httpClient: HttpClient) {
    this.apiURL = environment.apiURL;
  }


  getAccompInstRequest():Observable<object>{    
    return this.httpClient.get(this.apiURL +'api/identificationData/GetAccompInstRequest');
  }

  getIdentificationDataById(id: string): Observable<object> {
    return this.httpClient.get(this.apiURL + 'api/identificationData/' + id);
  }

  getVariableByRequestId(requestId: number, variable: string): Observable<object> {
    return this.httpClient.get(this.apiURL +  `api/identificationData/GetVariableByRequestId?requestId=${requestId}&variable=${variable}`);
  }

  createIdentificationData(identificationData: IidentificationData) {
    let data = JSON.stringify(identificationData);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.apiURL}api/identificationData`, data, { headers: headers });
  }

  createVariable(identificationDataId: number): Observable<object> {
    let data = JSON.stringify(identificationDataId = identificationDataId);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.apiURL}api/identificationData/CreateVariable`, data, { headers: headers });
  }

  updateVariable(variable: VariableResponse) {
    let data = JSON.stringify(variable);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.apiURL}api/identificationData/UpdateVariable`, data, { headers: headers });
  }

  editIdentificationData(identificationData: IidentificationData) {
    let data = JSON.stringify(identificationData);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(`${this.apiURL}api/identificationData`, data, { headers: headers });
  }

}
