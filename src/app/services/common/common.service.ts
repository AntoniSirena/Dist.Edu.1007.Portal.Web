import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  apiURL;

  constructor(private httpClient: HttpClient) { 
    this.apiURL = environment.apiURL;
  }

  getPersonTypes():Observable<object>{    
    return this.httpClient.get(this.apiURL +'api/common/GetPesonTypes');
  }

  getDocumentTypes():Observable<object>{    
    return this.httpClient.get(this.apiURL +'api/common/GetDocumentTypes');
  }

  getRegionals():Observable<object>{    
    return this.httpClient.get(this.apiURL +'api/common/GetRegionals');
  }

  getDistricts():Observable<object>{    
    return this.httpClient.get(this.apiURL +'api/common/GetDistricts');
  }

  getAreas():Observable<object>{    
    return this.httpClient.get(this.apiURL +'api/common/GetAreas');
  }

}
