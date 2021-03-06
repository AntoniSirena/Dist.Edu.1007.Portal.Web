import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Ilocator } from '../../interfaces/Ilocator/ilocator';

@Injectable({
  providedIn: 'root'
})
export class LocatorService {

  apiURL;

  constructor(private httpClient: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  getLocatorById(id: number): Observable<object> {
    return this.httpClient.get(this.apiURL + 'api/locator/' + id);
  }

  editLocator(locator: Ilocator) {
    let Json = JSON.stringify(locator);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(`${this.apiURL}api/locator`, Json, { headers: headers });
  }

  createLocator(locator: Ilocator) {
    let Json = JSON.stringify(locator);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.apiURL}api/locator`, Json, { headers: headers });
  }

  deleteLocator(id: number): Observable<object> {
    return this.httpClient.delete(this.apiURL + 'api/locator/' + id);
  }

}
