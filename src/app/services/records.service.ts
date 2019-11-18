import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  constructor(private hc: HttpClient) {
  }

  setDataFromLogin(data): Observable<any> {
    console.log(data);
    return this.hc.post('http://localhost:5000/save', data);
  }

  getData(): Observable<any> {
    console.log('called');
    return this.hc.get('http://localhost:5000/get');
  }
}
