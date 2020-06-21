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

  getDistrictByRegionalId(regionalId: number): Observable<object> {
    return this.httpClient.get(this.apiURL + 'api/common/GetDistrictByRegionalId/' + regionalId);
  }

  getEducativeCenterByDistrictId(districtId: number): Observable<object> {
    return this.httpClient.get(this.apiURL + 'api/common/GetEducativeCenterByDistrictId/' + districtId);
  }

  getAreas():Observable<object>{    
    return this.httpClient.get(this.apiURL +'api/common/GetAreas');
  }

  getCurrentUserInfo():Observable<object>{    
    return this.httpClient.get(this.apiURL +'api/common/GetCurrentUserInfo');
  }

  getIndicators():Observable<object>{    
    return this.httpClient.get(this.apiURL +'api/common/GetIndicators');
  }

  getTandas():Observable<object>{    
    return this.httpClient.get(this.apiURL +'api/common/GetTandas');
  }

  getGrades():Observable<object>{    
    return this.httpClient.get(this.apiURL +'api/common/GetGrades');
  }

  getDocents():Observable<object>{    
    return this.httpClient.get(this.apiURL +'api/common/GetDocents');
  }

  getVisits():Observable<object>{    
    return this.httpClient.get(this.apiURL +'api/common/GetVisits');
  }

}
